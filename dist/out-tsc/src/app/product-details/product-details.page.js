var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as WC from 'woocommerce-api';
import { CartPage } from '../cart/cart.page';
import { Storage } from '@ionic/storage';
import { ToastController, ModalController } from '@ionic/angular';
var ProductDetailsPage = /** @class */ (function () {
    function ProductDetailsPage(route, ngZone, storage, toastCtrl, modalCtrl) {
        var _this = this;
        this.route = route;
        this.ngZone = ngZone;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.slideOpts = {
            effect: 'flip',
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            loop: true,
            speed: 1500,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        };
        this.productInfo = [];
        this.reviews = [];
        this.productInfo.attributes = [];
        this.WooCommerce = WC({
            url: "http://localhost/dashboard/wordpress",
            consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
            consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
            wpAPI: true,
            version: 'wc/v2'
        });
        this.route.params.subscribe(function (params) {
            _this.product = params['product'];
        });
        this.WooCommerce.getAsync("products/" + this.product).then(function (data) {
            _this.ngZone.run(function () { _this.productInfo = JSON.parse(data.body); });
        }, function (err) {
            console.log(err);
        });
        this.WooCommerce.getAsync("products/" + (this.product) + "/reviews").then(function (data) {
            _this.ngZone.run(function () { _this.reviews = JSON.parse(data.body); });
        }, function (err) {
            console.log(err);
        });
    } //Constructor close
    ProductDetailsPage.prototype.addToCart = function (prod) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prod];
                    case 1:
                        product = _a.sent();
                        if (product.price == null) {
                            return [2 /*return*/, console.log('Could not add item to cart.')];
                        }
                        this.storage.get("cart").then(function (data) {
                            if (data == null || data.length == 0) {
                                data = [];
                                data.push({
                                    "product": product,
                                    "qty": 1,
                                    "amount": parseFloat(product.price)
                                });
                            }
                            else {
                                var added = 0;
                                for (var i = 0; i < data.length; i++) {
                                    if (product.id == data[i].product.id) {
                                        var qty = data[i].qty;
                                        console.log("Product is already in the cart");
                                        data[i].qty = qty + 1;
                                        data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
                                        added = 1;
                                    }
                                }
                                if (added == 0) {
                                    data.push({
                                        "product": product,
                                        "qty": 1,
                                        "amount": parseFloat(product.price)
                                    });
                                }
                            }
                            _this.storage.set("cart", data).then(function () {
                                console.log("Cart Updated");
                                console.log(data);
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    }; //addToCart close
    ProductDetailsPage.prototype.toast = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: "Cart Updated",
                            duration: 3000
                        })];
                    case 1:
                        tc = _a.sent();
                        tc.present();
                        return [2 /*return*/];
                }
            });
        });
    }; //toast close
    ProductDetailsPage.prototype.openCart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: CartPage })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductDetailsPage = __decorate([
        Component({
            selector: 'app-product-details',
            templateUrl: './product-details.page.html',
            styleUrls: ['./product-details.page.scss'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute, NgZone, Storage,
            ToastController, ModalController])
    ], ProductDetailsPage);
    return ProductDetailsPage;
}()); //class close
export { ProductDetailsPage };
//# sourceMappingURL=product-details.page.js.map