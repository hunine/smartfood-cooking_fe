import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/api/ingredient';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IngredientService } from 'src/app/service/ingredient.service';
import { SORT_ORDER } from 'src/app/common/constants/sort-order';
import { IQuery } from 'src/app/common/interfaces/interface';

@Component({
  templateUrl: './ingredient.component.html',
  providers: [MessageService],
  styleUrls: ['./ingredient.component.scss'],
})
export class IngredientComponent implements OnInit {
  ingredientDialog: boolean = false;

  deleteIngredientDialog: boolean = false;

  deleteIngredientsDialog: boolean = false;

  ingredients: Ingredient[] = [];

  ingredient: Ingredient = {
    name: '',
  };

  selectedIngredients: Ingredient[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  uploadedFiles: any[] = [];

  params: IQuery = {};

  // Filter
  searchInput: string = '';

  // Pagination
  itemsPerPage: number = 10;
  totalPages: number = 0;
  totalItems: number = 0;
  currentRecords: number = 0;

  constructor(
    private ingredientService: IngredientService,
    private messageService: MessageService
  ) {}

  private resetIngredientForm() {
    this.ingredient = {
      name: '',
    };
  }

  async ngOnInit() {
    await this.reloadTable();

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
    ];
  }

  openNew() {
    this.resetIngredientForm();
    this.submitted = false;
    this.ingredientDialog = true;
  }

  deleteSelectedIngredients() {
    this.deleteIngredientsDialog = true;
  }

  editIngredient(ingredient: Ingredient) {
    this.ingredient = { ...ingredient };
    this.ingredientDialog = true;
  }

  deleteIngredient(ingredient: Ingredient) {
    this.deleteIngredientDialog = true;
    this.ingredient = { ...ingredient };
  }

  async confirmDeleteSelected() {
    const selectedIngredientIds: string[] = this.selectedIngredients.map(
      (item) => item.id
    ) as string[];

    this.deleteIngredientsDialog = false;
    selectedIngredientIds &&
      (await this.ingredientService.deleteIngredients(selectedIngredientIds));
    await this.reloadTable();

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Ingredients Deleted',
      life: 3000,
    });
    this.selectedIngredients = [];
  }

  async confirmDelete() {
    this.deleteIngredientDialog = false;
    this.ingredient.id &&
      (await this.ingredientService.deleteIngredient(this.ingredient.id));
    await this.reloadTable();

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Ingredient Deleted',
      life: 3000,
    });
    this.resetIngredientForm();
  }

  hideDialog() {
    this.ingredientDialog = false;
    this.submitted = false;
  }

  async saveIngredient() {
    this.submitted = true;

    if (this.ingredient.name?.trim()) {
      if (this.ingredient.id) {
        await this.ingredientService.updateIngredient(this.ingredient);
        await this.reloadTable();

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Ingredient Updated',
          life: 3000,
        });
      } else {
        await this.ingredientService.createIngredient(this.ingredient);
        await this.reloadTable();

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Ingredient Created',
          life: 3000,
        });
      }

      this.ingredients = [...this.ingredients];
      this.ingredientDialog = false;
      this.resetIngredientForm();
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  async reloadTable() {
    const returnData: any = await this.ingredientService.getIngredients(this.params);
    const { totalPages, totalItems } = returnData.meta;

    this.totalPages = totalPages;
    this.totalItems = totalItems;
    this.ingredients = returnData.data as Ingredient[];
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

  // Handle
  handleSearchInput(event: any) {
    this.searchInput = event.target.value;
  }

  async handleLazyLoad(event: any) {
    if (event && event.globalFilter) {
      this.searchInput = event.globalFilter.searchInput;
      this.currentRecords = event.globalFilter.page + 1;
      event.first = event.globalFilter.page;
    }

    this.params = {
      page: Math.floor(this.currentRecords / event.rows + 1),
      limit: this.itemsPerPage,
      sortBy: event.sortField
        ? `${event.sortField}:${
            SORT_ORDER[event.sortOrder as keyof typeof SORT_ORDER]
          }`
        : '',
    };

    if (this.searchInput) {
      this.params.filter = {
        name: `$ilike:${this.searchInput}`,
      };
    }

    await this.reloadTable();
  }
}
