import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertsToastsService } from 'src/app/services/alerts-toasts.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {

  constructor(
    public storage: Storage,
    private router: Router,
    public alertsToasts: AlertsToastsService

  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise(resolve => {
      this.storage.ready().then( () => {
        this.storage.get('cart').then((items) => {
          if (items.length > 0) {
            resolve (true);
          } else {
            this.router.navigateByUrl('/cart');
            this.alertsToasts.emptyCartToast();
            resolve (false);
          }
        });
      });
    });
  }

}
