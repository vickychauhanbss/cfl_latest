
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { appConfig } from '../app.config';


@Injectable({ providedIn: 'root' })
export class centerStageService {
  constructor(private http: HttpClient) {
  }


  get_center_stage_profiles(formData) {
    return this.http.post<any>(appConfig.apiUrl + 'get-center-users', formData)
        .pipe(map((res: any) => {
            // login successful if there's a jwt token in the response
            if (res && res.token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(res));
            }
            return res;
        }));
  }


  get_users_profile_data(formData) {
    return this.http.post<any>(appConfig.apiUrl + 'get-center-users', formData)
        .pipe(map((res: any) => {
            // login successful if there's a jwt token in the response
            if (res && res.token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(res));
            }
            return res;
        }));
  }


  update_interest(formData){
    return this.http.post<any>(appConfig.apiUrl + 'user/save-interest', formData)
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