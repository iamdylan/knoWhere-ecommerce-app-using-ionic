import { Component, OnInit } from '@angular/core';
import { HomePage } from '../home/home.page';
import * as WC from 'woocommerce-api';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  WooCommerce: any;
  categories: any[];
  public rootPage: any = HomePage;
  

  constructor(public menuCtrl: MenuController, public router: Router) { 
    this.categories = [];

    this.WooCommerce =  WC({
      url: "http://localhost/dashboard/wordpress",
      consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
      consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
      wpAPI: true,
      version: 'wc/v3'
    });

    this.WooCommerce.getAsync("products/categories").then((data) => {
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

  }

  ngOnInit() {
  }

}
