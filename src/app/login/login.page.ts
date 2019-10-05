import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, Events, ToastController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MbscFormOptions } from '@mobiscroll/angular-lite/src/js/forms.angular';
import { GetUserInfo } from '../menu/getUserInfo.service';
import { RoutingStateService } from '../services/routing-state.service';
import { WooCommerceService } from '../services/woo-commerce.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  previousRoute: string;

  constructor(private fb: FormBuilder, public http: HttpClient, private router: Router,
  public toastCtrl: ToastController, public storage: Storage, public alertCtrl: AlertController,
  public events: Events, private routingState: RoutingStateService, public getUserInfo: GetUserInfo,
  public WooCom: WooCommerceService, public loadingCtrl: LoadingController) {

  }

  loginForm: FormGroup;

  attemptedSubmit = false;

  formSettings: MbscFormOptions = {
    theme: 'ios'
  };

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
    this.http.get(`${this.WooCom.url}/api/auth/generate_auth_cookie/?username=${this.loginForm.value.username}&password=${this.loginForm.value.password}`)
    .pipe(finalize(() => loading.dismiss()))
    .subscribe( (res) => {
      console.log(res);
      const response = res;

      if (response['error']) {
        this.markFieldsDirty();
        this.toast(response);
        return;
      }

      this.storage.set('userLoginInfo', response).then( (data) => {
        this.getUserInfo.user = response['user'];
        console.log(this.getUserInfo.user);
        this.getUserInfo.loggedIn.next(true);
        this.presentAlert();
      });
    });
    }
  }

  async toast(response) {
    const tc = await this.toastCtrl.create({
          message: response.error,
          duration: 5000,
          color: 'dark',
          cssClass: 'login-toast'
        });

    tc.present();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Login Successful',
      buttons: [
        {
          text: 'OK',
          cssClass: 'secondary',
          handler: () => {
            console.log('routing');

            if (this.routingState.cartUrl) {
              this.router.navigateByUrl(
                this.routingState.cartUrl
              );
            } else {
              this.router.navigateByUrl(
                this.previousRoute
              );
            }
          }
        }
      ]
    });

    await alert.present();
  }

  markFieldsDirty() {
    const controls = this.loginForm.controls;
    for (const field in controls) {
      if (controls[field]) {
        controls[field].markAsDirty();
      }
    }
  }

  // logIn() {
  //   this.attemptedSubmit = true;
  //   if (this.loginForm.valid) {
  //     mobiscroll.toast({
  //       message: 'Logged In!',
  //       callback: () => {
  //         this.loginForm.reset();
  //         this.attemptedSubmit = false;
  //       }
  //     });
  //   } else {
  //     this.markFieldsDirty();
  //   }
  // }

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

  ionViewDidEnter() {
    if (this.routingState.getPreviousUrl() === '/signup') {
      this.previousRoute = '/home';
    } else {
      this.previousRoute = this.routingState.getPreviousUrl();
    }
    console.log('Previous route', this.previousRoute);
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

}
