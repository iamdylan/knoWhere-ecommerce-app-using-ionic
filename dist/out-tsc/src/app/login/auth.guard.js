var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { RoutingStateService } from '../services/routing-state.service';
var NeedAuthGuard = /** @class */ (function () {
    function NeedAuthGuard(router, storage, routingState) {
        this.router = router;
        this.storage = storage;
        this.routingState = routingState;
    }
    NeedAuthGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        this.routingState.cartUrl = route['_routerState']['url'];
        console.log(this.routingState.cartUrl);
        return new Promise(function (resolve) {
            _this.storage.ready().then(function () {
                _this.storage.get("userLoginInfo").then(function (userLoginInfo) {
                    if (userLoginInfo != null) {
                        console.log(userLoginInfo);
                        resolve(true);
                    }
                    else {
                        _this.router.navigateByUrl('/login');
                        resolve(false);
                    }
                });
            });
        });
    };
    NeedAuthGuard = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router, Storage, RoutingStateService])
    ], NeedAuthGuard);
    return NeedAuthGuard;
}());
export { NeedAuthGuard };
//# sourceMappingURL=auth.guard.js.map