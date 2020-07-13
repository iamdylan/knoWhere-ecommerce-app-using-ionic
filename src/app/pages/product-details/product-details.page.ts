import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Services } from '../../services/api-userState.service';
import { catchError, retryWhen, delay } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AlertsToastsService } from 'src/app/services/alerts-toasts.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})

export class ProductDetailsPage implements OnInit {
  @ViewChild('slides', {read: IonSlides, static: false}) slides: IonSlides;

  product: any;
  productInfo: any;

  slideOpts = {
    effect: 'flip',
    loop: false,
  };

  constructor(
    private route: ActivatedRoute,
    public storage: Storage,
    public services: Services,
    public http: HttpClient,
    public alertsToasts: AlertsToastsService
  ) {

    this.productInfo = [];
    this.productInfo.attributes = [];

    this.route.params.subscribe((params: Params) => {
      this.product = params['product'];
    });

  }


  nextSlide() {
    this.slides.slideNext();
  }


  prevSlide() {
    this.slides.slidePrev();
  }


  getProdInfo() {
    // tslint:disable-next-line: max-line-length
    this.http.get(`${this.services.api_url}/wp-json/wc/v3/products/${this.product}/?&consumer_key=${this.services.wooConsKey}&consumer_secret=${this.services.wooConsSecret}`)
    .pipe(
      catchError((err) => {
        // console.log(err);
        return throwError(err);
      }),
      retryWhen((error) => error.pipe(delay(1000)))
    )
    .subscribe(res => {
      this.productInfo = res;
    });
  }


  addToCart(prod) {
    const product = prod;

    if (product.price == null) {
      return console.log('Could not add item to cart.');
    }

    this.storage.get('cart').then((data) => {
      if (data == null || data.length === 0) {
        data = [];

        data.push({
          'product': product,
          'qty': 1,
          'amount': parseFloat(product.price)
        });

      } else {
        let added = 0;

        for (let i = 0; i < data.length; i++) {
          if (product.id === data[i].product.id) {
            const qty = data[i].qty;

            data[i].qty = qty + 1;
            data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
            added = 1;
          }
        }

        if (added === 0) {
          data.push({
            'product': product,
            'qty': 1,
            'amount': parseFloat(product.price)
          });
        }
      }

      this.storage.set('cart', data).then((res) => {
        if (res[res.length - 1].product.id === product.id) {
          this.alertsToasts.addedToCartToast();
        }
      });
    });
  }


  ngOnInit() {
    this.getProdInfo();
  }

}
