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
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/bufferCount';
import { RoutingStateService } from '../services/routing-state.service';
import { GetUserInfo } from './getUserInfo.service';
var MenuPage = /** @class */ (function () {
    function MenuPage(menuCtrl, router, storage, routingState, ngZone, getUserInfo) {
        var _this = this;
        this.menuCtrl = menuCtrl;
        this.router = router;
        this.storage = storage;
        this.routingState = routingState;
        this.ngZone = ngZone;
        this.getUserInfo = getUserInfo;
        this.categories = [];
        this.WooCommerce = WC({
            url: "http://localhost/dashboard/wordpress",
            consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
            consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
            wpAPI: true,
            version: 'wc/v3'
        });
        this.WooCommerce.getAsync("products/categories").then(function (data) {
            var temp = JSON.parse(data.body);
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].parent == 0) {
                    if (temp[i].slug == "clothing") {
                        temp[i].icon = "shirt";
                        _this.categories.push(temp[i]);
                    }
                    else if (temp[i].slug == "music") {
                        temp[i].icon = "musical-notes";
                        _this.categories.push(temp[i]);
                    }
                    else if (temp[i].slug == "posters") {
                        temp[i].icon = "images";
                        _this.categories.push(temp[i]);
                    }
                    else if (temp[i].slug == "accessories") {
                        temp[i].icon = "watch";
                        _this.categories.push(temp[i]);
                    }
                    else if (temp[i].slug == "decor") {
                        temp[i].icon = "rose";
                        _this.categories.push(temp[i]);
                    }
                    else if (temp[i].slug == "hoodies") {
                        temp[i].icon = "snow";
                        _this.categories.push(temp[i]);
                    }
                    else if (temp[i].slug == "uncategorized") {
                        temp[i].icon = "basket";
                        _this.categories.push(temp[i]);
                    }
                }
            }
        }, function (err) {
            console.log(err);
        });
        // this.getUserInfo.getUser.subscribe((userLoginInfo) => { 
        //   if(userLoginInfo != null){
        //     console.log("User logged in...");
        //     this.ngZone.run(() => { this.getUserInfo.user = userLoginInfo.user;
        //     console.log(this.getUserInfo.user);
        //     this.loggedIn = true;});
        //   }
        //   else {
        //     console.log("No user found.");
        //     this.ngZone.run(() => { this.getUserInfo.user = {};
        //     console.log(this.getUserInfo.user);
        //     this.loggedIn = false;});
        //   }
        //   });
    }
    MenuPage.prototype.logOut = function () {
        var _this = this;
        console.log('logging out');
        this.storage.remove("userLoginInfo").then(function () {
            _this.getUserInfo.user = {};
            console.log(_this.getUserInfo.user);
            _this.getUserInfo.loggedIn.next(false);
        });
    };
    MenuPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.ready().then(function () {
            _this.storage.get("userLoginInfo").then(function (userLoginInfo) {
                if (userLoginInfo != null) {
                    console.log("User logged in...");
                    _this.getUserInfo.user = userLoginInfo.user;
                    console.log(_this.getUserInfo.user);
                    _this.getUserInfo.loggedIn.next(true);
                }
                else {
                    console.log("No user found.");
                    _this.getUserInfo.user = {};
                    console.log(_this.getUserInfo.user);
                    _this.getUserInfo.loggedIn.next(false);
                }
            });
        });
    };
    MenuPage = __decorate([
        Component({
            selector: 'app-menu',
            templateUrl: './menu.page.html',
            styleUrls: ['./menu.page.scss']
        }),
        __metadata("design:paramtypes", [MenuController, Router, Storage, RoutingStateService, NgZone, GetUserInfo])
    ], MenuPage);
    return MenuPage;
}());
export { MenuPage };
//# sourceMappingURL=menu.page.js.map