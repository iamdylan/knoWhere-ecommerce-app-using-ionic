import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { HomePage } from './home.page';
import { NgxProgressiveImageLoaderModule, IImageLoaderOptions } from 'ngx-progressive-image-loader';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    CarouselModule,
    WavesModule,
    NgxProgressiveImageLoaderModule.forRoot()
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
