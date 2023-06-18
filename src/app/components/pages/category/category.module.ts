import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CustomPrimengModule } from 'src/app/_shared/primeng.module';

@NgModule({
  imports: [
    CustomPrimengModule,
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
  ],
  declarations: [CategoryComponent],
})
export class CategoryModule {}
