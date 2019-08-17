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
import { Component, ViewChild, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as WC from 'woocommerce-api';
import { AlertController, ToastController } from '@ionic/angular';
import { PasswordValidator } from '../validators/pass.validator';
import 'rxjs/add/operator/map';
import { EmailValidator } from '../validators/email.validator';
import { UserValidator } from '../validators/username.validator';
import errorMessages from './errorMessages.json';
var SignupPage = /** @class */ (function () {
    function SignupPage(fb, ngZone, toastCtrl, alertCtrl, emailValidator, userValidator) {
        this.fb = fb;
        this.ngZone = ngZone;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.emailValidator = emailValidator;
        this.userValidator = userValidator;
        this.formSettings = {
            theme: 'mobiscroll'
        };
        this.reactSubmitted = false;
        this.popupSettings = {
            theme: 'ios',
            display: 'center',
            focusOnClose: false,
            buttons: [{
                    text: 'Log in',
                    handler: 'set'
                }]
        };
        this.billing_shipping_same = false;
        this.billing_address = {};
        this.shipping_address = {};
    }
    SignupPage.prototype.getErrorState = function (field) {
        var ctrl = this.reactForm.get(field);
        return ctrl.invalid && this.reactSubmitted;
    };
    SignupPage.prototype.registerReact = function () {
        this.reactSubmitted = true;
        if (this.reactForm.valid && this.thanksPopup) {
            this.thanksPopup.instance.show();
        }
    };
    ;
    SignupPage.prototype.getErrorMessage = function (field) {
        var formCtrl = this.reactForm, message = '';
        if (formCtrl) {
            var ctrl = formCtrl.get(field);
            if (ctrl && ctrl.errors) {
                for (var err in ctrl.errors) {
                    if (!message && ctrl.errors[err]) {
                        var errField = field.replace(".", "_");
                        return message = errorMessages[errField][err];
                    }
                }
            }
            else if (formCtrl.hasError('noMatch')) {
                return message = errorMessages['conf_password']['noMatch'];
            }
        }
        return message;
    };
    SignupPage.prototype.setBillingToShipping = function () {
        this.billing_shipping_same = !this.billing_shipping_same;
        if (this.billing_shipping_same == true) {
            this.reactForm.patchValue({
                shipping: {
                    first_name: this.reactForm.value.billing.first_name,
                    last_name: this.reactForm.value.billing.last_name,
                    address_1: this.reactForm.value.billing.address_1,
                    address_2: this.reactForm.value.billing.address_2,
                    country: this.reactForm.value.billing.country,
                    state: this.reactForm.value.billing.state,
                    city: this.reactForm.value.billing.city,
                    postcode: this.reactForm.value.billing.postcode
                }
            });
        }
    };
    SignupPage.prototype.signup = function () {
        var _this = this;
        var WooCommerce = WC({
            url: "http://localhost/dashboard/wordpress",
            consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
            consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
            wpAPI: true,
            version: 'wc/v3'
        });
        var customerData = {};
        customerData = this.reactForm.value;
        if (this.billing_shipping_same) {
            this.shipping_address = this.shipping_address;
        }
        WooCommerce.postAsync('customers', customerData).then(function (data) {
            var response = (JSON.parse(data.body));
            console.log(response);
            if (response.id) {
                _this.presentAlert();
            }
            else if (response.data.status == 400) {
                _this.toast(response);
            }
        });
    };
    SignupPage.prototype.presentAlert = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Account Created',
                            message: 'Your account has been created successfully! Please login to proceed.',
                            buttons: [
                                {
                                    text: 'Login',
                                    role: 'Login',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        console.log('Confirm Cancel: blah');
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
    SignupPage.prototype.toast = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var tc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: response.message,
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
    SignupPage.prototype.ngOnInit = function () {
        this.reactForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(2)], this.userValidator.checkUser.bind(this.userValidator)],
            first_name: ['', [Validators.required, Validators.minLength(2)]],
            last_name: ['', [Validators.required, Validators.minLength(1)]],
            email: ['', [Validators.required, Validators.email], this.emailValidator.checkEmail.bind(this.emailValidator)],
            password: ['', [Validators.required, Validators.minLength(6)]],
            conf_password: ['', [Validators.required]],
            billing: this.fb.group({
                first_name: ['', [Validators.required, Validators.minLength(3)]],
                last_name: ['', [Validators.required, Validators.minLength(3)]],
                email: ['', [Validators.required, Validators.email]],
                address_1: ['', [Validators.required, Validators.minLength(5)]],
                address_2: ['', [Validators.required, Validators.minLength(2)]],
                country: ['', Validators.required],
                state: ['', [Validators.required, Validators.minLength(2)]],
                city: ['', [Validators.required, Validators.minLength(3)]],
                postcode: ['', [Validators.required, Validators.minLength(4)]],
                phone: ['', [Validators.required, Validators.minLength(10)]],
            }),
            shipping: this.fb.group({
                first_name: ['', [Validators.required, Validators.minLength(3)]],
                last_name: ['', [Validators.required, Validators.minLength(3)]],
                address_1: ['', [Validators.required, Validators.minLength(5)]],
                address_2: ['', [Validators.required, Validators.minLength(2)]],
                country: ['', Validators.required],
                state: ['', [Validators.required, Validators.minLength(2)]],
                city: ['', [Validators.required, Validators.minLength(3)]],
                postcode: ['', [Validators.required, Validators.minLength(4)]],
            })
        }, { validator: PasswordValidator.validPassword });
    };
    Object.defineProperty(SignupPage.prototype, "first_name", {
        get: function () { return this.reactForm.get('first_name'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignupPage.prototype, "last_name", {
        get: function () { return this.reactForm.get('last_name'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignupPage.prototype, "email", {
        get: function () { return this.reactForm.get('email'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignupPage.prototype, "password", {
        get: function () { return this.reactForm.get('password'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignupPage.prototype, "conf_password", {
        get: function () { return this.reactForm.get('conf_password'); },
        enumerable: true,
        configurable: true
    });
    __decorate([
        ViewChild('thanks'),
        __metadata("design:type", Object)
    ], SignupPage.prototype, "thanksPopup", void 0);
    SignupPage = __decorate([
        Component({
            selector: 'app-signup',
            templateUrl: './signup.page.html',
            styleUrls: ['./signup.page.scss'],
            changeDetection: ChangeDetectionStrategy.Default
        }),
        __metadata("design:paramtypes", [FormBuilder, NgZone, ToastController, AlertController, EmailValidator, UserValidator])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.page.js.map