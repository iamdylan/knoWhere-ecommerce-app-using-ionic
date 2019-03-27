import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  product: any;
  WooCommerce: any;
  productInfo: any;
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

  constructor(private route: ActivatedRoute, private ngZone: NgZone) {
    this.productInfo=[];
   
    this.WooCommerce =  WC({
      url: "http://localhost/dashboard/wordpress",
      consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
      consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
      wpAPI: true,
      version: 'wc/v3'
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
  }

  ngOnInit() {
  }

}
