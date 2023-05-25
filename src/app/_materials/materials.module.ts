import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    TooltipModule,
    CardModule,
  ],
  exports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    TooltipModule,
    CardModule,
  ],
})
export class MaterialsModule {}
