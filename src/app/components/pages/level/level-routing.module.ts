import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LevelComponent } from './level.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: LevelComponent }
	])],
	exports: [RouterModule]
})
export class LevelRoutingModule { }
