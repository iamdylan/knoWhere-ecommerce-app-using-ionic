import { Component, OnInit, ViewChild, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MbscFormOptions } from '@mobiscroll/angular-lite/src/js/forms.angular';
import { emailValidator } from '../validator/email';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SignupPage implements OnInit {
  formSettings: MbscFormOptions = {
    theme: 'ios'
};
billing_shipping_same: boolean;
newUser: any = {};

constructor(public fb: FormBuilder, private emailValidator: emailValidator) {
    this.billing_shipping_same = false;
    this.newUser.billing_address = {};
    this.newUser.shipping_address = {};

    this.reactForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email, emailValidator.validation]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      addressl1: ['', [Validators.required, Validators.minLength(5)]],
      addressl2: ['', [Validators.required, Validators.minLength(2)]],
      country: ['', Validators.required],
      state: ['', [Validators.required, Validators.minLength(2)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      postalcode: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
    });

}

reactForm: FormGroup;
reactSubmitted: boolean = false;

getErrorState(field: string) {
    var ctrl = this.reactForm.get(field);
    return ctrl.invalid && this.reactSubmitted;
}

registerReact() {
    this.reactSubmitted = true;
    if (this.reactForm.valid && this.thanksPopup) {
        this.thanksPopup.instance.show();
    }
};

getErrorMessage(field: string) {
    var formCtrl = this.reactForm,
        message = '';
    if (formCtrl) {
        var ctrl = formCtrl.get(field);
        if (ctrl && ctrl.errors) {
            for (var err in ctrl.errors) {
                if (!message && ctrl.errors[err]) {
                    message = this.errorMessages[field][err];
                }
            }
        }
    }
    return message;
}

errorMessages = {
    username: {
        required: 'Username required',
        minlength: 'Has to be at least 2 characters'
    },
    firstname: {
        required: 'First name required',
        minlength: 'Has to be at least 2 characters'
    },
    lastname: {
        required: 'Last name required',
        minlength: 'Has to be at least 1 characters'
    },
    email: {
        required: 'Email address required',
        email: 'Invalid email address',
        emailValidator: 'Email already exists'
    },
    password: {
        required: 'Password required',
        minlength: 'At least 6 characters required'
    },
    fullname: {
        required: 'Full Name required',
        minlength: 'At least 3 characters required'
    },
    addressl1: {
        required: 'Address Line 1 required',
        minlength: 'At least 5 characters required'
    },
    addressl2: {
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
    postalcode: {
        required: 'Postal Code required',
        minlength: 'At least 4 characters required'
    },
    phone: {
        required: 'Phone No. required',
        minlength: 'At least 10 characters required'
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
}
    

ngOnInit() {
}

}
