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
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { ToastController, AlertController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router, } from '@angular/router';
import { RoutingStateService } from '../services/routing-state.service';
import { GetUserInfo } from '../menu/getUserInfo.service';
var LoginPage = /** @class */ (function () {
    function LoginPage(fb, http, router, toastCtrl, storage, alertCtrl, events, routingState, getUserInfo) {
        this.fb = fb;
        this.http = http;
        this.router = router;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.routingState = routingState;
        this.getUserInfo = getUserInfo;
        this.attemptedSubmit = false;
        this.formSettings = {
            theme: 'ios',
        };
        this.errorMessages = {
            required: '{$1} required',
            minlength: 'At least 6 characters required'
        };
        this.loginForm = fb.group({
            username: ['', [Validators.required, Validators.minLength(6)]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
    LoginPage.prototype.logIn = function () {
        var _this = this;
        this.http.get("http://localhost/dashboard/wordpress/api/auth/generate_auth_cookie/?insecure=cool&username=" + this.loginForm.value.username + "&password=" + this.loginForm.value.password)
            .subscribe(function (res) {
            var response = res.json();
            if (response.error) {
                _this.markFieldsDirty();
                _this.toast(response);
                return;
            }
            _this.storage.set("userLoginInfo", response).then(function (data) {
                _this.getUserInfo.user = response.user;
                console.log(_this.getUserInfo.user);
                _this.getUserInfo.loggedIn.next(true);
                _this.presentAlert();
            });
        });
    };
    LoginPage.prototype.toast = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var tc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: response.error,
                            duration: 5000,
                            showCloseButton: true,
                            color: "dark"
                        })];
                    case 1:
                        tc = _a.sent();
                        tc.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.presentAlert = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Login Successful',
                            buttons: [
                                {
                                    text: 'OK',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('routing');
                                        if (_this.routingState.cartUrl) {
                                            _this.router.navigateByUrl(_this.routingState.cartUrl);
                                        }
                                        else {
                                            _this.router.navigateByUrl(_this.previousRoute);
                                        }
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.markFieldsDirty = function () {
        var controls = this.loginForm.controls;
        for (var field in controls) {
            if (controls[field]) {
                controls[field].markAsDirty();
            }
        }
    };
    // logIn() {
    //   this.attemptedSubmit = true;
    //   if (this.loginForm.valid) {
    //     mobiscroll.toast({
    //       message: 'Logged In!',
    //       callback: () => {
    //         this.loginForm.reset();
    //         this.attemptedSubmit = false;
    //       }
    //     });
    //   } else {
    //     this.markFieldsDirty();
    //   }
    // }
    LoginPage.prototype.errorFor = function (fieldName) {
        var field = this.loginForm.controls[fieldName];
        for (var validator in field.errors) {
            if (field.errors[validator]) {
                var friendlyName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
                return this.errorMessages[validator].replace('{$1}', friendlyName);
            }
        }
        return null;
    };
    LoginPage.prototype.ionViewDidEnter = function () {
        this.previousRoute = this.routingState.getPreviousUrl();
        console.log('Previous route', this.previousRoute);
    };
    LoginPage = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        __metadata("design:paramtypes", [FormBuilder, Http, Router, ToastController, Storage, AlertController, Events, RoutingStateService, GetUserInfo])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map