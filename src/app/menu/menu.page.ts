import { Component, OnInit } from '@angular/core';
import { HomePage } from '../home/home.page';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  homePage: any;
  WooCommerce: any;
  categories: any[];

  constructor() { 
    this.homePage = HomePage;
    this.categories = [];

    this.WooCommerce =  WC({
      url: "http://localhost/dashboard/wordpress",
      consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
      consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
      wpAPI: true,
      version: 'wc/v3'
    });

    this.WooCommerce.getAsync("products/categories").then((data) => {
      console.log(JSON.parse(data.body));

      let temp: any[] = JSON.parse(data.body);

      for( let i = 1; i < temp.length; i ++){
        if(temp[i].parent == 0){
          this.categories.push(temp[i]);
        }
      }
      if(temp[0].parent == 0){
        this.categories.push(temp[0]);
      }
    }, (err)=> {
      console.log(err)
    })

    
  }

  ngOnInit() {
  }

}
