import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ChangingPasswordDto, User } from 'src/app/api/user';
import { Role } from 'src/app/common/enum/role.enum';
import { UserService } from 'src/app/service/user.service';

@Component({
  templateUrl: './update-profile.component.html',
  providers: [MessageService],
})
export class UpdateProfileComponent implements OnInit {
  submitted: boolean = false;

  user: User = {
    email: 'example@smartfood.com',
    firstName: '',
    lastName: '',
    role: Role.Admin,
  };

  changingPassword: ChangingPasswordDto = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    const returnData = await this.userService.getUserProfile();

    if (returnData) {
      this.user = returnData.data;
    }
  }

  clearPassword() {
    this.changingPassword = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  }

  isChangingPassword() {
    return (
      this.changingPassword.currentPassword &&
      this.changingPassword.newPassword &&
      this.changingPassword.confirmPassword
    );
  }

  // Handle
  async handleChangePassword() {
    if (this.isChangingPassword()) {
      if (
        this.changingPassword.newPassword !==
        this.changingPassword.confirmPassword
      ) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'New password and confirm password are not match',
        });
        return false;
      }

      const returnData = await this.userService.changePassword(
        this.changingPassword
      );

      if (!returnData.success) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: returnData.message,
        });
        return false;
      }

      return true;
    }

    return;
  }

  async handleSubmit() {
    if (this.user.firstName === '' || this.user.lastName === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'First name and last name are required',
      });
      return;
    }

    const isChangingPasswordSuccess = await this.handleChangePassword();
    const updateUserInfo = await this.userService.updateInfo(this.user);

    this.clearPassword();

    if (isChangingPasswordSuccess || updateUserInfo.success) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Update profile successfully',
        life: 3000,
      });
    }
  }
}
