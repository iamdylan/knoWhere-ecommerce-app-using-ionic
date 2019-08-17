var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
var RoutingStateService = /** @class */ (function () {
    function RoutingStateService(router) {
        this.router = router;
        this.history = [];
        this.cartUrl = undefined;
    }
    RoutingStateService.prototype.loadRouting = function () {
        var _this = this;
        this.router.events
            .pipe(filter(function (event) { return event instanceof NavigationEnd; }))
            .subscribe(function (_a) {
            var urlAfterRedirects = _a.urlAfterRedirects;
            _this.history = _this.history.concat([urlAfterRedirects]);
        });
    };
    RoutingStateService.prototype.getHistory = function () {
        return this.history;
    };
    RoutingStateService.prototype.getPreviousUrl = function () {
        return this.history[this.history.length - 2] || '/home';
    };
    RoutingStateService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Router])
    ], RoutingStateService);
    return RoutingStateService;
}());
export { RoutingStateService };
//# sourceMappingURL=routing-state.service.js.map