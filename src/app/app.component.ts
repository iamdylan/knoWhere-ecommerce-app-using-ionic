import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { RoutingStateService } from './services/routing-state.service';
// import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    private routingState: RoutingStateService,
    // private oneSignal: OneSignal
  ) {
    this.initializeApp();
    routingState.loadRouting();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

    //   this.oneSignal.startInit('7f203b9b-30fb-4466-9924-224163e0b51b', '423456359366');

    //   this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    //   this.oneSignal.handleNotificationReceived().subscribe(() => {
    //   // do something when notification is received
    //   });

    //   this.oneSignal.handleNotificationOpened().subscribe(() => {
    //     // do something when a notification is opened
    //   });

    //   this.oneSignal.endInit();
    });
  }

  ngOnInit() {
  }

}
