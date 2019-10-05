import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { MbscModule } from '@mobiscroll/angular-lite';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageModule } from './home/home.module';
import { HomePage } from './home/home.page';
import { NeedAuthGuard } from './login/auth.guard';
import { GetUserInfo } from './menu/getUserInfo.service';
import { MenuPage } from './menu/menu.page';
import { ProductDetailsModule } from './product-details/product-details.module';
import { ProductDetailsPage } from './product-details/product-details.page';
import { ProductsByCategoryModule } from './products-by-category/products-by-category.module';
import { ProductsByCategoryPage } from './products-by-category/products-by-category.page';
import { RoutingStateService } from './services/routing-state.service';
import { EmailValidator } from './validators/email.validator';
import { UserValidator } from './validators/username.validator';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
    NgxUsefulSwiperModule,
    IonicStorageModule.forRoot(),
    MDBBootstrapModule.forRoot()
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
