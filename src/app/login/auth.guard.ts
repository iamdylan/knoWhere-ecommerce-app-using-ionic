import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';
import { Storage } from '@ionic/storage';

@Injectable()
export class NeedAuthGuard implements CanActivate {

  constructor(private router: Router, public storage: Storage) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const redirectUrl = route['_routerState']['url'];
    console.log(redirectUrl)

    // this.storage.ready().then( () => {
    //     this.storage.get("userLoginInfo").then( (userLoginInfo) => {
    //         console.log(userLoginInfo)
            if(this.storage.get("userLoginInfo") != null){
                
                console.log(this.storage.get("userLoginInfo"))
                return true;
            }
    //     })
    // })

    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/login'], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );

    return false;
  }
}