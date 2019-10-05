import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})

export class CartPage implements OnInit {

  cartItems: any[] = [];
  total: any;
  // showEmptyCartMessage: boolean;


  constructor(public storage: Storage, public modalCtrl: ModalController, private location: Location,
    public toastCtrl: ToastController, private router: Router) {
    // this.showEmptyCartMessage = false;
    this.total = 0.0;
  }

  removeFromCart(item, i) {
    const price = item.product.price;
    const qty = item.qty;

    this.cartItems.splice(i, 1);
    this.storage.set('cart', this.cartItems).then( () => {
      this.total = this.total - (price * qty);
    });

    // if (this.cartItems.length === 0) {
    //   this.showEmptyCartMessage = true;
    // }
  }

  closeCart() {
    this.location.back();
  }

  checkOut() {
    this.cartItems.length === 0 ? this.toast() : this.router.navigateByUrl('/checkout');
  }

  async toast() {
    const tc = await this.toastCtrl.create({
          message: 'Your Cart seems to be empty!',
          duration: 5000,
          color: 'dark',
          cssClass: 'cart-toast'
        });

    tc.present();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.ready().then(() => {
      this.storage.get('cart').then( (data) => {
        this.cartItems = data;

        if (this.cartItems != null && this.cartItems.length > 0) {
          this.cartItems.forEach( (item, index) => {
            this.total = this.total + (item.product.price * item.qty);
          });
        }
      });
    });
  }

}
