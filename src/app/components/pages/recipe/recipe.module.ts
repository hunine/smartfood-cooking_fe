import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeComponent } from './recipe.component';
import { CustomPrimengModule } from 'src/app/_shared/primeng.module';

@NgModule({
  imports: [
    CustomPrimengModule,
    CommonModule,
    RecipeRoutingModule,
    FormsModule,
  ],
  declarations: [RecipeComponent],
})
export class RecipeModule {}
