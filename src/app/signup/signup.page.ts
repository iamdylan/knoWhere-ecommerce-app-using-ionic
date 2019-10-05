import { ChangeDetectionStrategy, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { MbscFormOptions } from '@mobiscroll/angular-lite/src/js/forms.angular';
import 'rxjs/add/operator/map';
import countries from '../countries.json';
import errorMessages from '../errorMessages.json';
import { WooCommerceService } from '../services/woo-commerce.service';
import { EmailValidator } from '../validators/email.validator';
import { PasswordValidator } from '../validators/pass.validator';
import { UserValidator } from '../validators/username.validator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jQuery from 'jquery';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class SignupPage implements OnInit {

  constructor(public fb: FormBuilder, public router: Router, private ngZone: NgZone, public toastCtrl: ToastController,
    public alertCtrl: AlertController, public emailValidator: EmailValidator, public userValidator: UserValidator,
    public WooCom: WooCommerceService, public http: HttpClient, public loadingCtrl: LoadingController) {

    this.billing_shipping_same = false;
    this.label_style = 'floating';
    this.countries = countries.countries;

  }

  formSettings: MbscFormOptions = {
    theme: 'material'
  };

  signUpForm: FormGroup;

  billing_shipping_same: boolean;
  userGood: boolean;
  label_style: string;
  countries: any[];
  formNotValid: boolean;

  @ViewChild('thanks')
  thanksPopup: any;

  popupSettings: any = {
    theme: 'ios',
    display: 'center',
    focusOnClose: false,
    buttons: [{
        text: 'Log in',
        handler: 'set'
    }]
  };

  getErrorMessage(field: any) {
    const formCtrl = this.signUpForm;
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
      } else if (formCtrl.hasError('noMatch')) {
        return message = errorMessages['conf_password']['noMatch'];
      }
    }
    return message;
  }

  setBillingToShipping() {
    this.billing_shipping_same = !this.billing_shipping_same;
    if (this.billing_shipping_same === true) {
      this.ngZone.run(() => {this.label_style = 'stacked'; });
      this.signUpForm.patchValue({
        shipping: {
          first_name: this.signUpForm.value.billing.first_name,
          last_name: this.signUpForm.value.billing.last_name,
          address_1: this.signUpForm.value.billing.address_1,
          address_2: this.signUpForm.value.billing.address_2,
          country: this.signUpForm.value.billing.country,
          state: this.signUpForm.value.billing.state,
          city: this.signUpForm.value.billing.city,
          postcode: this.signUpForm.value.billing.postcode
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

  async signup() {
    const loading = await this.loadingCtrl.create();

    let customerData: any = {};

    this.validateAllFormFields(this.signUpForm);
    if (this.signUpForm.valid) {
      await loading.present();
      customerData = this.signUpForm.value;
      console.log(customerData);
      const header = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });

      // tslint:disable-next-line: max-line-length
      this.http.post(`${this.WooCom.url}/wp-json/wc/v3/customers?consumer_key=${this.WooCom.consumerKey}&consumer_secret=${this.WooCom.consumerSecret}`, jQuery.param(customerData), { headers: header })
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(res => {
        const response: any = res;
        console.log(response);
        if (response.id) {
              this.presentAlert();
            } else if (response.data.status === 400) {
              this.toast(response);
            }
      });

      // this.WC.WooCommerceV3.postAsync('customers', customerData).then( (data) => {
      //   const response = (JSON.parse(data.body));
      //   console.log(response);
      //   if (response.id) {
      //     this.presentAlert();
      //   } else if (response.data.status === 400) {
      //     this.toast(response);
      //   }
      // });
    } else {
      this.formNotValid = true;
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
            console.log('routing');
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
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required , Validators.minLength(6)], this.userValidator.checkUser.bind(this.userValidator)],
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email], this.emailValidator.checkEmail.bind(this.emailValidator)],
      password: ['', [Validators.required, Validators.minLength(6)]],
      conf_password: ['', [Validators.required]],
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
      billing: this.fb.group({
        first_name: ['', [Validators.required, Validators.minLength(3)]],
        last_name: ['', [Validators.required, Validators.minLength(3)]],
        address_1: ['', [Validators.required, Validators.minLength(5)]],
        address_2: ['', [Validators.required, Validators.minLength(2)]],
        country: ['', Validators.required],
        state: ['', [Validators.required, Validators.minLength(2)]],
        city: ['', [Validators.required, Validators.minLength(3)]],
        postcode: ['', [Validators.required, Validators.minLength(4)]],
        phone: ['', [Validators.required, Validators.minLength(10)]]
      })
    }, {validator: PasswordValidator.validPassword}
    );

    console.log(this.signUpForm);
  }

}
