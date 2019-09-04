import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})

export class CartPage implements OnInit {

  cartItems: any[] = [];
  total: any;
  showEmptyCartMessage: boolean = false;


  constructor(public storage: Storage, public modalCtrl: ModalController, private location: Location) { 
    this.total = 0.0;
  }


  removeFromCart(item, i){

    let price = item.product.price;
    let qty = item.qty;

    this.cartItems.splice(i, 1);
    this.storage.set("cart", this.cartItems).then( ()=> {
      this.total = this.total - (price * qty);
    });

    if(this.cartItems.length == 0){
      this.showEmptyCartMessage = true;
    }

  }

  closeCart(){
    this.location.back();
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.ready().then(()=>{
      this.storage.get("cart").then( (data)=>{
        this.cartItems = data;

        if(this.cartItems != null && this.cartItems.length > 0){
          this.cartItems.forEach( (item, index)=> {
            this.total = this.total + (item.product.price * item.qty)
          })
        } else {
          this.showEmptyCartMessage = true;
        }
      })
    })
  }
  
}
