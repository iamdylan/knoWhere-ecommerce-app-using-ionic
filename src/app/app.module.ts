import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { FormBuilder } from '@angular/forms';
import { IImageLoaderOptions, NgxProgressiveImageLoaderModule } from 'ngx-progressive-image-loader';
import { HomePageModule } from './home/home.module';
import { HomePage } from './home/home.page';
import { MenuPage } from './menu/menu.page';
import { PayPal } from '@ionic-native/paypal/ngx';
import { CheckAuthGuard } from './cart/auth.guard';
import { LoginPageModule } from './login/login.module';
import { CartPageModule } from './cart/cart.module';
import { CheckoutPageModule } from './checkout/checkout.module';
import { ProductDetailsModule } from './product-details/product-details.module';
import { ProductsByCategoryModule } from './products-by-category/products-by-category.module';
import { SignupPageModule } from './signup/signup.module';
import { EmailValidator } from './validators/email.validator';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PipesModule } from './pipes/pipes.module';
import { Services } from './services/services.service';
import { CheckLoggedIn } from './login/login.guard';
// import { OneSignal } from '@ionic-native/onesignal/ngx';

@NgModule({
  declarations: [AppComponent, MenuPage],
  entryComponents: [AppComponent, HomePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    NgxProgressiveImageLoaderModule.forRoot(<IImageLoaderOptions>{
      // rootMargin must be specified in pixels or percent
      rootMargin: '0px',
      threshold: 0.1,
      // css filter
      filter: 'blur(6px)',
      // image width / height ratio for image holder
      imageRatio: 1 / 1
    }),
    // FormsModule,
    // ReactiveFormsModule,
    HomePageModule,
    ProductsByCategoryModule,
    ProductDetailsModule,
    CartPageModule,
    SignupPageModule,
    LoginPageModule,
    CheckoutPageModule,
    PipesModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production,
      registrationStrategy: 'registerImmediately' }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FormBuilder,
    Services,
    EmailValidator,
    CheckAuthGuard,
    CheckLoggedIn,
    PayPal
    // OneSignal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
