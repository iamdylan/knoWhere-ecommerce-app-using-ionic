import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { OwlModule } from 'ngx-owl-carousel';
import { NgxProgressiveImageLoaderModule } from 'ngx-progressive-image-loader';
import { PipesModule } from '../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    OwlModule,
    NgxProgressiveImageLoaderModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
