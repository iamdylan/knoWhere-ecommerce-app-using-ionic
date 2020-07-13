import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Services } from '../../services/api-userState.service';
import { catchError, retryWhen, delay } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AlertsToastsService } from '../../services/alerts-toasts.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss']
})

export class MenuPage implements OnInit {

  categories: any[];

  constructor(
    public router: Router,
    public storage: Storage,
    public http: HttpClient,
    public services: Services,
    public alertsToasts: AlertsToastsService
  ) {

      this.categories = [];

  }


  getProdCateg() {
     // tslint:disable-next-line: max-line-length
    this.http.get(`${this.services.api_url}/wp-json/wc/v3/products/categories/?consumer_key=${this.services.wooConsKey}&consumer_secret=${this.services.wooConsSecret}`)
    .pipe(
      catchError((err) => {
        // console.log(err);
        return throwError(err);
      }),
      retryWhen((error) => error.pipe(delay(1000)))
    )
    .subscribe(res => {
      const temp: any = res;

      for ( let i = 0; i < temp.length; i++) {
        if (temp[i].slug === 'clothing') {
          temp[i].icon = 'shirt';
          this.categories.push(temp[i]);
        } else if (temp[i].slug === 'music') {
          temp[i].icon = 'musical-notes';
          this.categories.push(temp[i]);
        } else if (temp[i].slug === 'posters') {
          temp[i].icon = 'images';
          this.categories.push(temp[i]);
        } else if (temp[i].slug === 'uncategorized') {
          temp[i].icon = 'basket';
          this.categories.push(temp[i]);
        }
      }
    });
  }


  logOut() {
    this.storage.remove('userInfo').then( () => {
      this.services.user.next(null);
      this.alertsToasts.logoutSuccessToast();
    });
  }


  ngOnInit() {
    this.getProdCateg();

    this.storage.ready().then( () => {
      this.storage.get('userInfo').then( (userInfo) => {

        if (userInfo != null) {
          console.log('User logged in...');
          this.services.user.next(userInfo);
        } else {
          console.log('No user found.');
          this.services.user.next(null);
        }

      });
    });
  }
}
