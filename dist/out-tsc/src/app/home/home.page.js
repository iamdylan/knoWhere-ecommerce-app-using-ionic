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
import { Component, NgZone, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as WC from 'woocommerce-api';
import { CarouselComponent } from 'angular-bootstrap-md';
var HomePage = /** @class */ (function () {
    function HomePage(toastCtrl, ngZone) {
        this.toastCtrl = toastCtrl;
        this.ngZone = ngZone;
        this.config = {
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            loop: true,
            speed: 1500,
            pagination: {
                el: '.swiper-pagination',
            },
            paginationClickable: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        };
        this.slideOpts2 = {
            effect: 'flip',
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            loop: true,
            speed: 1500,
            slidesPerView: 3,
            pagination: {
                clickable: true
            }
        };
        this.page = 2;
        this.WooCommerce = WC({
            url: "http://localhost/dashboard/wordpress",
            consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
            consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
            wpAPI: true,
            version: 'wc/v3'
        });
        this.loadMoreProducts(null);
    }
    HomePage.prototype.loadMoreProducts = function (event) {
        var _this = this;
        console.log(event);
        if (event == null) {
            this.page = 2;
            this.moreProducts = [];
        }
        else
            this.page++;
        this.WooCommerce.getAsync("products?page=" + this.page).then(function (data) {
            _this.ngZone.run(function () { _this.moreProducts = _this.moreProducts.concat(JSON.parse(data.body)); });
            if (event != null) {
                event.target.complete();
            }
            if (JSON.parse(data.body).length < 10) {
                event.target.enable = false;
                _this.toast();
            }
        }, function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.toast = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: "No more products!",
                            duration: 5000
                        })];
                    case 1:
                        tc = _a.sent();
                        tc.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.WooCommerce.getAsync("products").then(function (data) {
            _this.ngZone.run(function () { _this.popProducts = (JSON.parse(data.body)); });
            console.log(_this.popProducts);
        }, function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.ngAfterViewInit = function () {
        this.carousel.play();
    };
    __decorate([
        ViewChild('carousel', { read: CarouselComponent }),
        __metadata("design:type", CarouselComponent)
    ], HomePage.prototype, "carousel", void 0);
    HomePage = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        __metadata("design:paramtypes", [ToastController, NgZone])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map