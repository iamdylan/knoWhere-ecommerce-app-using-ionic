import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class CheckLoggedIn implements CanActivate {

  constructor(private router: Router, public storage: Storage) {
  }

  canActivate(): boolean|Promise<boolean> {
    return new Promise(resolve => {
      this.storage.ready().then( () => {
        this.storage.get('userInfo').then( (userInfo) => {
          if (userInfo != null) {
            this.router.navigateByUrl('/home');
            resolve (false);
          } else {
            resolve (true);
          }
        });
      });
    });
  }
}
