import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WooCommerceService } from '../services/woo-commerce.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmailValidator {

    constructor(public WooCom: WooCommerceService, public http: HttpClient) {
    }

    debouncer: any;

    checkEmail(fc: FormControl) {
        clearTimeout(this.debouncer);

        // tslint:disable-next-line: max-line-length
        const pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
        console.log('email validator');

        return new Promise(resolve => {
            if (pattern.test(fc.value) && fc.value !== '') {
                this.debouncer = setTimeout(() => {

                    // tslint:disable-next-line: max-line-length
                    this.http.get(`${this.WooCom.url}/wp-json/wc/v3/customers/?email=${fc.value}&consumer_key=${this.WooCom.consumerKey}&consumer_secret=${this.WooCom.consumerSecret}`)
                    .subscribe(res => {
                        console.log(res);
                        const response: any = res;
                        if (response.length) {
                            resolve({'match': true});
                        } else {
                            resolve(null);
                        }
                    });

                    // this.WC.WooCommerceV3.get('customers/?email=' + fc.value, function(err, data, res) {

                    //     if (JSON.parse(data.body).length) {
                    //         resolve({'match': true});
                    //     } else {
                    //         resolve(null);
                    //     }
                    // });
                }, 200);
            } else {
                resolve(null);
            }
        });
    }

}
