import { FormControl} from '@angular/forms';
import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';
import { WooCommerceService } from '../services/woo-commerce.service';

@Injectable()
export class EmailValidator {

    constructor(public WC: WooCommerceService){

    }

    debouncer: any;

    checkEmail(fc: FormControl){
        clearTimeout(this.debouncer);
      
        var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
        console.log('email validator')

        return new Promise(resolve => {
            if (pattern.test(fc.value) && fc.value !== ""){
                this.debouncer = setTimeout(() => {
        
                    // let WooCommerce =  WC({
                    //     url: "http://localhost/dashboard/wordpress",
                    //     consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
                    //     consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
                    //     wpAPI: true,
                    //     version: 'wc/v3'
                    // });
                                    
                    this.WC.WooCommerceV3.get("customers/?email=" + fc.value, function(err, data, res) {

                        if(JSON.parse(data.body).length){
                            resolve({'match': true});
                        }else{
                            resolve(null);
                        }
                    });
                }, 200);      
            }else{
                resolve(null);
            }
        });
    }
    
}

   

           

