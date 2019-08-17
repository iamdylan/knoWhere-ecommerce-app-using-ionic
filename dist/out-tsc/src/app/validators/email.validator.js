var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';
var EmailValidator = /** @class */ (function () {
    function EmailValidator() {
    }
    EmailValidator.prototype.checkEmail = function (fc) {
        var _this = this;
        clearTimeout(this.debouncer);
        var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
        console.log('email validator');
        return new Promise(function (resolve) {
            if (pattern.test(fc.value) && fc.value !== "") {
                _this.debouncer = setTimeout(function () {
                    var WooCommerce = WC({
                        url: "http://localhost/dashboard/wordpress",
                        consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
                        consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
                        wpAPI: true,
                        version: 'wc/v3'
                    });
                    WooCommerce.get("customers/?email=" + fc.value, function (err, data, res) {
                        if (JSON.parse(data.body).length) {
                            resolve({ 'match': true });
                        }
                        else {
                            resolve(null);
                        }
                    });
                }, 200);
            }
            else {
                resolve(null);
            }
        });
    };
    EmailValidator = __decorate([
        Injectable()
    ], EmailValidator);
    return EmailValidator;
}());
export { EmailValidator };
//# sourceMappingURL=email.validator.js.map