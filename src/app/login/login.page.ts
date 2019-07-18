import { Component, OnInit } from '@angular/core';
import { MbscFormOptions } from '@mobiscroll/angular-lite/src/js/forms.angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { mobiscroll } from '@mobiscroll/angular-lite';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private fb: FormBuilder) { 
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  loginForm: FormGroup;


  attemptedSubmit = false;

  formSettings: MbscFormOptions = {
    theme: 'ios',
  };

  errorMessages = {
    required: '{$1} required',
    minlength: 'At least 6 characters required',
    email: 'Invalid email address'
  };

  markFieldsDirty() {
    const controls = this.loginForm.controls;
    for (const field in controls) {
      if (controls[field]) {
        controls[field].markAsDirty();
      }
    }
  }

  logIn() {
    this.attemptedSubmit = true;
    if (this.loginForm.valid) {
      mobiscroll.toast({
        message: 'Logged In!',
        callback: () => {
          this.loginForm.reset();
          this.attemptedSubmit = false;
        }
      });
    } else {
      this.markFieldsDirty();
    }
  }

  errorFor(fieldName: string) {
    const field = this.loginForm.controls[fieldName];
    for (const validator in field.errors) {
      if (field.errors[validator]) {
        const friendlyName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
        return this.errorMessages[validator].replace('{$1}', friendlyName);
      }
    }
    return null;
  }

  ngOnInit() {
  }

}
