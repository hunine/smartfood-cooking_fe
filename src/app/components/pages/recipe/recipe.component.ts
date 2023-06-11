import { Component, OnInit } from '@angular/core';
import {
  Quantification,
  Recipe,
  Step,
  RecipeDto,
  QuantificationDto,
} from 'src/app/api/recipe';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { RecipeService } from 'src/app/service/recipe.service';
import { LevelService } from 'src/app/service/level.service';
import { Level } from 'src/app/api/level';
import { Category } from 'src/app/api/category';
import { Cuisine } from 'src/app/api/cuisine';
import { Ingredient } from 'src/app/api/ingredient';
import { CategoryService } from 'src/app/service/category.service';
import { CuisineService } from 'src/app/service/cuisine.service';
import ValidationHelper from 'src/app/helper/validation';
import { IngredientService } from 'src/app/service/ingredient.service';

@Component({
  templateUrl: './recipe.component.html',
  providers: [MessageService],
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  recipeDialog: boolean = false;
  deleteRecipeDialog: boolean = false;
  deleteRecipesDialog: boolean = false;
  recipes: Recipe[] = [];
  recipe: Recipe = {
    name: '',
    level: {
      name: '',
    },
    category: {
      name: '',
    },
    cuisine: {
      name: '',
    },
    quantification: [],
    recipeStep: [],
  };
  selectedRecipes: Recipe[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  uploadedFiles: any[] = [];

  // Pagination
  itemsPerPage: number = 1000;
  totalPages: number = 0;
  totalRecords: number = 0;
  currentPage: number = 0;

  // List
  levels: Level[] = [];
  categories: Category[] = [];
  cuisineArray: Cuisine[] = [];
  ingredients: Ingredient[] = [];

  // Page steps
  activeIndexStep: number = 0;
  steps: any[] = [
    {
      label: 'Detail',
    },
    {
      label: 'Ingredients',
    },
    {
      label: 'Recipe Steps',
    },
  ];

  constructor(
    private recipeService: RecipeService,
    private levelService: LevelService,
    private categoryService: CategoryService,
    private cuisineService: CuisineService,
    private ingredientService: IngredientService,
    private messageService: MessageService
  ) {}

  private resetRecipeForm() {
    this.recipe = {
      name: '',
      level: {
        name: '',
      },
      category: {
        name: '',
      },
      cuisine: {
        name: '',
      },
      quantification: [
        {
          value: 0,
          unit: '',
          ingredient: {
            name: '',
          },
        },
      ],
      recipeStep: [
        {
          content: '',
          order: 0,
        },
      ],
    };
  }

  private setRecipeStepOrder() {
    this.recipe.recipeStep.forEach((step, index) => {
      step.order = index;
    });
  }

  async ngOnInit() {
    await this.reloadTable();
    this.levels = (await this.levelService.getLevels({})).data;
    this.categories = (await this.categoryService.getCategories({})).data;
    this.cuisineArray = (await this.cuisineService.getCuisineArray({})).data;
    this.ingredients = (
      await this.ingredientService.getIngredients({})
    ).data.map((ingredient) => ({ id: ingredient.id, name: ingredient.name }));

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'level', header: 'Level' },
      { field: 'category', header: 'Category' },
      { field: 'cuisine', header: 'Cuisine' },
    ];
  }

  openNew() {
    this.resetRecipeForm();
    this.activeIndexStep = 0;
    this.submitted = false;
    this.recipeDialog = true;
  }

  deleteSelectedRecipes() {
    this.deleteRecipesDialog = true;
  }

  async editRecipe(recipe: Recipe) {
    if (recipe.id) {
      this.recipe = await this.recipeService.getRecipeById(recipe.id);
      this.recipeDialog = true;
    }
  }

  deleteRecipe(recipe: Recipe) {
    this.deleteRecipeDialog = true;
    this.recipe = { ...recipe };
  }

  async confirmDeleteSelected() {
    const selectedRecipeIds: string[] = this.selectedRecipes.map(
      (item) => item.id
    ) as string[];

    this.deleteRecipesDialog = false;
    selectedRecipeIds &&
      (await this.recipeService.deleteRecipes(selectedRecipeIds));
    await this.reloadTable();

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Recipes Deleted',
      life: 3000,
    });
    this.selectedRecipes = [];
  }

  async confirmDelete() {
    this.deleteRecipeDialog = false;
    this.recipe.id && (await this.recipeService.deleteRecipe(this.recipe.id));
    await this.reloadTable();

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Recipe Deleted',
      life: 3000,
    });
    this.resetRecipeForm();
  }

  hideDialog() {
    this.activeIndexStep = 0;
    this.recipeDialog = false;
    this.submitted = false;
  }

  async saveRecipe() {
    this.submitted = true;
    this.setRecipeStepOrder();

    if (
      !this.recipe.level.id ||
      !this.recipe.category.id ||
      !this.recipe.cuisine.id ||
      !ValidationHelper.isInputStringValid(this.recipe.name, true) ||
      !ValidationHelper.isInputStringValid(this.recipe.level.name, true) ||
      !ValidationHelper.isInputStringValid(this.recipe.category.name, true) ||
      !ValidationHelper.isInputStringValid(this.recipe.cuisine.name, true) ||
      !this.isQuantificationValid() ||
      !this.isRecipeStepValid() ||
      this.isDuplicatedIngredient().length > 0
    ) {
      return;
    }

    const newRecipe: RecipeDto = {
      id: this.recipe.id,
      name: this.recipe.name,
      description: this.recipe.description,
      levelId: this.recipe.level.id,
      categoryId: this.recipe.category.id,
      cuisineId: this.recipe.cuisine.id,
      ingredients: this.recipe.quantification.map(
        (item) =>
          ({
            ...item,
            ingredientId: item.ingredient.id,
          } as QuantificationDto)
      ),
      steps: this.recipe.recipeStep.map((item) => ({ ...item })),
    };

    if (this.recipe.id) {
      await this.recipeService.updateRecipe(newRecipe, 'put');
      await this.reloadTable();

      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Recipe Updated',
        life: 3000,
      });
    } else {
      await this.recipeService.createRecipe(newRecipe);
      await this.reloadTable();

      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Recipe Created',
        life: 3000,
      });
    }

    this.recipes = [...this.recipes];
    this.recipeDialog = false;
    this.resetRecipeForm();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  async reloadTable() {
    const returnData: any = await this.recipeService.getRecipes({
      page: this.currentPage || 1,
      limit: this.itemsPerPage,
    });
    this.recipes = returnData.data as Recipe[];

    this.totalPages = returnData.totalPages;
    this.currentPage = returnData.currentPage;
    this.totalRecords = returnData.totalItems;
  }

  onUpload(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
    });
  }

  // Validation
  isQuantificationValid() {
    return (
      this.recipe.quantification &&
      this.recipe.quantification.length > 0 &&
      this.recipe.quantification.every(
        (item) =>
          item.value > 0 && ValidationHelper.isInputStringValid(item.unit, true)
      )
    );
  }

  isRecipeStepValid() {
    return (
      this.recipe.recipeStep &&
      this.recipe.recipeStep.length > 0 &&
      this.recipe.recipeStep.every((item) =>
        ValidationHelper.isInputStringValid(item.content, true)
      )
    );
  }

  isDuplicatedIngredient() {
    const ingredientIds: string[] = this.recipe.quantification.map(
      (item) => item.ingredient.id
    ) as string[];
    const duplicatedIngredientIds: string[] = [];

    ingredientIds.forEach((item, index) => {
      if (ingredientIds.indexOf(item) !== index) {
        duplicatedIngredientIds.push(item);
      }
    });

    return duplicatedIngredientIds;
  }

  // Handle
  handleActiveIndexStepChange(event: number) {
    this.activeIndexStep = event;
  }

  handleAddMoreIngredients() {
    const quantification: Quantification = {
      value: 0,
      unit: '',
      ingredient: {
        id: '',
        name: '',
      },
    };

    if (!this.recipe.quantification) {
      this.recipe.quantification = [];
    }

    this.recipe.quantification.push(quantification);
  }

  handleRemoveIngredientInRecipe(index: number) {
    if (this.recipe.quantification && this.recipe.quantification.length > 1) {
      this.recipe.quantification.splice(index, 1);
    }
  }

  handleAddMoreSteps() {
    const step: Step = {
      content: '',
      order: 0,
    };

    if (!this.recipe.recipeStep) {
      this.recipe.recipeStep = [];
    }

    this.recipe.recipeStep.push(step);
  }

  handleRemoveStep(index: number) {
    if (this.recipe.recipeStep && this.recipe.recipeStep.length > 1) {
      this.recipe.recipeStep.splice(index, 1);
    }
  }
}