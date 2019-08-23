import { Component, OnInit, ViewChild, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MbscFormOptions } from '@mobiscroll/angular-lite/src/js/forms.angular';
import * as WC from 'woocommerce-api';
import { AlertController, ToastController } from '@ionic/angular';
import { PasswordValidator } from '../validators/pass.validator';
import 'rxjs/add/operator/map';
import { EmailValidator } from '../validators/email.validator';
import { UserValidator } from '../validators/username.validator';
import  errorMessages  from '../errorMessages.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class SignupPage implements OnInit {
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll'
  };

  reactForm: FormGroup;

  billing_shipping_same: boolean;
  userGood: boolean;
  label_style: string;
  countries: any[];

  constructor(public fb: FormBuilder, public router: Router, private ngZone: NgZone, public toastCtrl: ToastController, public alertCtrl: AlertController, public emailValidator: EmailValidator, public userValidator: UserValidator) {
      this.billing_shipping_same = false;
      this.label_style = "floating";
      this.countries = [
        {country_id: 'IND', country_title: 'India'},
        {country_id: 'USA', country_title: 'United States of America'},
        {country_id: 'UK', country_title: 'United Kingdom'},
        {country_id: 'AUS', country_title: 'Australia'},
        {country_id: 'CAN', country_title: 'Canada'},
        {country_id: 'JAP', country_title: 'Japan'},
        {country_id: 'NZ', country_title: 'New Zealand'}
      ];
      
  }

  // reactSubmitted: boolean = false;

  // registerReact() {
  //     this.reactSubmitted = true;
  //     if (this.reactForm.valid && this.thanksPopup) {
  //         this.thanksPopup.instance.show();
  //     }
  // };

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
        else if(formCtrl.hasError('noMatch')){
          return message = errorMessages['conf_password']['noMatch'];
        }
      }
      return message;
  }

  

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
    
  signup(){
    let WooCommerce =  WC({
        url: "http://localhost/dashboard/wordpress",
        consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
        consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
        wpAPI: true,
        version: 'wc/v3'
    });

    let customerData: any = {
    }

    customerData = this.reactForm.value;

    WooCommerce.postAsync('customers', customerData).then( (data) => {
      let response = (JSON.parse(data.body));
      console.log(response);
      if(response.id){
        this.presentAlert();

      } else if(response.data.status == 400){

        this.toast(response);
      }
    })
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Account Created',
      message: 'Your account has been created successfully! Please login to proceed.',
      buttons: [
        {
          text: 'Login',
          role: 'Login',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('routing')
              this.router.navigateByUrl(
                '/login'
              );
          }
        }
      ]
    });

    await alert.present();
  }

  async toast(response){
    let tc= await this.toastCtrl.create({
          message: response.message,
          showCloseButton: true,
          color: "dark"
        });

    tc.present();
  }

  ngOnInit() {
    this.reactForm = this.fb.group({
      username: ['', [Validators.required , Validators.minLength(2)], this.userValidator.checkUser.bind(this.userValidator)],
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
  }

}
