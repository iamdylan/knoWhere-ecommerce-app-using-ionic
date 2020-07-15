import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Services } from '../../services/api-userState.service';
import { catchError, retryWhen, delay } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.page.html',
  styleUrls: ['./products-by-category.page.scss']
})

export class ProductsByCategoryPage implements OnInit {
  products: any;
  cat: number;
  page: number;
  catName: any;
  endMsg: boolean;
  outOfStock: boolean;

  constructor(
    private route: ActivatedRoute,
    public services: Services,
    public http: HttpClient
  ) {

    this.page = 1;
    this.products = [];
    this.catName = [{name: ''}];
    this.endMsg = false;
    this.outOfStock = false;

    this.route.params.subscribe((params: Params) => {
      this.cat = params['category'];
    });

  }


  getProdByCat() {
    // tslint:disable-next-line: max-line-length
    this.http.get(`${this.services.api_url}/wp-json/wc/v3/products?category=${this.cat}&consumer_key=${this.services.wooConsKey}&consumer_secret=${this.services.wooConsSecret}`)
    .pipe(
      catchError((err) => {
        // console.log(err);
        return throwError(err);
      }),
      retryWhen((error) => error.pipe(delay(1000)))
    )
    .subscribe(res => {
      this.products = res;
      this.products.length > 0 ? this.outOfStock = false : this.outOfStock = true;

    });
  }


  loadMoreProducts(event) {
    this.page++;

    // tslint:disable-next-line: max-line-length
    this.http.get(`${this.services.api_url}/wp-json/wc/v3/products?category=${this.cat}&page=${this.page}&consumer_key=${this.services.wooConsKey}&consumer_secret=${this.services.wooConsSecret}`)
    .pipe(
      catchError((err) => {
        // console.log(err);
        return throwError(err);
      }),
      retryWhen((error) => error.pipe(delay(1000)))
    )
    .subscribe(res => {
      const temp: any = res;
      this.products = this.products.concat(temp);
      event.target.complete();

      if (temp.length === 0 ) {
        event.target.disabled = true;
        this.endMsg = true;
      }
    });
  }


  ngOnInit() {
    this.getProdByCat();
  }
}
