import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as WC from 'woocommerce-api';

import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage{
  product: any;
  WooCommerce: any;
  productInfo: any;
  reviews: any;
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

  constructor(private route: ActivatedRoute, private ngZone: NgZone, public storage: Storage, public toastCtrl: ToastController) {
    this.productInfo = [];
    this.reviews = [];
    this.productInfo.attributes = [];

    this.WooCommerce =  WC({
      url: "http://localhost/dashboard/wordpress",
      consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
      consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
      wpAPI: true,
      version: 'wc/v2'
    });
    
    this.route.params.subscribe((params: Params)=>{
      this.product = params['product'];
      console.log(this.product);
    });

    this.WooCommerce.getAsync("products/" + this.product).then((data) => {
      this.ngZone.run(() => { this.productInfo =  JSON.parse(data.body);});
      console.log(this.productInfo);
      }, (err) => {
        console.log(err);
    });

    this.WooCommerce.getAsync("products/"+(this.product)+"/reviews").then((data) => {
      this.ngZone.run(() => { this.reviews = JSON.parse(data.body);});
      console.log(this.reviews);
    }, (err) => {
      console.log(err);
    });
    
  }//Constructor close

  addToCart(product) {
    this.storage.get("cart").then((data) => {
      if (data == null || data.length == 0) {
        data = [];

        data.push({
          "product": product,
          "qty": 1,
          "amount": parseFloat(product.price)
        })
      } else {
        let added = 0;

        for (let i = 0; i < data.length; i++) {
          if (product.id == data[i].product.id) {
            let qty = data[i].qty;
            console.log("Product is already in the cart");

            data[i].qty = qty + 1;
            data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
            added = 1;
          }
        }

        if (added == 0) {
          data.push({
            "product": product,
            "qty": 1,
            "amount": parseFloat(product.price)
          })
        }
      }

      this.storage.set("cart", data).then(() => {
        console.log("Cart Updated");
        console.log(data);
      })
    })
  }//addToCart close

  async toast(){
    let tc= await this.toastCtrl.create({
      message: "Cart Updated",
      duration: 3000
    });

  tc.present();
  }//toast close
}//class close
