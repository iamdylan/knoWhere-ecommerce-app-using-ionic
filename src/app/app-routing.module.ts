import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsByCategoryPage } from './products-by-category/products-by-category.page';
import { HomePage } from './home/home.page';
import { ProductDetailsPage } from './product-details/product-details.page';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'products/:category', component: ProductsByCategoryPage },
  { path: 'product-details/:product', component: ProductDetailsPage },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

 }
