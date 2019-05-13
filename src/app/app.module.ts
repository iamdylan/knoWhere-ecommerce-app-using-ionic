import { FormsModule, FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular-lite';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { MenuPage } from './menu/menu.page';
import { HomePage } from './home/home.page';
import { AppRoutingModule } from './app-routing.module';
import { ProductsByCategoryModule } from './products-by-category/products-by-category.module';
import { ProductDetailsPage } from './product-details/product-details.page';
import { IonicStorageModule } from '@ionic/storage';
import { CartPage } from './cart/cart.page';
import { emailValidator } from './validator/email'

@NgModule({
  declarations: [AppComponent, MenuPage, HomePage, ProductDetailsPage, CartPage],
  entryComponents: [AppComponent, MenuPage, HomePage, CartPage],
  imports: [ 
    FormsModule,
    ReactiveFormsModule,
    MbscModule,
    BrowserModule,
    IonicModule.forRoot(),
    ProductsByCategoryModule,
    AppRoutingModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    emailValidator,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
