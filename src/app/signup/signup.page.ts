import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import countries from '../countries.json';
import { EmailValidator } from '../validators/email.validator';
import { PasswordValidator } from '../validators/pass.validator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jQuery from 'jquery/dist/jquery.slim.min';
import { finalize } from 'rxjs/operators';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Services } from '../services/services.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('signupSlider', {read: IonSlides, static: false}) slides: IonSlides;

  sliderConfig = {
    autoHeight: true
  };
  count = 0;

  constructor(public fb: FormBuilder, public router: Router, public toastCtrl: ToastController,
  public alertCtrl: AlertController, public http: HttpClient, public services: Services,
  public loadingCtrl: LoadingController, public emailValidator: EmailValidator) {

    this.billing_shipping_same = false;
    this.label_style = 'floating';
    this.countries = countries.countries;

    this.debouncer = 2;
  }

  debouncer: any;
  personalForm: FormGroup;
  billingForm: FormGroup;
  shippingForm: FormGroup;

  billing_shipping_same: boolean;
  userGood: boolean;
  label_style: string;
  countries: any[];
  persFormNotValid: boolean;
  billFormNotValid: boolean;
  shipFormNotValid: boolean;

  popupSettings: any = {
    theme: 'ios',
    display: 'center',
    focusOnClose: false,
    buttons: [{
        text: 'Log in',
        handler: 'set'
    }]
  };


  nextSlide() {
    this.slides.slideNext();
  }


  nextSlideAfterValid(form: FormGroup) {
    this.validateAllFormFields(form);

    if (form.valid) {
      this.nextSlide();
    } else if (form === this.personalForm) {
      this.persFormNotValid = true;
    } else {
      this.shipFormNotValid = true;
    }
  }


  prevSlide() {
    this.slides.slidePrev();
  }


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


  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.personalForm.valid) {
      let customerData: any = {};
      customerData = {...this.personalForm.value, 'shipping': {...this.shippingForm.value}, 'billing': {...this.billingForm.value}};
      customerData.email = (customerData.email).toLowerCase();
      // console.log(customerData);

      const header = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });

      // tslint:disable-next-line: max-line-length
      this.http.post(`${this.services.api_url}/wp-json/wc/v3/customers?consumer_key=${this.services.wooConsKey}&consumer_secret=${this.services.wooConsSecret}`, jQuery.param(customerData), { headers: header })
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(res => {
        const response: any = res;
        // console.log(response);
        if (response.id) {
              this.presentAlert();
            } else if (response.data.status === 400) {
              this.toast(response);
            }
      });
    } else {
      this.slides.slideTo(0);
      loading.dismiss();
    }
  }


  signUpAfterValid() {
    this.validateAllFormFields(this.billingForm);

    if (this.billingForm.valid) {
      this.signUp();
    } else {
      this.billFormNotValid = true;
    }
  }


  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Account Created',
      message: 'Your account has been created successfully! Please login to proceed.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Login',
          role: 'Login',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('routing');
              this.router.navigateByUrl(
                '/login'
              );
          }
        }
      ]
    });
    await alert.present();
  }


  async toast(response) {
    const tc = await this.toastCtrl.create({
          message: response.message,
          showCloseButton: true,
          color: 'dark'
        });

    tc.present();
  }


  ngOnInit() {
    this.personalForm = this.fb.group({
        first_name: ['', [Validators.required, Validators.minLength(2)]],
        last_name: ['', [Validators.required, Validators.minLength(1)]],
        // tslint:disable-next-line: max-line-length
        email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')], [this.emailValidator.checkEmail()]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        conf_password: ['', [Validators.required]],
    }, {validator: PasswordValidator.validPassword});

    this.shippingForm = this.fb.group({
        first_name: ['', [Validators.required, Validators.minLength(2)]],
        last_name: ['', [Validators.required, Validators.minLength(1)]],
        address_1: ['', [Validators.required, Validators.minLength(5)]],
        address_2: ['', [Validators.required, Validators.minLength(2)]],
        country: ['', Validators.required],
        state: ['', [Validators.required, Validators.minLength(2)]],
        city: ['', [Validators.required, Validators.minLength(3)]],
        postcode: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.billingForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(1)]],
      address_1: ['', [Validators.required, Validators.minLength(5)]],
      address_2: ['', [Validators.required, Validators.minLength(2)]],
      country: ['', Validators.required],
      state: ['', [Validators.required, Validators.minLength(2)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      postcode: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

}
