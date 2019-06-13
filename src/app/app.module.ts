import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { MenuPage } from './menu/menu.page';
import { HomePage } from './home/home.page';
import { AppRoutingModule } from './app-routing.module';
import { ProductsByCategoryModule } from './products-by-category/products-by-category.module';
import { CategoryService } from './category.service';

@NgModule({
  declarations: [AppComponent, MenuPage, HomePage],
  entryComponents: [AppComponent, MenuPage, HomePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    ProductsByCategoryModule,
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CategoryService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
