import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/filter';
import { RoutingStateService } from '../services/routing-state.service';
import { WooCommerceService } from '../services/woo-commerce.service';
import { GetUserInfo } from './getUserInfo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss']
})

export class MenuPage implements OnInit {
  WooCommerce: any;
  categories: any[];

  routeData: any;
  name: any;
  previousRoute: string;

  constructor(public menuCtrl: MenuController, public router: Router, public storage: Storage,
    private routingState: RoutingStateService, public getUserInfo: GetUserInfo,
    public alertCtrl: AlertController, public WooCom: WooCommerceService, public http: HttpClient) {
    this.categories = [];
  }

  getProdCateg() {
    // tslint:disable-next-line: max-line-length
    this.http.get(`${this.WooCom.url}/wp-json/wc/v3/products/categories/?consumer_key=${this.WooCom.consumerKey}&consumer_secret=${this.WooCom.consumerSecret}`)
    .subscribe(res => {
      console.log(res);
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
          } else if (temp[i].slug === 'uncategorised') {
            temp[i].icon = 'basket';
            this.categories.push(temp[i]);
          }
      }
    });
  }

  logOut() {
      console.log('logging out');
      this.storage.remove('userLoginInfo').then( () => {
        this.getUserInfo.user = {};
        this.presentAlert();
        console.log(this.getUserInfo.user);
        this.getUserInfo.loggedIn.next(false);
      });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Logout Successful',
      buttons: [
        {
          text: 'OK',
          cssClass: 'secondary',
          handler: () => {
            console.log('routing');
              this.router.navigateByUrl(
                '/home'
              );
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    this.getProdCateg();
    // this.WC.WooCommerceV3.get('products/categories', function(err, data, res) {
    //   const temp: any[] = JSON.parse(data.body);

    //   for ( let i = 0; i < temp.length; i++) {
    //     if (temp[i].parent === 0) {

    //       if (temp[i].slug === 'clothing') {
    //         temp[i].icon = 'shirt';
    //         this.categories.push(temp[i]);
    //       } else if (temp[i].slug === 'music') {
    //         temp[i].icon = 'musical-notes';
    //         this.categories.push(temp[i]);
    //       } else if (temp[i].slug === 'posters') {
    //         temp[i].icon = 'images';
    //         this.categories.push(temp[i]);
    //       } else if (temp[i].slug === 'accessories') {
    //         temp[i].icon = 'watch';
    //         this.categories.push(temp[i]);
    //       } else if (temp[i].slug === 'decor') {
    //         temp[i].icon = 'rose';
    //         this.categories.push(temp[i]);
    //       } else if (temp[i].slug === 'hoodies') {
    //         temp[i].icon = 'snow';
    //         this.categories.push(temp[i]);
    //       } else if (temp[i].slug === 'uncategorized') {
    //         temp[i].icon = 'basket';
    //         this.categories.push(temp[i]);
    //       }
    //     }
    //   }
    // }, (err) => {
    //   console.log(err);
    // });

    this.storage.ready().then( () => {
      this.storage.get('userLoginInfo').then( (userLoginInfo) => {

        if (userLoginInfo != null) {
          console.log('User logged in...');
          this.getUserInfo.user = userLoginInfo.user;
          console.log(this.getUserInfo.user);
          this.getUserInfo.loggedIn.next(true);
        } else {
          console.log('No user found.');
          this.getUserInfo.user = {};
          console.log(this.getUserInfo.user);
          this.getUserInfo.loggedIn.next(false);
        }
      });
    });

}
}
