import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ChangingPasswordDto, UserDto } from 'src/app/api/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  templateUrl: './update-profile.component.html',
})
export class UpdateProfileComponent {
  submitted: boolean = false;

  user: UserDto = {
    email: 'example@smartfood.com',
    firstName: '',
    lastName: '',
  }

  changingPassword: ChangingPasswordDto = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}
}
