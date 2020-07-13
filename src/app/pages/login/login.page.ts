import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RoutingStateService } from '../../services/routing-state.service';
import { finalize } from 'rxjs/operators';
import { EmailValidator } from '../../validators/email.validator';
import { Services } from '../../services/api-userState.service';
import { AlertsToastsService } from '../../services/alerts-toasts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  previousRoute: string;
  validAfterSubmit: boolean;

  constructor(
    private fb: FormBuilder,
    public services: Services,
    public http: HttpClient,
    public storage: Storage,
    private routingState: RoutingStateService,
    public loadingCtrl: LoadingController,
    public emailValidator: EmailValidator,
    public alertsToasts: AlertsToastsService,
    public router: Router
  ) {

    this.validAfterSubmit = true;

  }

  loginForm: FormGroup;

  errorMessages = {
    required: '{$1} required',
    minlength: 'At least 6 characters required'
  };


  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }


  async logIn() {
    const loading = await this.loadingCtrl.create();

    this.validateAllFormFields(this.loginForm);

    if (this.loginForm.valid) {
      await loading.present();
      // tslint:disable-next-line: max-line-length
      this.http.get(`${this.services.api_url}/api/user/generate_auth_cookie/?email=${this.loginForm.value.email}&password=${this.loginForm.value.password}`)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe( res => {
        const response = res;

        if (response['error']) {
          this.markFieldsDirty();
          this.alertsToasts.loginErrorToast(response['error'].charAt(0).toUpperCase() + response['error'].slice(1));
          return;
        }

        this.storage.set('userInfo', response['user']).then( (data) => {
          this.services.user.next(response['user']);
          this.alertsToasts.loginSuccessToast();
          if (this.routingState.cartUrl) {
              this.router.navigateByUrl(this.routingState.cartUrl);
          } else {
              this.router.navigateByUrl(this.previousRoute);
          }
        });
      });
    } else {
      this.validAfterSubmit = false;
    }
  }


  markFieldsDirty() {
    const controls = this.loginForm.controls;
    for (const field in controls) {
      if (controls[field]) {
        controls[field].markAsDirty();
      }
    }
  }


  ionViewDidEnter() {
    if (this.routingState.getPreviousUrl() === '/signup') {
      this.previousRoute = '/home';
    } else {
      this.previousRoute = this.routingState.getPreviousUrl();
    }
  }


  ngOnInit() {
    this.loginForm = this.fb.group({
      // tslint:disable-next-line: max-line-length
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}
