var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductDetailsPage } from './product-details.page';
import { IonicModule } from '@ionic/angular';
var routes = [
    {
        path: 'product-details/:product',
        component: ProductDetailsPage
    }
];
var ProductDetailsModule = /** @class */ (function () {
    function ProductDetailsModule() {
    }
    ProductDetailsModule = __decorate([
        NgModule({
            declarations: [ProductDetailsPage],
            imports: [
                IonicModule,
                CommonModule,
                RouterModule.forChild(routes)
            ]
        })
    ], ProductDetailsModule);
    return ProductDetailsModule;
}());
export { ProductDetailsModule };
//# sourceMappingURL=product-details.module.js.map