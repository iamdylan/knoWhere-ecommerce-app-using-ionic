import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { RoutingStateService } from './services/routing-state.service';
import { Network } from '@ionic-native/network/ngx';
import { AlertsToastsService } from './services/alerts-toasts.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';

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
    public network: Network,
    public alertstoasts: AlertsToastsService,
    private oneSignal: OneSignal
  ) {
    this.initializeApp();
    this.routingState.loadRouting();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(true);

      this.oneSignal.startInit('7f203b9b-30fb-4466-9924-224163e0b51b', '423456359366');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.handleNotificationReceived().subscribe(() => {
      });
      this.oneSignal.handleNotificationOpened().subscribe(() => {
      });
      this.oneSignal.endInit();

      this.splashScreen.hide();
      });
    }


  ngOnInit() {
    this.network.onDisconnect().subscribe(() => {
      this.alertstoasts.presentNoNetAlert();
    });

    this.network.onConnect().subscribe(() => {
      this.alertstoasts.dismissNoNetAlert();
    });
  }
}
