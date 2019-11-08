import {CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';
import { RoutingStateService } from '../services/routing-state.service';

@Injectable()
export class NeedAuthGuard implements CanActivate {

  constructor(private router: Router, public storage: Storage, private routingState: RoutingStateService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean|Promise<boolean> {
    this.routingState.cartUrl = route['_routerState']['url'];
    console.log(this.routingState.cartUrl);

    return new Promise(resolve => {
      this.storage.ready().then( () => {
        this.storage.get('userLoginInfo').then( (userLoginInfo) => {

            if (userLoginInfo != null) {
              console.log(userLoginInfo);
                resolve (true);
            } else {
                this.router.navigateByUrl('/login');
                resolve (false);
            }
        });
      });
    });
  }

}
