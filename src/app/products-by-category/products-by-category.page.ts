import { ChangeDetectionStrategy, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Services } from '../services/services.service';
// import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.page.html',
  styleUrls: ['./products-by-category.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class ProductsByCategoryPage implements OnInit {
  products: any;
  cat: number;
  page: number;
  catName: any;
  endMsg: boolean;
  showSkel: boolean;
  // outOfStock: boolean;

  constructor(private route: ActivatedRoute, private ngZone: NgZone,
  public services: Services, public http: HttpClient) {

    this.page = 1;
    this.products = null;
    this.catName = [{name: ''}];
    this.endMsg = false;
    this.showSkel = true;
    // this.outOfStock = false;

    this.route.params.subscribe((params: Params) => {
      this.ngZone.run(() => {this.cat = params['category']; });
    });
  }

  // getProdCats() {
       // tslint:disable-next-line: max-line-length
  //   this.http.get(`${this.WooCom.url}/wp-json/wc/v3/products/categories/?consumer_key=${this.WooCom.consumerKey}&consumer_secret=${this.WooCom.consumerSecret}`)
  //   .subscribe(res => {
  //     console.log(this.cat);
  //     const categs: any = res;
  //     console.log(categs);
  //     this.catName = categs.filter((categ) => {
  //       return categ.id == this.cat;
  //     });
  //     console.log(this.catName);
  //   });
  // }


  getProdByCat() {
    // tslint:disable-next-line: max-line-length
    this.http.get(`${this.services.api_url}/wp-json/wc/v3/products?category=${this.cat}&consumer_key=${this.services.wooConsKey}&consumer_secret=${this.services.wooConsSecret}`)
    .subscribe(res => {
      // console.log(res);
      this.showSkel = false;
      this.products = res;
      // this.products.length > 0 ? this.outOfStock = false : this.outOfStock = true;
      // console.log ('out of stock = ', this.outOfStock);
    });
  }


  loadMoreProducts(event) {
    this.page++;
    // console.log('Getting page ' + this.page);

       // tslint:disable-next-line: max-line-length
    this.http.get(`${this.services.api_url}/wp-json/wc/v3/products?category=${this.cat}&page=${this.page}&consumer_key=${this.services.wooConsKey}&consumer_secret=${this.services.wooConsSecret}`)
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


  ngOnInit() {
    // this.getProdCats();
    this.getProdByCat();
  }
}
