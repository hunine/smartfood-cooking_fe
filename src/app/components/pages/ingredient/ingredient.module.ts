import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IngredientRoutingModule } from './ingredient-routing.module';
import { IngredientComponent } from './ingredient.component';
import { CustomPrimengModule } from 'src/app/_shared/primeng.module';

@NgModule({
  imports: [
    CustomPrimengModule,
    CommonModule,
    FormsModule,
    IngredientRoutingModule,
  ],
  declarations: [IngredientComponent],
})
export class IngredientModule {}
