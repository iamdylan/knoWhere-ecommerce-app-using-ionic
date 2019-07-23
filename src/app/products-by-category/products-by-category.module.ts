import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsByCategoryPage } from './products-by-category.page';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: 'products/:category',
    component: ProductsByCategoryPage
  }
];

@NgModule({
  declarations: [ProductsByCategoryPage],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes)  ]
})
export class ProductsByCategoryModule { }
