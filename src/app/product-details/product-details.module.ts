import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsPage } from './product-details.page';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
    {
      path: '',
      component: ProductDetailsPage
    }
];

@NgModule({
  declarations: [ProductDetailsPage],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductDetailsModule { }