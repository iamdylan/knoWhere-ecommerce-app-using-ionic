import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NeedAuthGuard } from './login/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'products/:category', loadChildren: './products-by-category/products-by-category.module#ProductsByCategoryModule' },
  { path: 'product-details/:product', loadChildren: './product-details/product-details.module#ProductDetailsModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule', canActivate: [NeedAuthGuard] },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutPageModule' }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

 }
