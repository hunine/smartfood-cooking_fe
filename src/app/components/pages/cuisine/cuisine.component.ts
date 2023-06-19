import { Component, OnInit } from '@angular/core';
import { Cuisine } from 'src/app/api/cuisine';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CuisineService } from 'src/app/service/cuisine.service';
import { IEventPaginator } from 'src/app/common/interfaces/event-paginator.interface';
import { SORT_ORDER } from 'src/app/common/constants/sort-order';
import { IQuery } from 'src/app/common/interfaces/interface';

@Component({
  templateUrl: './cuisine.component.html',
  providers: [MessageService],
})
export class CuisineComponent implements OnInit {
  cuisineDialog: boolean = false;

  deleteCuisineDialog: boolean = false;

  deleteCuisineArrayDialog: boolean = false;

  cuisineArray: Cuisine[] = [];

  cuisine: Cuisine = {
    name: '',
  };

  selectedCuisineArray: Cuisine[] = [];

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
    private cuisineService: CuisineService,
    private messageService: MessageService
  ) {}

  private resetCuisineForm() {
    this.cuisine = {
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
    this.resetCuisineForm();
    this.submitted = false;
    this.cuisineDialog = true;
  }

  deleteSelectedCuisineArray() {
    this.deleteCuisineArrayDialog = true;
  }

  editCuisine(cuisine: Cuisine) {
    this.cuisine = { ...cuisine };
    this.cuisineDialog = true;
  }

  deleteCuisine(cuisine: Cuisine) {
    this.deleteCuisineDialog = true;
    this.cuisine = { ...cuisine };
  }

  async confirmDeleteSelected() {
    const selectedCuisineIds: string[] = this.selectedCuisineArray.map(
      (item) => item.id
    ) as string[];

    this.deleteCuisineArrayDialog = false;
    selectedCuisineIds &&
      (await this.cuisineService.deleteCuisineArray(selectedCuisineIds));
    await this.reloadTable();

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Cuisine Array Deleted',
      life: 3000,
    });
    this.selectedCuisineArray = [];
  }

  async confirmDelete() {
    this.deleteCuisineDialog = false;
    this.cuisine.id &&
      (await this.cuisineService.deleteCuisine(this.cuisine.id));
    await this.reloadTable();

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Cuisine Deleted',
      life: 3000,
    });
    this.resetCuisineForm();
  }

  hideDialog() {
    this.cuisineDialog = false;
    this.submitted = false;
  }

  async saveCuisine() {
    this.submitted = true;

    if (this.cuisine.name?.trim()) {
      if (this.cuisine.id) {
        await this.cuisineService.updateCuisine(this.cuisine);
        await this.reloadTable();

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Cuisine Updated',
          life: 3000,
        });
      } else {
        await this.cuisineService.createCuisine(this.cuisine);
        await this.reloadTable();

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Cuisine Created',
          life: 3000,
        });
      }

      this.cuisineArray = [...this.cuisineArray];
      this.cuisineDialog = false;
      this.resetCuisineForm();
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  async reloadTable() {
    const returnData: any = await this.cuisineService.getCuisineArray(
      this.params
    );
    const { totalPages, totalItems } = returnData.meta;

    this.totalPages = totalPages;
    this.totalItems = totalItems;
    this.cuisineArray = returnData.data as Cuisine[];
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
