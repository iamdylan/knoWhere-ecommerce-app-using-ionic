import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import countries from '../../../assets/data/countries.json';
import { EmailValidator } from '../../validators/email.validator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jQuery from 'jquery/dist/jquery.slim.min';
import { finalize } from 'rxjs/operators';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Services } from '../../services/api-userState.service';
import { AlertsToastsService } from '../../services/alerts-toasts.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})

export class CheckoutPage implements OnInit {
  @ViewChild('checkOutSlider', {read: IonSlides, static: false}) slides: IonSlides;

  sliderConfig = {
    autoHeight: true
  };

  WooCommerce: any;
  custInfo: any;
  paymentMethods: any[];
  billing_shipping_same: boolean;
  userInfo: any;
  countries: any[];
  selectedPayMeth: any;

  constructor(
    public fb: FormBuilder,
    public emailValidator: EmailValidator,
    public storage: Storage,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public payPal: PayPal,
    public services: Services,
    public alertsToasts: AlertsToastsService
  ) {

    this.billing_shipping_same = false;
    this.paymentMethods = [
      { method_id: 'bacs', method_title: 'Direct Bank Transfer' },
      { method_id: 'cheque', method_title: 'Cheque Payment' },
      { method_id: 'cod', method_title: 'Cash on Delivery' },
      { method_id: 'paypal', method_title: 'PayPal'
    }];
    this.countries = countries.countries;

  }

  billingForm: FormGroup;
  shippingForm: FormGroup;
  billFormNotValid: boolean;
  shipFormNotValid: boolean;


  setShippingToBilling() {
    this.billing_shipping_same = !this.billing_shipping_same;
    if (this.billing_shipping_same === true) {
      this.billingForm.patchValue({
          first_name: this.shippingForm.value.first_name,
          last_name: this.shippingForm.value.last_name,
          address_1: this.shippingForm.value.address_1,
          address_2: this.shippingForm.value.address_2,
          country: this.shippingForm.value.country,
          state: this.shippingForm.value.state,
          city: this.shippingForm.value.city,
          postcode: this.shippingForm.value.postcode
      });
    } else {
      this.billingForm.reset();
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


  nextSlide(form: FormGroup) {
    this.validateAllFormFields(form);

    if (form.valid) {
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.slides.lockSwipes(true);
    } else if (form === this.shippingForm) {
      this.shipFormNotValid = true;
    } else {
      this.billFormNotValid = true;
    }
  }


  prevSlide() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }


  radioGroupChange(event) {
    // console.log('radioGroupChange', event.detail.value);
    this.selectedPayMeth = event.detail.value;
  }


  async placeOrder() {
    const orderItems: any[] = [];
    let details: any = {};
    let paymentData: any = {};
    const emptyCart: any[] = [];

    const loading = await this.loadingCtrl.create();

    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const postData = (data: any, headers: HttpHeaders) => {
      this.http.post(`${this.services.api_url}/wp-json/wc/v3/orders?consumer_key=${this.services.wooConsKey}&consumer_secret=${this.services.wooConsSecret}`, jQuery.param(data), { headers: headers })
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(res => {
        // console.log(res);
        this.storage.set('cart', emptyCart);
        this.alertsToasts.orderSuccessAlert(res);
      });
    };

    if (this.selectedPayMeth) {
      await loading.present();

      this.paymentMethods.forEach( (element) => {
        if (element.method_id === this.selectedPayMeth) {
          paymentData = element;
          // console.log(paymentData);
        }
      });

      details = {
        payment_method: paymentData.method_id,
        payment_method_title: paymentData.method_title,
        shipping: this.shippingForm.value,
        billing: this.billingForm.value,
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

                postData(orderData, header);

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
          // console.log(orderItems);

          details.line_items = orderItems;
          let orderData: any = {};
          orderData = details;
          // console.log(orderData);

          postData(orderData, header);
        });
      }
    }
  }


  ngOnInit() {
    this.shippingForm = this.fb.group({
        first_name: ['', [Validators.required, Validators.minLength(3)]],
        last_name: ['', [Validators.required, Validators.minLength(1)]],
        address_1: ['', [Validators.required, Validators.minLength(5)]],
        address_2: ['', [Validators.required, Validators.minLength(2)]],
        country: ['', Validators.required],
        state: ['', [Validators.required, Validators.minLength(2)]],
        city: ['', [Validators.required, Validators.minLength(3)]],
        postcode: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.billingForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(1)]],
      address_1: ['', [Validators.required, Validators.minLength(5)]],
      address_2: ['', [Validators.required, Validators.minLength(2)]],
      country: ['', Validators.required],
      state: ['', [Validators.required, Validators.minLength(2)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      postcode: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.storage.get('userInfo').then( (userInfo) => {
      this.userInfo = userInfo;
      // console.log(this.userInfo);
      const id = this.userInfo.id;

      // tslint:disable-next-line: max-line-length
      this.http.get(`${this.services.api_url}/wp-json/wc/v3/customers/${id}?consumer_key=${this.services.wooConsKey}&consumer_secret=${this.services.wooConsSecret}`)
      .subscribe(res => {
        // console.log(res);
        this.custInfo = res;
        this.shippingForm.patchValue(this.custInfo.shipping);
        this.billingForm.patchValue(this.custInfo.billing);
      });
    });
  }

  ngAfterViewInit() {
    this.slides.lockSwipes(true);
  }

}
