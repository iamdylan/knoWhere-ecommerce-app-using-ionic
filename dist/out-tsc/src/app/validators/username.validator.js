var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';
var UserValidator = /** @class */ (function () {
    function UserValidator() {
    }
    UserValidator.prototype.checkUser = function (fc) {
        var _this = this;
        clearTimeout(this.debouncer);
        console.log('Username validator');
        return new Promise(function (resolve) {
            if (fc.value.length > 1) {
                _this.debouncer = setTimeout(function () {
                    var WooCommerce = WC({
                        url: "http://localhost/dashboard/wordpress",
                        consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
                        consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
                        wpAPI: true,
                        version: 'wc/v3'
                    });
                    WooCommerce.get("customers/?username=" + fc.value, function (err, data, res) {
                        Array.prototype.some.call(JSON.parse(data.body), function (item) {
                            if (item.username == fc.value) {
                                resolve({ 'match': true });
                            }
                            else {
                                resolve(null);
                            }
                            return (item.username == fc.value);
                        });
                    });
                }, 200);
            }
            else {
                resolve(null);
            }
        });
    };
    UserValidator = __decorate([
        Injectable()
    ], UserValidator);
    return UserValidator;
}());
export { UserValidator };
//# sourceMappingURL=username.validator.js.map