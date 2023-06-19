import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/api/category';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CategoryService } from 'src/app/service/category.service';
import { IEventPaginator } from 'src/app/common/interfaces/event-paginator.interface';
import { IQuery } from 'src/app/common/interfaces/interface';
import { SORT_ORDER } from 'src/app/common/constants/sort-order';

@Component({
  templateUrl: './category.component.html',
  providers: [MessageService],
})
export class CategoryComponent implements OnInit {
  categoryDialog: boolean = false;

  deleteCategoryDialog: boolean = false;

  deleteCategoriesDialog: boolean = false;

  categories: Category[] = [];

  category: Category = {
    name: '',
  };

  selectedCategories: Category[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  params: IQuery = {
    page: 1,
    limit: 10,
  };

  // Filter
  searchInput: string = '';

  // Pagination
  itemsPerPage: number = 10;
  totalPages: number = 0;
  totalItems: number = 0;
  currentRecords: number = 0;

  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    await this.reloadTable();

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
    ];
  }

  private resetCategoryForm() {
    this.category = {
      name: '',
    };
  }

  openNew() {
    this.resetCategoryForm();
    this.submitted = false;
    this.categoryDialog = true;
  }

  deleteSelectedCategories() {
    this.deleteCategoriesDialog = true;
  }

  editCategory(category: Category) {
    this.category = { ...category };
    this.categoryDialog = true;
  }

  deleteCategory(category: Category) {
    this.deleteCategoryDialog = true;
    this.category = { ...category };
  }

  async confirmDeleteSelected() {
    const selectedCategoryIds: string[] = this.selectedCategories.map(
      (item) => item.id
    ) as string[];

    this.deleteCategoriesDialog = false;

    selectedCategoryIds &&
      (await this.categoryService.deleteCategories(selectedCategoryIds));
    await this.reloadTable();

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Categories Deleted',
      life: 3000,
    });
    this.selectedCategories = [];
  }

  async confirmDelete() {
    this.deleteCategoryDialog = false;
    this.category.id &&
      (await this.categoryService.deleteCategory(this.category.id));
    await this.reloadTable();

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Category Deleted',
      life: 3000,
    });
    this.resetCategoryForm();
  }

  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
  }

  async saveCategory() {
    this.submitted = true;

    if (this.category.name?.trim()) {
      if (this.category.id) {
        await this.categoryService.updateCategory(this.category);
        await this.reloadTable();

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Category Updated',
          life: 3000,
        });
      } else {
        await this.categoryService.createCategory(this.category);
        await this.reloadTable();

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Category Created',
          life: 3000,
        });
      }

      this.categories = [...this.categories];
      this.categoryDialog = false;
      this.resetCategoryForm();
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  async reloadTable() {
    const returnData: any = await this.categoryService.getCategories(
      this.params
    );
    const { totalPages, totalItems } = returnData.meta;

    this.totalPages = totalPages;
    this.totalItems = totalItems;
    this.categories = returnData.data as Category[];
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
