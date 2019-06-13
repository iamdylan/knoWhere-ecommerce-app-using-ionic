import { Component, OnInit } from '@angular/core';
import * as WC from 'woocommerce-api';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.page.html',
  styleUrls: ['./products-by-category.page.scss'],
})
export class ProductsByCategoryPage implements OnInit {
  WooCommerce: any;
  products: any[];
  page: number;
  cat: number;

  constructor(private route: ActivatedRoute) {
    this.page = 1;
    
    
      

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
        console.log(data);
      this.products = JSON.parse(data.body);
      console.log(this.products);
    }, (err) => {
      console.log(err);
    })
    

   }
    
  ngOnInit() {


  }

}
