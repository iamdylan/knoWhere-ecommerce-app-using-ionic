import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProductsByCategoryPage } from './products-by-category.page';
import { NgxProgressiveImageLoaderModule, IImageLoaderOptions } from 'ngx-progressive-image-loader';

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
    RouterModule.forChild(routes),
    NgxProgressiveImageLoaderModule.forRoot()  ]
})
export class ProductsByCategoryModule { }
