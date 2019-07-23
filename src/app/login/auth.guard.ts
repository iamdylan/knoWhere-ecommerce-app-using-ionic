import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';
import { Storage } from '@ionic/storage';

@Injectable()
export class NeedAuthGuard implements CanActivate {

  constructor(private router: Router, public storage: Storage) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|Promise<boolean> {

    const redirectUrl = route['_routerState']['url'];
    console.log(redirectUrl)

    return new Promise(resolve => {
      this.storage.ready().then( () => {
        this.storage.get("userLoginInfo").then( (userLoginInfo) => {
            
            if(userLoginInfo != null){
              console.log(userLoginInfo)
                resolve (true);
            }else{
              this.router.navigateByUrl(
                this.router.createUrlTree(
                  ['/login'], {
                    queryParams: {
                      redirectUrl
                    }
                  }
                )
              );

              resolve (false);
            }
        })
      })
    })

  }


}