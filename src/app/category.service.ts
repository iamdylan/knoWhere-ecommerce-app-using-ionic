import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private category: any;
  
  constructor() {} 
  
  public setDestn(cat) {
    this.category = cat;
  }

  getDestn() {
    return this.category;
  }
}
