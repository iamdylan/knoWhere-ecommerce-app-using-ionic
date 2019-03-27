import { Component, OnInit, NgZone, Input } from '@angular/core';
import * as WC from 'woocommerce-api';
import { ActivatedRoute, Params } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.page.html',
  styleUrls: ['./products-by-category.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProductsByCategoryPage implements OnInit {
  WooCommerce: any;
  products: Array<any>;
  cat: number;
  page: number;
  
  constructor( private route: ActivatedRoute, private ngZone: NgZone) {
    this.page = 1;
    this.products = [];

    this.WooCommerce =  WC({
      url: "http://localhost/dashboard/wordpress",
      consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
      consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
      wpAPI: true,
      version: 'wc/v3'
    });
      
    this.route.params.subscribe((params: Params)=>{
      this.cat = params['category'];
      console.log(this.cat);
    });

    this.WooCommerce.getAsync("products?category=" + this.cat).then((data) => {
          this.ngZone.run(() => { this.products =  JSON.parse(data.body);});
          }, (err) => {
            console.log(err);
        });
  }

  loadMoreProducts(event) {
    this.page++;
    console.log("Getting page " + this.page);
    this.WooCommerce.getAsync("products?category=" + this.cat + "&page=" + this.page).then((data) => {
      let temp = (JSON.parse(data.body));
      this.products = this.products.concat(JSON.parse(data.body));
      console.log(this.products);
      event.target.complete();

      if (temp.length < 10)
        event.target.enable=false;

    })
  }

  ngOnInit() {}

}
