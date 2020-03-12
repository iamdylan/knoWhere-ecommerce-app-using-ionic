import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CarouselComponent } from 'angular-bootstrap-md';
import { WooCommerceService } from '../services/woo-commerce.service';
import { HttpClient } from '@angular/common/http';
// import 'progressive-image.js/dist/progressive-image';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  @ViewChild('carousel', {read: CarouselComponent, static: true})carousel: CarouselComponent;

  popProducts: any;
  moreProducts: any[];
  page: number;
  slideOpts: {};
  config: any;
  endMsg: boolean;
  offersConfig: {};
  newDealsConfig: {};

  constructor(public toastCtrl: ToastController, private ngZone: NgZone, public WooCom: WooCommerceService, public http: HttpClient) {
    this.moreProducts = [];
    this.popProducts = [];
    this.endMsg = false;

    this.offersConfig = {
      'slidesToShow': 1,
      'slidesToScroll': 1,
      'arrows': true,
      'accessibility': true,
      'dots': true,
      'infinite': true,
      'autoplay': true,
      'autoplaySpeed': 4000,
      'fade': true,
      'cssEase': 'linear',
      'lazyLoad': 'ondemand',
      'adaptiveHeight': true
    };

    this.newDealsConfig = {
      'slidesToShow': 3,
      'slidesToScroll': 1,
      'infinite': true,
      'arrows': true,
      'accessibility': true,
      'autoplay': true,
      'autoplaySpeed': 3000,
      'cssEase': 'ease',
      'adaptiveHeight': false,
    };

    // this.config =  {
    //   autoplay: {
    //     delay: 3000,
    //     disableOnInteraction: false
    //   },
    //   loop: true,
    //   speed: 1500,
    // };

    this.slideOpts = {
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
        // this.toast();
        this.endMsg = true;
      }
    });

  }

  // async toast() {
  //   const tc = await this.toastCtrl.create({
  //         message: 'That\'s all for now. Please try again later.',
  //         duration: 5000,
  //         color: 'dark',
  //         cssClass: 'home-toast'
  //       });

  //   tc.present();
  // }

  // slidesDidLoad(slides) {
  //   slides.startAutoplay();
  // }

  trackByFn(index, item) {
    return index; // or item.id
  }

  ngOnInit() {
    this.getProducts();
    this.loadMoreProducts(null);
    // this.carousel.play();
  }
}
