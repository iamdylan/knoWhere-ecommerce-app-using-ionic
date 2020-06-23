import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Services } from '../services/services.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss']
})

export class MenuPage implements OnInit {

  categories: any[];

  constructor(public router: Router, public storage: Storage, public alertCtrl: AlertController,
  public http: HttpClient, public services: Services) {

      this.categories = [];

  }


  getProdCateg() {
     // tslint:disable-next-line: max-line-length
    this.http.get(`${this.services.api_url}/wp-json/wc/v3/products/categories/?consumer_key=${this.services.wooConsKey}&consumer_secret=${this.services.wooConsSecret}`)
    .subscribe(res => {
      // console.log(res);
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
    // console.log('logging out');
    this.storage.remove('userInfo').then( () => {
      this.services.user.next(null);
      this.presentAlert();
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
            // console.log('routing');
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

    this.storage.ready().then( () => {
      this.storage.get('userInfo').then( (userInfo) => {

        if (userInfo != null) {
          console.log('User logged in...');
          this.services.user.next(userInfo);
          // console.log(this.services.user);

        } else {
          console.log('No user found.');
          this.services.user.next(null);
        }
      });
    });
  }
}
