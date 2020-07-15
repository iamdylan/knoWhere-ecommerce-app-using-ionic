import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomePage } from './home/home.page';
import { CheckAuthGuard } from './pages/cart/auth.guard';
import { CheckoutGuard } from './pages/checkout/checkout.guard';
import { CheckLoggedIn } from './pages/login/login.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/home',
  //   pathMatch: 'full'
  // },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'products/:category',
    loadChildren: () => import('./pages/products-by-category/products-by-category.module').then(m => m.ProductsByCategoryModule)
  },
  {
    path: 'product-details/:product',
    loadChildren: () => import('./pages/product-details/product-details.module').then(m => m.ProductDetailsModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule), canActivate: [CheckAuthGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule), canActivate: [CheckLoggedIn]
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutPageModule), canActivate: [CheckoutGuard]
  },
  {
    path: 'search/:query',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

 }
