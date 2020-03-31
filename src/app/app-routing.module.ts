import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { NeedAuthGuard } from './login/auth.guard';
import { CheckoutGuard } from './checkout/checkout.guard';
import { LoginPage } from './login/login.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'products/:category',
    loadChildren: () => import('./products-by-category/products-by-category.module').then(m => m.ProductsByCategoryModule)
  },
  {
    path: 'product-details/:product',
    loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartPageModule), canActivate: [NeedAuthGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutPageModule), canActivate: [CheckoutGuard]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

 }
