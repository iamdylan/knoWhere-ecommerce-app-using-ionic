import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';

@Injectable({
  providedIn: 'root'
})
export class WooCommerceService {
  WooCommerceV2: any;
  WooCommerceV3: any;
  url: string;
  consumerKey: string;
  consumerSecret: string;
  wpAPI: boolean;

  constructor() {
    this.url = "http://localhost/dashboard/wordpress";
    this.consumerKey = "ck_b137f07c8316ede0376d58741bf799dada631743";
    this.consumerSecret = "cs_300fb32ce0875c45a2520ff860d1282a8891f113";
    this.wpAPI = true;

    this.WooCommerceV2 =  WC({
      url: this.url,
      consumerKey: this.consumerKey,
      consumerSecret: this.consumerSecret,
      wpAPI: this.wpAPI,
      version: 'wc/v2'
    });
    
    this.WooCommerceV3 =  WC({
      url: this.url,
      consumerKey: this.consumerKey,
      consumerSecret: this.consumerSecret,
      wpAPI: this.wpAPI,
      version: 'wc/v3'
    });
  }
}
