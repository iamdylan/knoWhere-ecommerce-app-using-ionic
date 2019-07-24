import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';
import { Storage } from '@ionic/storage';
import { RoutingStateService } from '../services/routing-state.service';

@Injectable()
export class NeedAuthGuard implements CanActivate {

  constructor(private router: Router, public storage: Storage, private routingState: RoutingStateService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|Promise<boolean> {
    this.routingState.cartUrl = route['_routerState']['url'];
    console.log(this.routingState.cartUrl)
    console.log(route)

    return new Promise(resolve => {
      this.storage.ready().then( () => {
        this.storage.get("userLoginInfo").then( (userLoginInfo) => {
            
            if(userLoginInfo != null){
              console.log(userLoginInfo)
                resolve (true);
            }else{
              this.router.navigateByUrl('/login');
              resolve (false);
            }
        })
      })
    })
  }

}