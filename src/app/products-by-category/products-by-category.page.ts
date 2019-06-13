import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as WC from 'woocommerce-api';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from '../category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.page.html',
  styleUrls: ['./products-by-category.page.scss'],
})
export class ProductsByCategoryPage implements OnInit {
  WooCommerce: any;
  products: Observable<Array<any>>;
  cat: number;

  constructor( public categoryService: CategoryService, private cdr: ChangeDetectorRef) {
    this.cat = this.categoryService.getDestn();    

    this.WooCommerce =  WC({
      url: "http://localhost/dashboard/wordpress",
      consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
      consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
      wpAPI: true,
      version: 'wc/v3'
    });
      
    this.products =  this.WooCommerce.getAsync("products?category=" + this.cat).then((data) => {
      console.log(data);
      return JSON.parse(data.body);
      console.log(this.products);
      }, (err) => {
        console.log(err);
    });

    
  }
    
    setChanged() {
      this.cdr.markForCheck();
      
    }

    ngOnInit() {
      this.products =  this.WooCommerce.getAsync("products?category=" + this.cat).then((data) => {
        console.log(data);
        return JSON.parse(data.body);
        console.log(this.products);
        }, (err) => {
          console.log(err);
      });
      
      setTimeout(() => this.setChanged(), 0);
    }
}
