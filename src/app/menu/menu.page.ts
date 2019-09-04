import { Component, OnInit, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import * as WC from 'woocommerce-api';
import { MenuController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/bufferCount';
import { RoutingStateService } from '../services/routing-state.service';
import { GetUserInfo } from './getUserInfo.service';
import { WooCommerceService } from '../services/woo-commerce.service';

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
  
  constructor(public menuCtrl: MenuController, public router: Router, public storage: Storage, private routingState: RoutingStateService, public getUserInfo: GetUserInfo, public alertCtrl: AlertController, public WC: WooCommerceService) { 
    this.categories = [];

    // this.WooCommerce =  WC({
    //   url: "http://localhost/dashboard/wordpress",
    //   consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
    //   consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
    //   wpAPI: true,
    //   version: 'wc/v3'
    // });
  }

  logOut(){
      console.log('logging out')
      this.storage.remove("userLoginInfo").then( () => {
        this.getUserInfo.user = {};
        this.presentAlert();
        console.log(this.getUserInfo.user)
        this.getUserInfo.loggedIn.next(false);
      })
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Logout Successful',
      buttons: [
        {
          text: 'OK',
          cssClass: 'secondary',
          handler: () => {
            console.log('routing')
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
    this.WC.WooCommerceV3.getAsync("products/categories").then((data) => {
      let temp: any[] = JSON.parse(data.body);

      for( let i = 0; i < temp.length; i++){
        if(temp[i].parent == 0){

          if(temp[i].slug == "clothing"){
            temp[i].icon = "shirt";
            this.categories.push(temp[i]);
          }
          else if(temp[i].slug == "music"){
            temp[i].icon = "musical-notes";
            this.categories.push(temp[i]);
          }
          else if(temp[i].slug == "posters"){
            temp[i].icon = "images";
            this.categories.push(temp[i]);
          }
          else if(temp[i].slug == "accessories"){
            temp[i].icon = "watch";
            this.categories.push(temp[i]);
          }
          else if(temp[i].slug == "decor"){
            temp[i].icon = "rose";
            this.categories.push(temp[i]);
          }
          else if(temp[i].slug == "hoodies"){
            temp[i].icon = "snow";
            this.categories.push(temp[i]);
          }
          else if(temp[i].slug == "uncategorized"){
            temp[i].icon = "basket";
            this.categories.push(temp[i]);
          }
        }
      }
    }, (err)=> {
      console.log(err)
    })
    
    this.storage.ready().then( () => {
      this.storage.get("userLoginInfo").then( (userLoginInfo) => {

    if(userLoginInfo != null){
      console.log("User logged in...");
      this.getUserInfo.user = userLoginInfo.user;
      console.log(this.getUserInfo.user);
      this.getUserInfo.loggedIn.next(true);
    }
    else {
      console.log("No user found.");
      this.getUserInfo.user = {};
      console.log(this.getUserInfo.user);
      this.getUserInfo.loggedIn.next(false);
    }
    });
  });

}
}
