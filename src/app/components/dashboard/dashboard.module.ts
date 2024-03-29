import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { CustomPrimengModule } from 'src/app/_shared/primeng.module';

@NgModule({
  imports: [
    CustomPrimengModule,
    CommonModule,
    FormsModule,
    DashboardsRoutingModule,
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
