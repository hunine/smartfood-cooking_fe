import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/api/recipe';
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

@Component({
  templateUrl: './recipe.component.html',
  providers: [MessageService],
})
export class RecipeComponent implements OnInit {
  recipeDialog: boolean = false;
  deleteRecipeDialog: boolean = false;
  deleteRecipesDialog: boolean = false;
  recipes: Recipe[] = [];
  recipe: Recipe = {};
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

  testIngredient: string = '';

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
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    await this.reloadTable();
    this.levels = (await this.levelService.getLevels({})).data;
    this.categories = (await this.categoryService.getCategories({})).data;
    this.cuisineArray = (await this.cuisineService.getCuisineArray({})).data;

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'level', header: 'Level' },
      { field: 'category', header: 'Category' },
      { field: 'cuisine', header: 'Cuisine' },
    ];
  }

  openNew() {
    this.recipe = {};
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
    this.recipe = {};
  }

  hideDialog() {
    this.activeIndexStep = 0;
    this.recipeDialog = false;
    this.submitted = false;
  }

  async saveRecipe() {
    this.submitted = true;

    console.log(this.recipe);

    if (this.recipe.name?.trim()) {
      if (this.recipe.id) {
        // await this.recipeService.updateRecipe(this.recipe);
        await this.reloadTable();

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Recipe Updated',
          life: 3000,
        });
      } else {
        // await this.recipeService.createRecipe(this.recipe);
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
      this.recipe = {};
    }
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

  onActiveIndexStepChange(event: number) {
    this.activeIndexStep = event;
  }
}
