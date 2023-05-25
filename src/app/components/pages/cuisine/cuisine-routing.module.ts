import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CuisineComponent } from './cuisine.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CuisineComponent }
	])],
	exports: [RouterModule]
})
export class CuisineRoutingModule { }
