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
    this.url = 'https://dylan-thompson.000webhostapp.com';
    this.consumerKey = 'ck_eadf44c4c6282f0422dce4fd603dc97b2e36bb46';
    this.consumerSecret = 'cs_9c4144c7668ba17ef986e838937e82b892a9f3b6';
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
