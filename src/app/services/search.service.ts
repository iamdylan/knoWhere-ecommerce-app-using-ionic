import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Services } from './api-userState.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  searchQuery = '';

  constructor(
    private router: Router,
    public services: Services,
    public http: HttpClient,
  ) {

  }

  onSearch(event) {
    if (this.searchQuery.length > 0) {
      this.router.navigateByUrl('search/' + this.searchQuery);
    }
  }

}
