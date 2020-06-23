import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OwlCarousel } from 'ngx-owl-carousel';
import { Services } from '../services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomePage implements OnInit {

  popProducts: any;
  moreProducts: any[];
  pageNo: number;
  endMsg: boolean;
  offersConfig: {};
  newDealsConfig: {};
  offers: Array<number>;

  constructor(public http: HttpClient, public services: Services) {

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

    this.popProducts = [];
    this.pageNo = 2;
    this.moreProducts = [];
    this.endMsg = false;
    this.offers = [1, 2, 3, 4];
  }

  @ViewChild('mainSlider', {static: false}) mainSlider: OwlCarousel;
  @ViewChild('newDealSlider', {static: false}) newDealSlider: OwlCarousel;


  getProducts() {
      // tslint:disable-next-line: max-line-length
    this.http.get(`${this.services.api_url}/wp-json/wc/v3/products/?consumer_key=${this.services.wooConsKey}&consumer_secret=${this.services.wooConsSecret}`)
    .subscribe(res => {
      this.popProducts = res;
      // console.log(this.popProducts);
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
    this.http.get(`${this.services.api_url}/wp-json/wc/v3/products/?page=${this.pageNo}&consumer_key=${this.services.wooConsKey}&consumer_secret=${this.services.wooConsSecret}`)
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


  ionViewWillEnter() {
    // console.log('enter');
    if (this.mainSlider && this.newDealSlider) {
      this.mainSlider.reInit();
      this.newDealSlider.reInit();
    }
  }


  ionViewDidLeave() {
    // console.log('leave');
    if (this.mainSlider && this.newDealSlider) {
      this.mainSlider.trigger('destroy.owl.carousel');
      this.newDealSlider.trigger('destroy.owl.carousel');
    }
  }


  ngOnInit() {
    this.getProducts();
    this.loadMoreProducts(null);
  }
}
