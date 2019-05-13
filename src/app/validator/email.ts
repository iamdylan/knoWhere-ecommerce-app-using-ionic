import { FormControl } from '@angular/forms';
import * as WC from 'woocommerce-api';
import { OnInit, NgZone, Injectable  } from '@angular/core';

@Injectable()
export class emailValidator implements OnInit {
  goodToGo: any = '';

  constructor(private ngZone: NgZone){
  }
  validation=(ctrl: FormControl)=>{

    let WooCommerce =  WC({
        url: "http://localhost/dashboard/wordpress",
        consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
        consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
        wpAPI: true,
        version: 'wc/v3'
      });

      WooCommerce.getAsync("customers/?email=" + ctrl.value).then((data) => {
        // console.log(ctrl.value)
        // console.log(JSON.parse(data.body));
        // console.log(JSON.parse(data.body).length);
         
          if(JSON.parse(data.body).length == undefined || JSON.parse(data.body).length == 0){
            // console.log('good to go');
            this.ngZone.run(() => {this.goodToGo = false;});
        }
        else{
            // console.log('exists');
            this.ngZone.run(() => {this.goodToGo = true;});
            // console.log(this.goodToGo);
        }
      
      });
  }

  ngOnInit() {
  }
}