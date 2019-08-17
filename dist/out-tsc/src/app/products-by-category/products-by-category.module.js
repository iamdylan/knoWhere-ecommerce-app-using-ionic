var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsByCategoryPage } from './products-by-category.page';
import { IonicModule } from '@ionic/angular';
var routes = [
    {
        path: 'products/:category',
        component: ProductsByCategoryPage
    }
];
var ProductsByCategoryModule = /** @class */ (function () {
    function ProductsByCategoryModule() {
    }
    ProductsByCategoryModule = __decorate([
        NgModule({
            declarations: [ProductsByCategoryPage],
            imports: [
                IonicModule,
                CommonModule,
                RouterModule.forChild(routes)
            ]
        })
    ], ProductsByCategoryModule);
    return ProductsByCategoryModule;
}());
export { ProductsByCategoryModule };
//# sourceMappingURL=products-by-category.module.js.map