import { Component, OnInit, ViewChild } from '@angular/core';
import { MbscFormOptions } from '@mobiscroll/angular-lite/src/js/forms.angular';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  formSettings: MbscFormOptions = {
    theme: 'ios'
};
  constructor(public fb: FormBuilder) { 
    this.reactForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', Validators.required],
      bio: ['', [Validators.required, Validators.minLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
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



    // Template Driven Form

    @ViewChild('templForm')
    templForm: any;
    templSubmitted: boolean = false;
    gender: string = '';

    registerTempl() {
        this.templSubmitted = true;
        if (this.templForm && this.templForm.valid && this.thanksPopup) {
            this.thanksPopup.instance.show();
        }
    };

    getErrorMessage(field: string, form: string) {
        var formCtrl = form === 'react' ? this.reactForm : this.templForm.control,
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
        gender: {
            required: 'Gender required'
        },
        bio: {
            required: 'Bio required',
            minlength: "Don't be shy, surely you can tell more"
        },
        email: {
            required: 'Email address required',
            email: 'Invalid email address'
        },
        password: {
            required: 'Password required',
            minlength: 'At least 6 characters required'
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

  ngOnInit() {
  }

}
