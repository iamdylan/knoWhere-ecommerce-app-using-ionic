var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgZone } from '@angular/core';
import * as WC from 'woocommerce-api';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
var ProductsByCategoryPage = /** @class */ (function () {
    function ProductsByCategoryPage(route, ngZone) {
        var _this = this;
        this.route = route;
        this.ngZone = ngZone;
        this.page = 1;
        this.products = [];
        this.catName = [{ name: '' }];
        this.WooCommerce = WC({
            url: "http://localhost/dashboard/wordpress",
            consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
            consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
            wpAPI: true,
            version: 'wc/v3'
        });
        this.route.params.subscribe(function (params) {
            _this.ngZone.run(function () { _this.cat = params['category']; });
        });
        this.WooCommerce.getAsync("products/categories").then(function (data) {
            _this.ngZone.run(function () {
                _this.catName = JSON.parse(data.body).filter(function (categ) {
                    return categ.id == _this.cat;
                });
            });
        }, function (err) {
            console.log(err);
        });
        this.WooCommerce.getAsync("products?category=" + this.cat).then(function (data) {
            _this.ngZone.run(function () { _this.products = JSON.parse(data.body); });
        }, function (err) {
            console.log(err);
        });
    }
    ProductsByCategoryPage.prototype.loadMoreProducts = function (event) {
        var _this = this;
        this.page++;
        console.log("Getting page " + this.page);
        this.WooCommerce.getAsync("products?category=" + this.cat + "&page=" + this.page).then(function (data) {
            var temp = (JSON.parse(data.body));
            _this.products = _this.products.concat(JSON.parse(data.body));
            event.target.complete();
            if (temp.length < 10)
                event.target.enable = false;
        });
    };
    ProductsByCategoryPage.prototype.ngOnInit = function () { };
    ProductsByCategoryPage = __decorate([
        Component({
            selector: 'app-products-by-category',
            templateUrl: './products-by-category.page.html',
            styleUrls: ['./products-by-category.page.scss'],
            changeDetection: ChangeDetectionStrategy.Default
        }),
        __metadata("design:paramtypes", [ActivatedRoute, NgZone])
    ], ProductsByCategoryPage);
    return ProductsByCategoryPage;
}());
export { ProductsByCategoryPage };
//# sourceMappingURL=products-by-category.page.js.map