import { FormControl} from '@angular/forms';
import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';
import { WooCommerceService } from '../services/woo-commerce.service';

@Injectable()
export class UserValidator {

    constructor(public WC: WooCommerceService){

    }

    debouncer: any;

    checkUser(fc: FormControl){
        clearTimeout(this.debouncer);
      
        console.log('Username validator')

        return new Promise(resolve => {
            if (fc.value.length > 1){
                this.debouncer = setTimeout(() => {
        
                    // let WooCommerce =  WC({
                    //     url: "http://localhost/dashboard/wordpress",
                    //     consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
                    //     consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
                    //     wpAPI: true,
                    //     version: 'wc/v3'
                    // });
                                    
                    this.WC.WooCommerceV3.get("customers/?username=" + fc.value, function(err, data, res) {
                        Array.prototype.some.call(JSON.parse(data.body), (item)=>{
                            if (item.username == fc.value){
                                resolve({'match': true});
                             }else{
                                resolve(null);
                             }
                            return (item.username == fc.value);
                            });
                          });
                    }, 200);
            } 
            else{
                resolve(null);
            }
        });          
    }
    
}