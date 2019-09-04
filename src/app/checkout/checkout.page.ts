import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MbscFormOptions } from '@mobiscroll/angular-lite';
import  errorMessages  from '../errorMessages.json';
import  countries  from '../countries.json';
import { EmailValidator } from '../validators/email.validator';
import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';
import { WooCommerceService } from '../services/woo-commerce.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll'
  };

  WooCommerce: any;
  custInfo: any;
  paymentMethods: any[];
  paymentMethod: any;
  billing_shipping_same: boolean;
  userInfo: any;
  label_style: string;
  countries: any[];

  reactForm: FormGroup;
  
  constructor(public fb: FormBuilder, public emailValidator: EmailValidator, public storage: Storage, private ngZone: NgZone, public WC: WooCommerceService) {
    
    this.label_style = "floating";
    this.billing_shipping_same = false;
    this.paymentMethods = [
      { method_id: "bacs", method_title: "Direct Bank Transfer" },
      { method_id: "cheque", method_title: "Cheque Payment" },
      { method_id: "cod", method_title: "Cash on Delivery" },
      { method_id: "paypal", method_title: "PayPal" 
    }];
    this.countries = countries.countries;

  }

  getErrorMessage(field: any) {
    let formCtrl = this.reactForm,
    message = '';

    if (formCtrl) {
      let ctrl = formCtrl.get(field);
      if (ctrl && ctrl.errors) {
          for (let err in ctrl.errors) {
              if (!message && ctrl.errors[err]) {
                let errField = field.replace(".","_")
                  return message = errorMessages[errField][err];
              }
          }
      }
    }
    return message;
  }

  setBillingToShipping(){
    this.billing_shipping_same = !this.billing_shipping_same;
    if(this.billing_shipping_same == true){
      this.ngZone.run(() => {this.label_style = "stacked";});
      this.reactForm.patchValue({
        shipping: {
          first_name: this.reactForm.value.billing.first_name,
          last_name: this.reactForm.value.billing.last_name,
          address_1: this.reactForm.value.billing.address_1,
          address_2: this.reactForm.value.billing.address_2,
          country: this.reactForm.value.billing.country,
          state: this.reactForm.value.billing.state,
          city: this.reactForm.value.billing.city,
          postcode: this.reactForm.value.billing.postcode
        }
      });
      
    }
  }

  ngOnInit() {
    this.reactForm = this.fb.group({
      billing: this.fb.group({
        first_name: ['', [Validators.required, Validators.minLength(3)]],
        last_name: ['', [Validators.required, Validators.minLength(3)]],
        address_1: ['', [Validators.required, Validators.minLength(5)]],
        address_2: ['', [Validators.required, Validators.minLength(2)]],
        country: ['', Validators.required],
        state: ['', [Validators.required, Validators.minLength(2)]],
        city: ['', [Validators.required, Validators.minLength(3)]],
        postcode: ['', [Validators.required, Validators.minLength(4)]],
        phone: ['', [Validators.required, Validators.minLength(10)]],
      }),
      shipping: this.fb.group({
        first_name: ['', [Validators.required, Validators.minLength(3)]],
        last_name: ['', [Validators.required, Validators.minLength(3)]],
        address_1: ['', [Validators.required, Validators.minLength(5)]],
        address_2: ['', [Validators.required, Validators.minLength(2)]],
        country: ['', Validators.required],
        state: ['', [Validators.required, Validators.minLength(2)]],
        city: ['', [Validators.required, Validators.minLength(3)]],
        postcode: ['', [Validators.required, Validators.minLength(4)]]
      }),
      payment: this.fb.group({
        paymeth: ['', Validators.required],
      })
    }
    );

    // this.WooCommerce = WC({
    //   url: "http://localhost/dashboard/wordpress",
    //   consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
    //   consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
    //   wpAPI: true,
    //   version: 'wc/v3'
    // });

    this.storage.get("userLoginInfo").then( (userLoginInfo) => {
      this.userInfo = userLoginInfo.user;
      console.log(this.userInfo);
      let id = userLoginInfo.user.id;
      this.WC.WooCommerceV3.getAsync("customers/"+id).then( (data) => {
        this.custInfo = JSON.parse(data.body);
        console.log(this.custInfo);
        this.ngZone.run(() => {this.label_style = "stacked";});
        this.reactForm.patchValue({
          billing: this.custInfo.billing,
          shipping: this.custInfo.shipping
        })
      })
    });
  }

}
