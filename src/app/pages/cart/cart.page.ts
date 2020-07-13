import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})

export class CartPage {

  cartItems: any[] = [];
  total: any;

  constructor(
    public storage: Storage,
    private location: Location,
    private router: Router
  ) {
    this.total = 0.0;
  }


  removeFromCart(item, i) {
    const price = item.product.price;
    const qty = item.qty;

    this.cartItems.splice(i, 1);
    this.storage.set('cart', this.cartItems).then( () => {
      this.total = this.total - (price * qty);
    });
  }


  closeCart() {
    this.location.back();
  }


  checkOut() {
    this.router.navigateByUrl('/checkout');
  }


  ionViewWillEnter() {
    this.storage.ready().then(() => {
      this.storage.get('cart').then( (data) => {
        this.cartItems = data;

        if (this.cartItems != null && this.cartItems.length > 0) {
          this.cartItems.forEach( (item) => {
            this.total = this.total + (item.product.price * item.qty);
          });
        }
      });
    });
  }
}
