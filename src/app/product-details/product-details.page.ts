import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart.page';
import { WooCommerceService } from '../services/woo-commerce.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})

export class ProductDetailsPage implements OnInit {
  product: any;
  WooCommerce: any;
  productInfo: any;
  reviews: any;
  slideOpts = {
    effect: 'flip',
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    }
  };

  constructor(private route: ActivatedRoute, private ngZone: NgZone, public storage: Storage,
    public toastCtrl: ToastController, public modalCtrl: ModalController, public WooCom: WooCommerceService, public http: HttpClient) {

    this.productInfo = [];
    this.reviews = [];
    this.productInfo.attributes = [];

    this.route.params.subscribe((params: Params) => {
      this.product = params['product'];
    });

  }// Constructor close

  getProdInfo() {
    // tslint:disable-next-line: max-line-length
    this.http.get(`${this.WooCom.url}/wp-json/wc/v3/products/${this.product}/?&consumer_key=${this.WooCom.consumerKey}&consumer_secret=${this.WooCom.consumerSecret}`)
    .subscribe(res => {
      this.productInfo = res;
      console.log(this.productInfo);
    });
  }

  getProdReviews() {
    // tslint:disable-next-line: max-line-length
    this.http.get(`${this.WooCom.url}/wp-json/wc/v2/products/${this.product}/reviews/?&consumer_key=${this.WooCom.consumerKey}&consumer_secret=${this.WooCom.consumerSecret}`)
    .subscribe(res => {
      this.reviews = res;
      console.log(this.reviews);
    });
  }

  async addToCart(prod) {
    const product = await prod;

    if (product.price == null) {
      return console.log('Could not add item to cart.');
    }

    this.storage.get('cart').then((data) => {
      if (data == null || data.length === 0) {
        data = [];

        data.push({
          'product': product,
          'qty': 1,
          'amount': parseFloat(product.price)
        });

      } else {
        let added = 0;

        for (let i = 0; i < data.length; i++) {
          if (product.id === data[i].product.id) {
            const qty = data[i].qty;
            console.log('Product is already in the cart');

            data[i].qty = qty + 1;
            data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
            added = 1;
          }
        }

        if (added === 0) {
          data.push({
            'product': product,
            'qty': 1,
            'amount': parseFloat(product.price)
          });
        }
      }

      this.storage.set('cart', data).then((res) => {
        console.log('Cart Updated');
        console.log(res);
        if (res[res.length - 1].product.id === product.id) {
          this.toast();
        }
      });
    });
  }// addToCart close

  async toast() {
    const tc = await this.toastCtrl.create({
      message: 'Added to Cart',
      duration: 5000,
      cssClass: 'addToCart-toast',
      color: 'dark'
    });

    tc.present();
  }// toast close

  async openCart() {
    const modal = await this.modalCtrl.create({component: CartPage});
    return await modal.present();
  }

  ngOnInit() {
    // this.WC.WooCommerceV3.getAsync('products/' + this.product).then((data) => {
    //   this.ngZone.run(() => { this.productInfo =  JSON.parse(data.body); });
    //   }, (err) => {
    //     console.log(err);
    // });

    // this.WC.WooCommerceV2.getAsync('products/' + (this.product) + '/reviews').then((data) => {
    //   this.ngZone.run(() => { this.reviews = JSON.parse(data.body); });
    // }, (err) => {
    //   console.log(err);
    // });

    this.getProdInfo();
    this.getProdReviews();
  }
}// class close
