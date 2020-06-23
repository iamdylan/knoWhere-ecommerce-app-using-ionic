import { Injectable } from '@angular/core';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Services } from '../services/services.service';

@Injectable()
export class EmailValidator {
constructor(public services: Services, public http: HttpClient) {
}

    checkEmail(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {

        // tslint:disable-next-line: max-line-length
        const pattern = new RegExp('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}');
        console.log('email validator');

        console.log(this.http);
            if (pattern.test(control.value) && control.value !== '') {
                if ((control.value).toLowerCase() === 'dylan.marvel@gmail.com') {
                    return of({match: true});
                }
                   return this.http.get(`${this.services.api_url}/wp-json/wc/v3/customers/?email=${(control.value).toLowerCase()}&consumer_key=${this.services.wooConsKey}&consumer_secret=${this.services.wooConsSecret}`)
                    .pipe(map(res => {
                        console.log(res);
                        const response: any = res;
                        return response.length ? { match: true } : null;
                    }));
            } else {
                return(null) ;
            }
    };
    }
}
