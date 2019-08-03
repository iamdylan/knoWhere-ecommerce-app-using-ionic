import { Component, NgZone, ViewChild } from '@angular/core';
import {  ToastController, IonSlides } from '@ionic/angular'
import * as WC from 'woocommerce-api';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  WooCommerce: any;
  popProducts: any;
  moreProducts: any[];
  page: number;
  slideOpts: {};
  slideOpts2: {};
  config: any

  constructor(public toastCtrl: ToastController, private ngZone: NgZone){
    this.config =  {
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      loop: true,
      speed: 1500,
      pagination: {
        el: '.swiper-pagination',
        },
        paginationClickable: true,
        navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        }
    };
  
    this.slideOpts2 = {
      effect: 'flip',
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      loop: true,
      speed: 1500,
      slidesPerView: 3,
      pagination: {
        clickable: true 
      }
    };


    this.page = 2;

    this.WooCommerce =  WC({
      url: "http://localhost/dashboard/wordpress",
      consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
      consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
      wpAPI: true,
      version: 'wc/v3'
    });

    

    this.loadMoreProducts(null);
  }

  loadMoreProducts(event){
    console.log(event);
    if(event == null)
    {
      this.page = 2;
      this.moreProducts = [];
    }
    else
      this.page++;

    this.WooCommerce.getAsync("products?page=" + this.page).then( (data) => {
      this.ngZone.run(() => {this.moreProducts = this.moreProducts.concat(JSON.parse(data.body));});

      if(event != null)
      {
        event.target.complete();
      }

      if(JSON.parse(data.body).length < 10){
        event.target.enable=false;

        this.toast();
      }
    }, (err) => {
      console.log(err)
    })
  }
    

  async toast(){
    let tc= await this.toastCtrl.create({
          message: "No more products!",
          duration: 5000
        });

    tc.present();
  }


  ionViewWillEnter(){
    this.WooCommerce.getAsync("products").then( (data) => {
      this.ngZone.run(() => {this.popProducts = (JSON.parse(data.body));});
      console.log(this.popProducts)
    }, (err) => {
      console.log(err);
    });
  }
}
