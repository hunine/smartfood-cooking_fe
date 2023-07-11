import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SORT_ORDER } from 'src/app/common/constants/sort-order';
import { IQuery } from 'src/app/common/interfaces/interface';
import { User } from 'src/app/api/user';
import { UserService } from 'src/app/service/user.service';
import { STATUS } from 'src/app/common/constants/status';
import { Role } from 'src/app/common/enum/role.enum';
import decode from 'jwt-decode';

@Component({
  templateUrl: './user.component.html',
  providers: [MessageService, ConfirmationService],
})
export class UserComponent implements OnInit {
  roleEnum = Role;

  userDialog: boolean = false;

  roleDialog: boolean = false;

  deactivateUserDialog: boolean = false;

  deleteUsersDialog: boolean = false;

  currentUser = (decode(localStorage.getItem('accessToken') || '') as any).user;

  users: User[] = [];

  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    deletedAt: '',
    role: Role.USER,
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

  // List
  roles = [
    { label: 'User', value: Role.USER },
    { label: 'Admin', value: 'admin' },
  ];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  private resetUserForm() {
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      deletedAt: '',
      role: Role.USER,
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

  updateUserRole(user: User) {
    this.user = { ...user };
    this.roleDialog = true;
  }

  editUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;
  }

  deactiveateUser(user: User) {
    this.deactivateUserDialog = true;
    this.user = { ...user };
  }

  async confirmDeleteSelected() {
    const selectedUserIds: string[] = this.selectedUsers.map(
      (item) => item.id
    ) as string[];

    this.deleteUsersDialog = false;
    // selectedUserIds && (await this.userService.deleteUsers(selectedUserIds));
    await this.reloadTable();

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Users Deleted',
      life: 3000,
    });
    this.selectedUsers = [];
  }

  async confirmDeactivate() {
    this.deactivateUserDialog = false;
    // this.user.id && (await this.userService.deactivateUser(this.user.id));
    await this.reloadTable();

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'User Deactivated',
      life: 3000,
    });
    this.resetUserForm();
  }

  hideDialog() {
    this.userDialog = false;
    this.roleDialog = false;
    this.submitted = false;
  }

  async saveUser() {
    this.submitted = true;
    this.user.firstName = this.user.firstName?.trim();
    this.user.lastName = this.user.lastName?.trim();

    if (this.user.firstName && this.user.lastName) {
      if (this.user.id) {
        await this.userService.updateInfo(this.user);
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

  // Validate

  validateSuperAdmin(user: User) {
    return user.role === Role.SUPER_ADMIN;
  }

  validateCurrentUser(user: User) {
    return user.id === this.currentUser.id;
  }

  validateAction(user: User) {
    return this.validateSuperAdmin(user) || this.validateCurrentUser(user);
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

  async handleUpdateRole() {
    console.log(this.user);

    this.submitted = true;

    if (this.user.id && this.user.role) {
      const dataReturn = await this.userService.updateRole(this.user);

      if (!dataReturn.success) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User role update failed',
          life: 3000,
        });

        this.roleDialog = false;
        this.resetUserForm();

        return;
      }

      await this.reloadTable();

      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: dataReturn.message,
        life: 3000,
      });

      this.users = [...this.users];
      this.roleDialog = false;
      this.resetUserForm();
    }
  }

  handleDeactiveUser(user: User) {
    this.user = { ...user };
    this.confirmationService.confirm({});
    this.confirmationService.confirm({
      key: 'confirm2',
      message: `Are you sure that you want to deactive ${this.user.email}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }
}
