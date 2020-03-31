import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { RoutingStateService } from './services/routing-state.service';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IImageLoaderOptions, NgxProgressiveImageLoaderModule } from 'ngx-progressive-image-loader';
import { HomePageModule } from './home/home.module';
import { HomePage } from './home/home.page';
import { MenuPage } from './menu/menu.page';
import { GetUserInfo } from './menu/getUserInfo.service';
import { LoginPage } from './login/login.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PayPal } from '@ionic-native/paypal/ngx';
import { MbscModule } from '@mobiscroll/angular-lite';
import { AppComponent } from './app.component';
// import { OwlModule } from 'ngx-owl-carousel';
import { NeedAuthGuard } from './login/auth.guard';
import { LoginPageModule } from './login/login.module';
import { CartPageModule } from './cart/cart.module';
import { CheckoutPageModule } from './checkout/checkout.module';
import { ProductDetailsModule } from './product-details/product-details.module';
import { ProductsByCategoryModule } from './products-by-category/products-by-category.module';
import { SignupPageModule } from './signup/signup.module';
import { EmailValidator } from './validators/email.validator';
import { UserValidator } from './validators/username.validator';
// import { OneSignal } from '@ionic-native/onesignal/ngx';

@NgModule({
  declarations: [AppComponent, MenuPage],
  entryComponents: [AppComponent, HomePage, LoginPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    NgxProgressiveImageLoaderModule.forRoot(<IImageLoaderOptions>{
      // rootMargin must be specified in pixels or percent
      rootMargin: '0px',
      threshold: 0.1,
      // css filter
      filter: 'blur(6px)',
      // image width / height ratio for image holder
      imageRatio: 1 / 1
    }),
    // OwlModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MbscModule,
    HomePageModule,
    ProductsByCategoryModule,
    ProductDetailsModule,
    CartPageModule,
    SignupPageModule,
    LoginPageModule,
    CheckoutPageModule,
    // SlickCarouselModule,
  ],
  providers: [
    SplashScreen,
    StatusBar,
    RoutingStateService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FormBuilder,
    GetUserInfo,
    EmailValidator,
    UserValidator,
    NeedAuthGuard,
    PayPal,
    // OneSignal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
