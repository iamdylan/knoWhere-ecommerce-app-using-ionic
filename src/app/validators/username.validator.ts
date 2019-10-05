import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WooCommerceService } from '../services/woo-commerce.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserValidator {

    constructor(public WooCom: WooCommerceService, public http: HttpClient) {
    }

    debouncer: any;

    checkUser(fc: FormControl) {
        clearTimeout(this.debouncer);

        console.log('Username validator');

        return new Promise(resolve => {
            if (fc.value.length > 1) {
                this.debouncer = setTimeout(() => {

                    // tslint:disable-next-line: max-line-length
                    this.http.get(`${this.WooCom.url}/wp-json/wc/v3/customers/?username=${fc.value}&consumer_key=${this.WooCom.consumerKey}&consumer_secret=${this.WooCom.consumerSecret}`)
                    .subscribe(res => {
                        const response: any = res;
                        Array.prototype.some.call(response, (item) => {
                            if (item.username === fc.value) {
                                resolve({'match': true});
                            } else {
                                resolve(null);
                            }
                            return (item.username === fc.value);
                        });
                    });

                    // this.WC.WooCommerceV3.get('customers/?username=' + fc.value, function(err, data, res) {
                    //     Array.prototype.some.call(JSON.parse(data.body), (item) => {
                    //         if (item.username === fc.value) {
                    //             resolve({'match': true});
                    //          } else {
                    //             resolve(null);
                    //          }
                    //         return (item.username === fc.value);
                    //     });
                    // });
                    }, 200);
            } else {
                resolve(null);
            }
        });
    }

}
