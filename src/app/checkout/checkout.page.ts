import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MbscFormOptions } from '@mobiscroll/angular-lite';
import countries from '../countries.json';
import errorMessages from '../errorMessages.json';
import { WooCommerceService } from '../services/woo-commerce.service';
import { EmailValidator } from '../validators/email.validator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jQuery from 'jquery';
import { finalize } from 'rxjs/operators';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  formSettings: MbscFormOptions = {
    theme: 'material'
  };

  WooCommerce: any;
  custInfo: any;
  paymentMethods: any[];
  paymentMethod: any;
  billing_shipping_same: boolean;
  userInfo: any;
  label_style: string;
  countries: any[];

  checkOutForm: FormGroup;

  constructor(public fb: FormBuilder, public emailValidator: EmailValidator, public storage: Storage, private ngZone: NgZone,
    public alertCtrl: AlertController, private router: Router,
    public WooCom: WooCommerceService, public http: HttpClient, public loadingCtrl: LoadingController, public payPal: PayPal) {

    this.label_style = 'floating';
    this.billing_shipping_same = false;
    this.paymentMethods = [
      { method_id: 'bacs', method_title: 'Direct Bank Transfer' },
      { method_id: 'cheque', method_title: 'Cheque Payment' },
      { method_id: 'cod', method_title: 'Cash on Delivery' },
      { method_id: 'paypal', method_title: 'PayPal'
    }];
    this.countries = countries.countries;

  }

  getErrorMessage(field: any) {
    const formCtrl = this.checkOutForm;
    let message = '';

    if (formCtrl) {
      const ctrl = formCtrl.get(field);
      if (ctrl && ctrl.errors) {
          for (const err in ctrl.errors) {
              if (!message && ctrl.errors[err]) {
                const errField = field.replace('.', '_');
                  return message = errorMessages[errField][err];
              }
          }
      }
    }
    return message;
  }

  setBillingToShipping() {
    this.billing_shipping_same = !this.billing_shipping_same;
    if (this.billing_shipping_same === true) {
      this.ngZone.run(() => {this.label_style = 'stacked'; });
      this.checkOutForm.patchValue({
        shipping: {
          first_name: this.checkOutForm.value.billing.first_name,
          last_name: this.checkOutForm.value.billing.last_name,
          address_1: this.checkOutForm.value.billing.address_1,
          address_2: this.checkOutForm.value.billing.address_2,
          country: this.checkOutForm.value.billing.country,
          state: this.checkOutForm.value.billing.state,
          city: this.checkOutForm.value.billing.city,
          postcode: this.checkOutForm.value.billing.postcode
        }
      });

    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  async placeOrder() {
    const orderItems: any[] = [];
    let details: any = {};
    let paymentData: any = {};
    const emptyCart: any[] = [];
    const loading = await this.loadingCtrl.create();
    this.validateAllFormFields(this.checkOutForm);
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    if (this.checkOutForm.valid) {
      await loading.present();
      this.paymentMethods.forEach( (element) => {
        if (element.method_id === this.checkOutForm.value.payment.paymeth) {
          paymentData = element;
          console.log(paymentData);
        }
      });

      details = {
        payment_method: paymentData.method_id,
        payment_method_title: paymentData.method_title,
        billing: this.checkOutForm.value.billing,
        shipping: this.checkOutForm.value.shipping,
        customer_id: this.userInfo.id,
        line_items: orderItems
      };

      if (paymentData.method_id === 'paypal') {
        this.payPal.init({
          PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
          PayPalEnvironmentSandbox: 'AYkkS2ObeSpaObaCqA3bybQjRNRMKOw_2vNSha7gmxESpG4l4AhEyMfYwuzrUFKSbWGhCsN-Vhtl5FOG'
        }).then(() => {
          // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
          this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
            // Only needed if you get an "Internal Service Error" after PayPal login!
            // payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
          })).then(() => {

            this.storage.get('cart').then((cart) => {

              let total = 0.00;
              cart.forEach((element, index) => {
                orderItems.push({ product_id: element.product.id, quantity: element.qty });
                total = total + (element.product.price * element.qty);
              });

              const payment = new PayPalPayment(total.toString(), 'USD', 'Description', 'sale');
              this.payPal.renderSinglePaymentUI(payment).then((response) => {
                // Successfully paid

                alert(JSON.stringify(response));
                details.line_items = orderItems;
                // console.log(details);
                const orderData: any = {};

                orderData.order = details;

                // this.WooCommerce.postAsync('orders', orderData).then((data) => {
                //   alert('Order placed successfully!');
                //   const res = (JSON.parse(data.body).order);
                //   this.presentAlert(res);
                // });

                // tslint:disable-next-line: max-line-length
                this.http.post(`${this.WooCom.url}/wp-json/wc/v3/orders?consumer_key=${this.WooCom.consumerKey}&consumer_secret=${this.WooCom.consumerSecret}`, jQuery.param(orderData), { headers: header })
                .pipe(finalize(() => loading.dismiss()))
                .subscribe(res => {
                  console.log(res);
                  this.storage.set('cart', emptyCart);
                  this.presentAlert(res);
                });

              });

            }, () => {
              // Error or render dialog closed without being successful
            });
          }, () => {
            // Error in configuration
          });
        }, () => {
          // Error in initialization, maybe PayPal isn't supported or something else
        });
      } else {
        this.storage.get('cart').then( (cart) => {
          cart.forEach( (element) => {
            orderItems.push({
              product_id: element.product.id,
              quantity: element.qty
            });
          });

          console.log(orderItems);

          details.line_items = orderItems;
          let orderData: any = {};
          orderData = details;
          console.log(orderData);

          // tslint:disable-next-line: max-line-length
          this.http.post(`${this.WooCom.url}/wp-json/wc/v3/orders?consumer_key=${this.WooCom.consumerKey}&consumer_secret=${this.WooCom.consumerSecret}`, jQuery.param(orderData), { headers: header })
          .pipe(finalize(() => loading.dismiss()))
          .subscribe(res => {
            console.log(res);
            this.storage.set('cart', emptyCart);
            this.presentAlert(res);
          });

          // this.WC.WooCommerceV3.postAsync('orders', orderData).then( (data) => {
          //   console.log(data);
          //   console.log(JSON.parse(data.body));
          //   const response = (JSON.parse(data.body));
          //   this.presentAlert(response);

          // });
        });
      }
    }
  }

  async presentAlert(response) {
    const alert = await this.alertCtrl.create({
      header: 'Successful!',
      message: 'Your order has been placed and the Order Number is ' + response.number + '.',
      cssClass: 'checkout-alert',
      buttons: [
        {
          text: 'OK',

          handler: () => {
            console.log('routing');
              this.router.navigateByUrl('/home');
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }

  ngOnInit() {
    this.checkOutForm = this.fb.group({
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

    this.storage.get('userLoginInfo').then( (userLoginInfo) => {
      this.userInfo = userLoginInfo.user;
      console.log(this.userInfo);
      const id = this.userInfo.id;

      // tslint:disable-next-line: max-line-length
      this.http.get(`${this.WooCom.url}/wp-json/wc/v3/customers/${id}?consumer_key=${this.WooCom.consumerKey}&consumer_secret=${this.WooCom.consumerSecret}`)
      .subscribe(res => {
        console.log(res);
        this.custInfo = res;
        this.label_style = 'stacked';
        this.checkOutForm.patchValue({
          billing: this.custInfo.billing,
          shipping: this.custInfo.shipping
        });
      });

      // this.WC.WooCommerceV3.getAsync('customers/' + id).then( (data) => {
      //   this.custInfo = JSON.parse(data.body);
      //   console.log(this.custInfo);
      //   this.ngZone.run(() => {this.label_style = 'stacked'; });
      //   this.checkOutForm.patchValue({
      //     billing: this.custInfo.billing,
      //     shipping: this.custInfo.shipping
      //   });
      // });
    });
  }

}
