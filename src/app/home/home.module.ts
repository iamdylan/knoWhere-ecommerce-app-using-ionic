import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
import { OwlModule } from 'ngx-owl-carousel';
import { NgxProgressiveImageLoaderModule } from 'ngx-progressive-image-loader';
// import { CarouselModule, WavesModule } from 'angular-bootstrap-md';

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
    OwlModule,
    NgxProgressiveImageLoaderModule,
    // CarouselModule,
    // WavesModule,
    // SlickCarouselModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
