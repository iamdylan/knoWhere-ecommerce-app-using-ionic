import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Services {

    api_url = 'https://dylan-thompson.online';

    // API Keys will have to be hidden in an actual app, possibly using node.js to create a backend proxy.
    // If you're a dev in training don't forget to change these two, to match your own.
    wooConsKey = 'ck_d6fa9970542b8488fa30889040c5cb7de25799a6';
    wooConsSecret = 'cs_9a66fec9e42c4809ba187b0f852041d2fc180e28';


    user = new BehaviorSubject(null);
    userDetails: any;

    constructor() {
        this.user.subscribe(value => {
            if (value != null) {
                console.log(value);
                this.userDetails = value;
            }
        });
    }

}
