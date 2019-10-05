import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProductDetailsPage } from './product-details.page';

const routes: Routes = [
    {
      path: 'product-details/:product',
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
