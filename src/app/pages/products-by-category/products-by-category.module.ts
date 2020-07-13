import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProductsByCategoryPage } from './products-by-category.page';
import { NgxProgressiveImageLoaderModule } from 'ngx-progressive-image-loader';
import { PipesModule } from '../../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: ProductsByCategoryPage
  }
];

@NgModule({
  declarations: [ProductsByCategoryPage],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
    PipesModule,
    NgxProgressiveImageLoaderModule
  ]
})
export class ProductsByCategoryModule { }
