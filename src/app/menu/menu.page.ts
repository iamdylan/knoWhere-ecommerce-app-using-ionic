import { Component, OnInit } from '@angular/core';
import { HomePage } from '../home/home.page';
import * as WC from 'woocommerce-api';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  WooCommerce: any;
  categories: any[];
  public rootPage: any = HomePage;
  

  constructor(public menuCtrl: MenuController, public router: Router, public categoryService: CategoryService) { 
    this.categories = [];

    this.WooCommerce =  WC({
      url: "http://localhost/dashboard/wordpress",
      consumerKey: "ck_b137f07c8316ede0376d58741bf799dada631743",
      consumerSecret: "cs_300fb32ce0875c45a2520ff860d1282a8891f113",
      wpAPI: true,
      version: 'wc/v3'
    });

    this.WooCommerce.getAsync("products/categories").then((data) => {
      console.log(JSON.parse(data.body));

      let temp: any[] = JSON.parse(data.body);

      for( let i = 1; i < temp.length; i ++){
        if(temp[i].parent == 0){

          if(temp[i].slug == "clothing"){
            temp[i].icon = "shirt";
          }
          if(temp[i].slug == "music"){
            temp[i].icon = "musical-notes";
          }
          if(temp[i].slug == "posters"){
            temp[i].icon = "images";
          }
          if(temp[i].slug == "accessories"){
            temp[i].icon = "watch";
          }
          if(temp[i].slug == "decor"){
            temp[i].icon = "rose";
          }
          if(temp[i].slug == "hoodies"){
            temp[i].icon = "snow";
          }

          this.categories.push(temp[i]);
        }
      }
      if(temp[0].parent == 0){
        if(temp[0].slug == "uncategorized"){
            temp[0].icon = "basket";
          }
        this.categories.push(temp[0]);
      }
    }, (err)=> {
      console.log(err)
    })

  }

  openCategoryPage(cat){
    this.categoryService.setDestn(cat);
    this.router.navigate(['/products/' + cat]);
    this.menuCtrl.close();
  }

  ngOnInit() {
  }

}
