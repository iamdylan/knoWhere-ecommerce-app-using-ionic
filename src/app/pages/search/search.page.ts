import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Services } from 'src/app/services/api-userState.service';
import { catchError, retryWhen, delay } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  query: any;
  results: any = [];
  page = 1;
  endMsg = false;
  noResults = false;

  constructor(
    private route: ActivatedRoute,
    public services: Services,
    public http: HttpClient,
    public searchService: SearchService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.query = params['query'];
      console.log(this.query);
    });
  }


  getResults() {
    // tslint:disable-next-line: max-line-length
    this.http.get(`${this.services.api_url}/wp-json/wc/v3/products?search=${this.query}&consumer_key=${this.services.wooConsKey}&consumer_secret=${this.services.wooConsSecret}`)
    .pipe(
      catchError((err) => {
        // console.log(err);
        return throwError(err);
      }),
      retryWhen((error) => error.pipe(delay(1000)))
    )
    .subscribe(res => {
      this.results = res;
      this.results.length > 0 ? this.noResults = false : this.noResults = true;
    });
  }


  loadMoreResults(event) {
    this.page++;

    // tslint:disable-next-line: max-line-length
    this.http.get(`${this.services.api_url}/wp-json/wc/v3/products?search=${this.query}&page=${this.page}&consumer_key=${this.services.wooConsKey}&consumer_secret=${this.services.wooConsSecret}`)
    .pipe(
      catchError((err) => {
        // console.log(err);
        return throwError(err);
      }),
      retryWhen((error) => error.pipe(delay(1000)))
    )
    .subscribe(res => {
      const temp: any = res;
      this.results = this.results.concat(temp);
      event.target.complete();

      if (temp.length === 0 ) {
        event.target.disabled = true;
        this.endMsg = true;
      }
    });
  }


  ngOnInit() {
    this.getResults();
  }

}
