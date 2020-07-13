import { Injectable, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AlertsToastsService implements OnInit {
    alerts: any[] = [];

    constructor(
        public alertCtrl: AlertController,
        private router: Router,
        public toastCtrl: ToastController
    ) {
    }

    // No Internet Alert Begin | Called from app.component.ts
    async presentNoNetAlert() {
        const noInternet = await this.alertCtrl.create({
            header: 'No Internet Connection!',
            message: 'Please enable WiFi or Mobile Data.',
            backdropDismiss: false,
            cssClass: 'noInternetAlert',
            animated: true
        });

        this.alerts.push(noInternet);
        await noInternet.present();
    }

    dismissNoNetAlert() {
        if (this.alerts.length) {
            this.alerts.forEach(e => {
                e.dismiss();
            });
        }
        this.alerts = [];
    }
    // No Internet Alert End


    // Order Success Alert Begin | Called from checkout.page.ts
    async orderSuccessAlert(response) {
        const alert = await this.alertCtrl.create({
            header: 'Successful!',
            message: 'Your order has been placed and the Order Number is ' + response.number + '.',
            cssClass: 'checkout-alert',
            buttons: [{
                text: 'OK',
                handler: () => {
                    this.router.navigateByUrl('/home');
                }
            }],
            backdropDismiss: false
        });

        await alert.present();
    }
    // Order Success Alert End


    // Sign Up Success Alert Begin | Called from signup.page.ts
    async signupSuccessAlert() {
        const alert = await this.alertCtrl.create({
            header: 'Account Created!',
            message: 'Your account has been created successfully! Please login to proceed.',
            cssClass: 'signup-alert',
            backdropDismiss: false,
            buttons: [{
                text: 'Login',
                role: 'Login',
                handler: (blah) => {
                    this.router.navigateByUrl('/login');
                }
            }]
        });
        await alert.present();
    }
    // Sign Up Success Alert End


    // Signup Error Toast Begin | Called from signup.page.ts
    async signupErrorToast(response) {
        const tc = await this.toastCtrl.create({
                message: response.message,
                showCloseButton: true,
                color: 'dark'
            });

        tc.present();
    }
    // Signup Error Toast End


    // Added to Cart Toast Begin | Called from product-details.page.ts
    async addedToCartToast() {
        const tc = await this.toastCtrl.create({
            message: 'Added to Cart',
            duration: 5000,
            cssClass: 'toast',
            color: 'dark'
        });

        tc.present();
    }
    // Added to Cart Toast End


    // Logout Success Toast Begin | Called from menu.page.ts
    async logoutSuccessToast() {
        const tc = await this.toastCtrl.create({
            message: `You've been logged out Successfully!`,
            duration: 3000,
            cssClass: 'toast',
            color: 'dark'
        });

        tc.present();
    }
    // Logout Success Toast End


    // Login Error Toast Begin | Called from login.page.ts
    async loginErrorToast(error) {
        const tc = await this.toastCtrl.create({
            message: error,
            duration: 5000,
            color: 'dark',
            cssClass: 'toast'
        });

        tc.present();
    }
    // Login Error Toast End


    // Login Success Toast Begin | Called from login.page.ts
    async loginSuccessToast() {
        const tc = await this.toastCtrl.create({
            message: `Login Successfull!`,
            duration: 3000,
            cssClass: 'toast',
            color: 'dark'
        });

        tc.present();
    }
    // Login Success Toast End


    // Empty Cart Toast Begin | Called from cart.page.ts
    async emptyCartToast() {
        const tc = await this.toastCtrl.create({
                message: 'Your Cart seems to be empty!',
                duration: 3000,
                cssClass: 'toast',
                color: 'dark',
            });

        tc.present();
    }
    // Empty Cart Toast End


    ngOnInit() {
    }
}
