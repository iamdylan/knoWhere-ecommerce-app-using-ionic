import { Component, OnInit, ViewChild, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MbscFormOptions } from '@mobiscroll/angular-lite/src/js/forms.angular';
import * as WC from 'woocommerce-api';
import { AlertController, ToastController } from '@ionic/angular';
import { PasswordValidator } from '../validators/pass.validator';


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
billing_address: any;
shipping_address: any;
emailGood: boolean;
userGood: boolean;


constructor(public fb: FormBuilder, private ngZone: NgZone, public toastCtrl: ToastController, public alertCtrl: AlertController) {
 
    this.billing_shipping_same = false;
    this.billing_address = {};
    this.shipping_address = {};

}

reactSubmitted: boolean = false;

getErrorState(field: string) {
  let ctrl = this.reactForm.get(field);
  return ctrl.invalid && this.reactSubmitted;
}

registerReact() {
    this.reactSubmitted = true;
    if (this.reactForm.valid && this.thanksPopup) {
        this.thanksPopup.instance.show();
    }
};

getErrorMessage(field: string) {
    
    let formCtrl = this.reactForm,
        message = '';
    if (formCtrl) {
      let ctrl = formCtrl.get(field);
      if (ctrl && ctrl.errors) {
          for (let err in ctrl.errors) {
              if (!message && ctrl.errors[err]) {
                  return message = this.errorMessages[field][err];
              }
          }
      }
      else if(formCtrl.hasError('noMatch')){
        return message = this.errorMessages['conf_password']['noMatch'];
      }
    }


    return message;
}

errorMessages = {
    username: {
        required: 'Username required',
        minlength: 'Has to be at least 2 characters'
    },
    first_name: {
        required: 'First name required',
        minlength: 'Has to be at least 2 characters'
    },
    last_name: {
        required: 'Last name required',
        minlength: 'Has to be at least 1 characters'
    },
    email: {
        required: 'Email address required',
        email: 'Invalid email address',
        exists: 'Email already registered'
    },
    password: {
        required: 'Password required',
        minlength: 'At least 6 characters required',
    },
    conf_password: {
      required: 'Password required',
      minlength: 'At least 6 characters required',
      noMatch: 'Passwords do not match'
    },
    bill_first_name: {
        required: 'Full Name required',
        minlength: 'At least 3 characters required'
    },
    bill_last_name: {
        required: 'Full Name required',
        minlength: 'At least 3 characters required'
    },
    
    address_1: {
        required: 'Address Line 1 required',
        minlength: 'At least 5 characters required'
    },
    address_2: {
        required: 'Address Line 2 required',
        minlength: 'At least 2 characters required'
    },
    country: {
        required: 'Country required',
    },
    state: {
        required: 'State required',
        minlength: 'At least 2 characters required'
    },
    city: {
        required: 'City required',
        minlength: 'At least 3 characters required'
    },
    postcode: {
        required: 'Postal Code required',
        minlength: 'At least 4 characters required'
    },
    phone: {
        required: 'Phone No. required',
        minlength: 'At least 10 characters required'
    },
    fullname: {
      required: 'Full Name required',
      minlength: 'At least 3 characters required'
    }
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

emailValidation=()=>{
  console.log("running")
  let WooCommerce =  WC({
      url: "http://localhost/dashboard/wordpress",
      consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
      consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
      wpAPI: true,
      version: 'wc/v3'
    });

    WooCommerce.getAsync("customers/?email=" + this.reactForm.value.email).then((data) => {
      // console.log(ctrl.value)
      // console.log(JSON.parse(data.body));
      // console.log(JSON.parse(data.body).length);
       
      if(JSON.parse(data.body).length == undefined || JSON.parse(data.body).length == 0){
          // console.log('good to go');
          this.ngZone.run(() => {
             this.emailGood = false;
          });
          return true;
      }
      else{
          // console.log('exists');
          this.ngZone.run(() => {
             this.emailGood = true;
          });
          // console.log(this.emailGood);
          return false;
      }
    });
}

userValidation=()=>{
  console.log("user running")
  let WooCommerce =  WC({
      url: "http://localhost/dashboard/wordpress",
      consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
      consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
      wpAPI: true,
      version: 'wc/v3'
    });

    WooCommerce.getAsync("customers/?username=" + this.reactForm.value.username).then((data) => {
      console.log(JSON.parse(data.body));
      console.log(JSON.parse(data.body).length);

      this.ngZone.run(() => {
        this.userGood = false;
      });

      Array.prototype.some.call(JSON.parse(data.body), (item)=>{
        if (item.username == this.reactForm.value.username){
          this.ngZone.run(() => {
            this.userGood = true;
         });
         return (item.username == this.reactForm.value.username);
        }
      })
    });
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

    console.log(this.reactForm.value);
    customerData = this.reactForm.value;

    if(this.billing_shipping_same){
      this.shipping_address = this.shipping_address;
    }

    console.log(customerData);

    WooCommerce.postAsync('customers', customerData).then( (data) => {
      let response = (JSON.parse(data.body));
      console.log(response);
      if(response.id){
        console.log('Worked');
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
            console.log('Confirm Cancel: blah');
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
      username: ['', [Validators.required , Validators.minLength(2)]],
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      conf_password: ['', [Validators.required, Validators.minLength(6)]],
      billing: this.fb.group({
        first_name: ['', [Validators.required, Validators.minLength(3)]],
        last_name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
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
        postcode: ['', [Validators.required, Validators.minLength(4)]],
      })
    }, {validator: PasswordValidator.validPassword}
    );

    console.log(this.reactForm.controls);
  }

  get first_name() { return this.reactForm.get('first_name'); }
  get last_name() { return this.reactForm.get('last_name'); }
  get email() { return this.reactForm.get('email'); }
  get password() { return this.reactForm.get('password'); }
  get conf_password() { return this.reactForm.get('conf_password'); }
}
