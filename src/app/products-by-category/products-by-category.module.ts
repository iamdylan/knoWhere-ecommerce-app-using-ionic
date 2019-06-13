import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsByCategoryPage } from './products-by-category.page';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ProductsByCategoryPage],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ]
})
export class ProductsByCategoryModule { }
