import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { CuisineRoutingModule } from './cuisine-routing.module';
import { CuisineComponent } from './cuisine.component';
import { CustomPrimengModule } from 'src/app/_shared/primeng.module';

@NgModule({
  imports: [
    CustomPrimengModule,
    CommonModule,
    CuisineRoutingModule,
    FormsModule,
    RatingModule,
  ],
  declarations: [CuisineComponent],
})
export class CuisineModule {}
