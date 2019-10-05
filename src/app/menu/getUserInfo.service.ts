import { Injectable } from '@angular/core';
import { from, Observable, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class GetUserInfo {
  user: any;
  loggedIn = new BehaviorSubject(false);


    constructor(public storage: Storage) {

    }

    // public getUser: Observable<any> =
    //     from(this.storage.get("userLoginInfo").then( userLoginInfo => {
    //     return userLoginInfo;
    // }));

}
