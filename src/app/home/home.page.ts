import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WooCommerceService } from '../services/woo-commerce.service';
// import { ToastController } from '@ionic/angular';
// import { CarouselComponent } from 'angular-bootstrap-md';
// import { SlickCarouselComponent } from 'ngx-slick-carousel';
// import 'progressive-image.js/dist/progressive-image';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  // @ViewChild('carousel', {read: CarouselComponent, static: true})carousel: CarouselComponent;
  // @ViewChild('slickModal', {read: SlickCarouselComponent, static: true})slickModal: SlickCarouselComponent;

  popProducts: any;
  moreProducts: any[];
  pageNo: number;
  endMsg: boolean;
  offersConfig: {};
  newDealsConfig: {};
  offers: Array<number>;
  // slideOpts: {};
  // config: any;

  constructor(public WooCom: WooCommerceService, public http: HttpClient) {
    this.popProducts = [];
    this.pageNo = 2;
    this.moreProducts = [];
    this.endMsg = false;

    this.offersConfig = {
      items: 1,
      dots: true,
      nav: true,
      navElement: 'div',
      loop: true,
      autoplay: true,
      autoplaySpeed: 3000,
      animateOut: 'fadeOut'
    };

    this.newDealsConfig = {
      items: 3,
      dots: false,
      nav: true,
      navElement: 'div',
      loop: true,
      autoplay: true,
      autoplaySpeed: 1500,
      autoplayTimeout: 3500
    };

    // this.config =  {
    //   autoplay: {
    //     delay: 3000,
    //     disableOnInteraction: false
    //   },
    //   loop: true,
    //   speed: 1500,
    // };

    // this.slideOpts = {
    //   autoplay: {
    //     delay: 3000,
    //     disableOnInteraction: false
    //   },
    //   loop: true,
    //   speed: 1500,
    //   slidesPerView: 3,
    //   pagination: {
    //     clickable: true
    //   }
    // };
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
      this.pageNo = 2;
      this.moreProducts = [];
    } else {
      this.pageNo++;
    }

    // tslint:disable-next-line: max-line-length
    this.http.get(`${this.WooCom.url}/wp-json/wc/v3/products/?page=${this.pageNo}&consumer_key=${this.WooCom.consumerKey}&consumer_secret=${this.WooCom.consumerSecret}`)
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

  // trackByFn(index, item) {
  //   return index; // or item.id
  // }

  ngOnInit() {
    this.getProducts();
    this.loadMoreProducts(null);
    // this.carousel.play();
  }

  // ionViewDidLeave() {
  //   this.slickModal.slickPause();
  // }


  ionViewDidEnter() {
    this.offers = [1, 2, 3, 4];
    // this.offersConfig = {
    //   'slidesToShow': 1,
    //   'slidesToScroll': 1,
    //   'arrows': true,
    //   'accessibility': true,
    //   'dots': true,
    //   'infinite': true,
    //   'autoplay': true,
    //   'speed': 4000,
    //   'fade': true,
    //   // 'cssEase': 'ease-in-out',
    //   // 'lazyLoad': 'progressive',
    //   'adaptiveHeight': true,
    // };

    // this.newDealsConfig = {
    //   'slidesToShow': 3,
    //   'slidesToScroll': 1,
    //   'infinite': true,
    //   'arrows': true,
    //   'accessibility': true,
    //   'autoplay': true,
    //   'autoplaySpeed': 3000,
    //   'cssEase': 'ease',
    //   'adaptiveHeight': false,
    // };

    // this.slickModal.slickPlay();
  }
}
