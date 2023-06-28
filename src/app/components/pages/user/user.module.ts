import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { UsersRoutingModule } from './user-routing.module';
import { CustomPrimengModule } from 'src/app/_shared/primeng.module';

@NgModule({
  imports: [CustomPrimengModule, CommonModule, FormsModule, UsersRoutingModule],
  declarations: [UserComponent],
})
export class UserModule {}
