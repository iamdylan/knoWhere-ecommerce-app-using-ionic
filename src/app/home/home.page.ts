import { Component, ChangeDetectorRef } from '@angular/core';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  WooCommerce: any;
  products: any;
  moreProducts: any[];
  page: number;

  slideOpts = {
    effect: 'flip',
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    speed: 1500,
    pagination: {
      el: '.swiper-pagination',
      clickable: true    }
  };

  slideOpts2 = {
    effect: 'flip',
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    speed: 1500,
    pagination: {
      clickable: true    }
  };

  constructor(private ref: ChangeDetectorRef){
    this.page = 2;

    this.WooCommerce =  WC({
      url: "http://localhost/dashboard/wordpress",
      consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
      consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
      wpAPI: true,
      version: 'wc/v3'
    });

    this.loadMoreProducts();

    this.WooCommerce.getAsync("products").then( (data) => {
      this.products = JSON.parse(data.body);
      this.ref.detectChanges();
      console.log(this.products);
    }, (err) => {
      console.log(err)
    })
    
  }

  loadMoreProducts(){
    this.WooCommerce.getAsync("products?page=" + this.page).then( (data) => {
      console.log(JSON.parse(data.body));
      this.moreProducts = JSON.parse(data.body);
    }, (err) => {
      console.log(err)
    })
  }
    


  
}
