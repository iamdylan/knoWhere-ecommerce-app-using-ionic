import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProductDetailsPage } from './product-details.page';
import { NgxProgressiveImageLoaderModule, IImageLoaderOptions } from 'ngx-progressive-image-loader';

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
    RouterModule.forChild(routes),
    NgxProgressiveImageLoaderModule
  ]
})
export class ProductDetailsModule { }
