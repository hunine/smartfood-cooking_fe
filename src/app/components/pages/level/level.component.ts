import { Component, OnInit } from '@angular/core';
import { Level } from 'src/app/api/level';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { LevelService } from 'src/app/service/level.service';

@Component({
  templateUrl: './level.component.html',
  providers: [MessageService],
})
export class LevelComponent implements OnInit {
  levelDialog: boolean = false;

  deleteLevelDialog: boolean = false;

  deleteLevelsDialog: boolean = false;

  levels: Level[] = [];

  level: Level = {
    name: '',
  };

  selectedLevels: Level[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  itemsPerPage: number = 20;

  totalPages: number = 0;

  totalRecords: number = 0;

  currentPage: number = 0;

  constructor(
    private levelService: LevelService,
    private messageService: MessageService
  ) {}

  private resetLevelForm() {
    this.level = {
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
    this.resetLevelForm();
    this.submitted = false;
    this.levelDialog = true;
  }

  deleteSelectedLevels() {
    this.deleteLevelsDialog = true;
  }

  editLevel(level: Level) {
    this.level = { ...level };
    this.levelDialog = true;
  }

  deleteLevel(level: Level) {
    this.deleteLevelDialog = true;
    this.level = { ...level };
  }

  async confirmDeleteSelected() {
    const selectedLevelIds: string[] = this.selectedLevels.map(
      (item) => item.id
    ) as string[];

    this.deleteLevelsDialog = false;
    selectedLevelIds &&
      (await this.levelService.deleteLevels(selectedLevelIds));
    await this.reloadTable();

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Levels Deleted',
      life: 3000,
    });
    this.selectedLevels = [];
  }

  async confirmDelete() {
    this.deleteLevelDialog = false;
    this.level.id && (await this.levelService.deleteLevel(this.level.id));
    await this.reloadTable();

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Level Deleted',
      life: 3000,
    });
    this.resetLevelForm();
  }

  hideDialog() {
    this.levelDialog = false;
    this.submitted = false;
  }

  async saveLevel() {
    this.submitted = true;

    if (this.level.name?.trim()) {
      if (this.level.id) {
        await this.levelService.updateLevel(this.level);
        await this.reloadTable();

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Level Updated',
          life: 3000,
        });
      } else {
        await this.levelService.createLevel(this.level);
        await this.reloadTable();

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Level Created',
          life: 3000,
        });
      }

      this.levels = [...this.levels];
      this.levelDialog = false;
      this.resetLevelForm();
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  async reloadTable() {
    const returnData: any = await this.levelService.getLevels({
      page: this.currentPage || 1,
      limit: this.itemsPerPage,
    });
    this.levels = returnData.data as Level[];
    this.totalPages = returnData.totalPages;
    this.currentPage = returnData.currentPage;
    this.totalRecords = returnData.totalItems;
  }
}
