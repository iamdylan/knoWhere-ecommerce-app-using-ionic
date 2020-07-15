import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { OwlModule } from 'ngx-owl-carousel';
import { NgxProgressiveImageLoaderModule } from 'ngx-progressive-image-loader';
import { PipesModule } from '../../pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/directives/directives.module';

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
    FormsModule,
    PipesModule,
    DirectivesModule,
    OwlModule,
    NgxProgressiveImageLoaderModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
