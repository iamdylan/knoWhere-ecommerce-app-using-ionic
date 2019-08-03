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
import { EmailValidator } from './validators/email.validator';
import { UserValidator } from './validators/username.validator';
import { ProductsByCategoryPage } from './products-by-category/products-by-category.page';
import { HttpModule } from '@angular/http';
import { NeedAuthGuard } from './login/auth.guard';
import { HomePageModule } from './home/home.module';
import { ProductDetailsModule } from './product-details/product-details.module';
import { RoutingStateService } from './services/routing-state.service';
import { GetUserInfo } from './menu/getUserInfo.service';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

@NgModule({
  declarations: [AppComponent, MenuPage],
  entryComponents: [AppComponent, MenuPage, HomePage, ProductsByCategoryPage, ProductDetailsPage],
  imports: [ 
    FormsModule,
    ReactiveFormsModule,
    MbscModule,
    BrowserModule,
    IonicModule.forRoot(),
    ProductsByCategoryModule,
    ProductDetailsModule,
    HomePageModule,
    AppRoutingModule,
    HttpModule,
    NgxUsefulSwiperModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FormBuilder,
    EmailValidator,
    UserValidator,
    NeedAuthGuard,
    RoutingStateService,
    GetUserInfo
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
