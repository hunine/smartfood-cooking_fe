import { Component, OnInit } from '@angular/core';
import { Cuisine } from 'src/app/api/cuisine';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CuisineService } from 'src/app/service/cuisine.service';

@Component({
  templateUrl: './cuisine.component.html',
  providers: [MessageService],
})
export class CuisineComponent implements OnInit {
  cuisineDialog: boolean = false;

  deleteCuisineDialog: boolean = false;

  deleteCuisineArrayDialog: boolean = false;

  cuisineArray: Cuisine[] = [];

  cuisine: Cuisine = {};

  selectedCuisineArray: Cuisine[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  itemsPerPage: number = 20;

  totalPages: number = 0;

  totalRecords: number = 0;

  currentPage: number = 0;

  constructor(
    private cuisineService: CuisineService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    await this.reloadTable();

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
    ];
  }

  openNew() {
    this.cuisine = {};
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
    this.cuisine = {};
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
      this.cuisine = {};
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  async reloadTable() {
    const returnData: any = await this.cuisineService.getCuisineArray({
      page: this.currentPage || 1,
      limit: this.itemsPerPage,
    });
    this.cuisineArray = returnData.data as Cuisine[];
    this.totalPages = returnData.totalPages;
    this.currentPage = returnData.currentPage;
    this.totalRecords = returnData.totalItems;
  }
}
