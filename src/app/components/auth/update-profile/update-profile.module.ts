import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomPrimengModule } from 'src/app/_shared/primeng.module';
import { UpdateProfilesRoutingModule } from './update-profile-routing.module';
import { UpdateProfileComponent } from './update-profile.component';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  imports: [
    CustomPrimengModule,
    CommonModule,
    FormsModule,
    UpdateProfilesRoutingModule,
  ],
  declarations: [UpdateProfileComponent],
})
export class UpdateProfileModule {}
