var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NeedAuthGuard } from './login/auth.guard';
var routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    { path: 'products/:category', loadChildren: './products-by-category/products-by-category.module#ProductsByCategoryModule' },
    { path: 'product-details/:product', loadChildren: './product-details/product-details.module#ProductDetailsModule' },
    { path: 'cart', loadChildren: './cart/cart.module#CartPageModule', canActivate: [NeedAuthGuard] },
    { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutPageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map