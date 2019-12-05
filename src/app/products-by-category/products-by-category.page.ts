import { ChangeDetectionStrategy, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WooCommerceService } from '../services/woo-commerce.service';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.page.html',
  styleUrls: ['./products-by-category.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class ProductsByCategoryPage implements OnInit {
  WooCommerce: any;
  products: any;
  cat: number;
  page: number;
  catName: any;
  endMsg: boolean;
  showSkel: boolean;
  outOfStock: boolean;

  constructor(public toastCtrl: ToastController, private route: ActivatedRoute,
  private ngZone: NgZone, public WooCom: WooCommerceService, public http: HttpClient) {
    this.page = 1;
    this.products = [];
    this.catName = [{name: ''}];
    this.endMsg = false;
    this.showSkel = true;
    this.outOfStock = false;

    this.route.params.subscribe((params: Params) => {
      this.ngZone.run(() => {this.cat = params['category']; });
    });
  }

  getProdCats() {
    // tslint:disable-next-line: max-line-length
    this.http.get(`${this.WooCom.url}/wp-json/wc/v3/products/categories/?consumer_key=${this.WooCom.consumerKey}&consumer_secret=${this.WooCom.consumerSecret}`)
    .subscribe(res => {
      console.log(this.cat);
      const categs: any = res;
      console.log(categs);
      this.catName = categs.filter((categ) => {
        return categ.id == this.cat;
      });
      console.log(this.catName);
    });
  }

  getProdbyCat() {
    // tslint:disable-next-line: max-line-length
    this.http.get(`${this.WooCom.url}/wp-json/wc/v3/products?category=${this.cat}&consumer_key=${this.WooCom.consumerKey}&consumer_secret=${this.WooCom.consumerSecret}`)
    .subscribe(res => {
      console.log(res);
      this.showSkel = false;
      this.products = res;
      this.products.length > 0 ? this.outOfStock = false : this.outOfStock = true;
      console.log ('out of stock = ', this.outOfStock);
    });
  }

  loadMoreProducts(event) {
    this.page++;
    console.log('Getting page ' + this.page);

    // tslint:disable-next-line: max-line-length
    this.http.get(`${this.WooCom.url}/wp-json/wc/v3/products?category=${this.cat}&page=${this.page}&consumer_key=${this.WooCom.consumerKey}&consumer_secret=${this.WooCom.consumerSecret}`)
    .subscribe(res => {
      const temp: any = res;
      this.products = this.products.concat(temp);
      event.target.complete();

      if (temp.length === 0 ) {
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

  ngOnInit() {
    this.getProdCats();
    this.getProdbyCat();
  }
}
