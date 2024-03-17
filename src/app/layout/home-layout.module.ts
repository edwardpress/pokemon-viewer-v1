import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeLayoutComponent } from './home-layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [HomeLayoutComponent],
  imports: [CommonModule, SharedModule, MatToolbarModule],
  exports: [HomeLayoutComponent],
})
export class HomeLayoutModule {}
