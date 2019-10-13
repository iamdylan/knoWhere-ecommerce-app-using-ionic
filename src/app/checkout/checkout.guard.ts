import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {
  constructor(public storage: Storage, public toastCtrl: ToastController, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return new Promise(resolve => {
        this.storage.ready().then( () => {
          this.storage.get('cart').then((items) => {
            if (items.length > 0) {
              resolve (true);
            } else {
              this.router.navigateByUrl('/cart');
              this.toast();
              resolve (false);
            }
            console.log(items);
          });
        });
      });
  }

  async toast() {
    const tc = await this.toastCtrl.create({
          message: 'Your Cart seems to be empty!',
          duration: 5000,
          color: 'dark',
          cssClass: 'cart-toast'
        });

    tc.present();
  }
}
