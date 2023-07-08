import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SORT_ORDER } from 'src/app/common/constants/sort-order';
import { IQuery } from 'src/app/common/interfaces/interface';
import { User } from 'src/app/api/user';
import { UserService } from 'src/app/service/user.service';
import { STATUS } from 'src/app/common/constants/status';
import { Role } from 'src/app/common/enum/role.enum';

@Component({
  templateUrl: './user.component.html',
  providers: [MessageService],
})
export class UserComponent implements OnInit {
  userDialog: boolean = false;

  deleteUserDialog: boolean = false;

  deleteUsersDialog: boolean = false;

  users: User[] = [];

  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    deletedAt: '',
    role: Role.User,
  };

  selectedUsers: User[] = [];

  submitted: boolean = false;

  cols: any[] = [];

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
    private userService: UserService,
    private messageService: MessageService
  ) {}

  private resetUserForm() {
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      deletedAt: '',
      role: Role.User,
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
    this.resetUserForm();
    this.submitted = false;
    this.userDialog = true;
  }

  deleteSelectedUsers() {
    this.deleteUsersDialog = true;
  }

  editUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;
  }

  deleteUser(user: User) {
    this.deleteUserDialog = true;
    this.user = { ...user };
  }

  async confirmDeleteSelected() {
    const selectedUserIds: string[] = this.selectedUsers.map(
      (item) => item.id
    ) as string[];

    this.deleteUsersDialog = false;
    selectedUserIds && (await this.userService.deleteUsers(selectedUserIds));
    await this.reloadTable();

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Users Deleted',
      life: 3000,
    });
    this.selectedUsers = [];
  }

  async confirmDelete() {
    this.deleteUserDialog = false;
    this.user.id && (await this.userService.deleteUser(this.user.id));
    await this.reloadTable();

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'User Deleted',
      life: 3000,
    });
    this.resetUserForm();
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  async saveUser() {
    this.submitted = true;

    if (this.user.firstName?.trim()) {
      if (this.user.id) {
        await this.userService.updateUser(this.user, 'put');
        await this.reloadTable();

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'User Updated',
          life: 3000,
        });
      }

      this.users = [...this.users];
      this.userDialog = false;
      this.resetUserForm();
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  async reloadTable() {
    const returnData: any = await this.userService.getUsers(this.params);
    const { totalPages, totalItems } = returnData.meta;

    this.totalPages = totalPages;
    this.totalItems = totalItems;
    this.users = returnData.data.map((user: User) => {
      return {
        ...user,
        name: `${user.firstName} ${user.lastName}`,
        status: user.deletedAt ? STATUS.INACTIVE : STATUS.ACTIVE,
      };
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
