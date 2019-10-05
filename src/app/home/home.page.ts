import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CarouselComponent } from 'angular-bootstrap-md';
import { WooCommerceService } from '../services/woo-commerce.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  @ViewChild('carousel', {read: CarouselComponent})carousel: CarouselComponent;

  popProducts: any;
  moreProducts: any[];
  page: number;
  slideOpts: {};
  slideOpts2: {};
  config: any;

  constructor(public toastCtrl: ToastController, private ngZone: NgZone, public WooCom: WooCommerceService, public http: HttpClient) {
    this.moreProducts = [];
    this.popProducts = [];

    this.config =  {
      effect: 'fade',
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

  }

  getProducts() {
    // tslint:disable-next-line: max-line-length
    this.http.get(`${this.WooCom.url}/wp-json/wc/v3/products/?consumer_key=${this.WooCom.consumerKey}&consumer_secret=${this.WooCom.consumerSecret}`)
    .subscribe(res => {
      this.popProducts = res;
      console.log(this.popProducts);
    });
  }

  loadMoreProducts(event) {
    if (event == null) {
      this.page = 2;
      this.moreProducts = [];
    } else {
      this.page++;
    }

    // tslint:disable-next-line: max-line-length
    this.http.get(`${this.WooCom.url}/wp-json/wc/v3/products/?page=${this.page}&consumer_key=${this.WooCom.consumerKey}&consumer_secret=${this.WooCom.consumerSecret}`)
    .subscribe(res => {
      const data: any = res;
      this.moreProducts = this.moreProducts.concat(res);

      if (event != null) {
        event.target.complete();
      }

      if (data.length === 0) {
        event.target.disabled = true;
        this.toast();
      }
    });

    // this.WC.WooCommerceV3.get("products?page=" + this.page).then( (data) => {
    //   this.ngZone.run(() => {this.moreProducts = this.moreProducts.concat(JSON.parse(data.body)); });

    //   if (event != null) {
    //     event.target.complete();
    //   }

    //   if (JSON.parse(data.body).length === 0) {
    //     event.target.enable = false;

    //     this.toast();
    //   }
    // }).catch((error) => {
    //   console.log(error.response.data);
    // });
  }

  async toast() {
    const tc = await this.toastCtrl.create({
          message: 'That\'s all for now. Please try again later.',
          duration: 5000,
          color: 'dark',
          cssClass: 'home-toast'
        });

    tc.present();
  }

  ngOnInit() {
    // this.WC.WooCommerceV3.getAsync('products').then( (data) => {
    //   this.ngZone.run(() => {this.popProducts = (JSON.parse(data.body)); });
    //   console.log(this.popProducts);
    // }, (err) => {
    //   console.log(err);
    // });
    this.getProducts();
    this.loadMoreProducts(null);
    this.carousel.play();
  }
}
