import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Services } from '../services/services.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})

export class ProductDetailsPage implements OnInit {
  @ViewChild('slides', {read: IonSlides, static: false}) slides: IonSlides;

  product: any;
  productInfo: any;
  // reviews: any;

  slideOpts = {
    effect: 'flip',
    loop: false,
  };

  constructor(private route: ActivatedRoute, public storage: Storage,
  public toastCtrl: ToastController, public services: Services,
  public http: HttpClient) {

    this.productInfo = [];
    // this.reviews = [];
    this.productInfo.attributes = [];

    this.route.params.subscribe((params: Params) => {
      this.product = params['product'];
    });

  }


  nextSlide() {
    this.slides.slideNext();
  }


  prevSlide() {
    this.slides.slidePrev();
  }


  getProdInfo() {
    // tslint:disable-next-line: max-line-length
    this.http.get(`${this.services.api_url}/wp-json/wc/v3/products/${this.product}/?&consumer_key=${this.services.wooConsKey}&consumer_secret=${this.services.wooConsSecret}`)
    .subscribe(res => {
      this.productInfo = res;
      // console.log(this.productInfo);
    });
  }


  // getProdReviews() {
       // tslint:disable-next-line: max-line-length
  //   this.http.get(`${this.WooCom.url}/wp-json/wc/v2/products/${this.product}/reviews/?&consumer_key=${this.WooCom.consumerKey}&consumer_secret=${this.WooCom.consumerSecret}`)
  //   .subscribe(res => {
  //     this.reviews = res;
  //     console.log(this.reviews);
  //   });
  // }


  addToCart(prod) {
    const product = prod;

    if (product.price == null) {
      // return console.log('Could not add item to cart.');
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
            // console.log('Product is already in the cart');

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
        // console.log('Cart Updated');
        // console.log(res);
        if (res[res.length - 1].product.id === product.id) {
          this.toast();
        }
      });
    });
  }


  async toast() {
    const tc = await this.toastCtrl.create({
      message: 'Added to Cart',
      duration: 5000,
      cssClass: 'addToCart-toast',
      color: 'dark'
    });

    tc.present();
  }


  ngOnInit() {
    this.getProdInfo();
    // this.getProdReviews();
  }

}
