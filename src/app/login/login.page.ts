import { Component } from '@angular/core';
import { MbscFormOptions } from '@mobiscroll/angular-lite/src/js/forms.angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { ToastController, AlertController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router,  } from '@angular/router';
import { RoutingStateService } from '../services/routing-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {

  previousRoute: string;

  constructor(private fb: FormBuilder, public http: Http, private router: Router, public toastCtrl: ToastController, public storage: Storage, public alertCtrl: AlertController, public events: Events, private routingState: RoutingStateService) {
    this.loginForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
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
    minlength: 'At least 6 characters required'
  };

  logIn(){
    this.http.get("http://localhost/dashboard/wordpress/api/auth/generate_auth_cookie/?insecure=cool&username=" + this.loginForm.value.username + "&password=" + this.loginForm.value.password)
    .subscribe( (res) => {
      console.log(res.json());

      let response = res.json();

      if(response.error){
        this.markFieldsDirty();
        this.toast(response);
        return;
      }

      this.storage.set("userLoginInfo", response).then( (data) =>{
        console.log(data, response)
        this.presentAlert();
      })
    });
  }

  async toast(response){
    let tc= await this.toastCtrl.create({
          message: response.error,
          duration: 5000,
          showCloseButton: true,
          color: "dark"
        });

    tc.present();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Login Successful',
      message: 'You are logged in successfully.',
      buttons: [
        {
          text: 'OK',
          cssClass: 'secondary',
          handler: () => {
            console.log('routing')
            console.log(this.routingState.cartUrl)

            if(this.routingState.cartUrl){
              this.router.navigateByUrl(
                this.routingState.cartUrl
              );
            }else{
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
    this.previousRoute = this.routingState.getPreviousUrl();
    console.log(this.previousRoute);
  }

}
