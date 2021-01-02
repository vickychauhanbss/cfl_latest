
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { appConfig } from '../app.config';


@Injectable({ providedIn: 'root' })
export class planService {
constructor(private http: HttpClient) {}


  get_subscription_plans() {
    return this.http.get<any>(appConfig.apiUrl + 'get-plans')
        .pipe(map((res: any) => {
            // login successful if there's a jwt token in the response
            if (res && res.token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(res));
            }
            return res;
        }));
  }

  save_payment(formData) {
    return this.http.post<any>(appConfig.apiUrl + 'save-transaction', formData)
        .pipe(map((res: any) => {
            // login successful if there's a jwt token in the response
            if (res && res.token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(res));
            }
            return res;
        }));
  }
}