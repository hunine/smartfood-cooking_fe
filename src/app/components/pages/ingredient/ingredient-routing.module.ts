import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IngredientComponent } from './ingredient.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: IngredientComponent }
	])],
	exports: [RouterModule]
})
export class IngredientRoutingModule { }
