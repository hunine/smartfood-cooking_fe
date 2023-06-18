import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LevelRoutingModule } from './level-routing.module';
import { LevelComponent } from './level.component';
import { CustomPrimengModule } from 'src/app/_shared/primeng.module';

@NgModule({
  imports: [CustomPrimengModule, CommonModule, LevelRoutingModule, FormsModule],
  declarations: [LevelComponent],
})
export class LevelModule {}
