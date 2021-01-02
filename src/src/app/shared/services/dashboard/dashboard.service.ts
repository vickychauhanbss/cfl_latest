  import { map, catchError } from 'rxjs/operators';

import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from '../app.config';


@Injectable({ providedIn: 'root' })
export class dashboardService {
  constructor(private http: HttpClient) { }


  get_users_profile_data(formData) {
    return this.http.post<any>(appConfig.apiUrl + 'get-profiles', formData)
        .pipe(map((res: any) => {
            // login successful if there's a jwt token in the response
            if (res && res.token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(res));
            }
            return res;
        }));
  }

  get_users_new_count(formData) {
    return this.http.post<any>(appConfig.apiUrl + 'get-new-count', formData)
        .pipe(map((res: any) => {
            // login successful if there's a jwt token in the response
            if (res && res.token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(res));
            }
            return res;
        }));
  }


  get_more_preferences_filter_data(formData) {
    return this.http.post<any>(appConfig.apiUrl + 'get-general-Questions', formData)
        .pipe(map((res: any) => {
         1   // login successful if there's a jwt token in the response
            if (res && res.token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(res));
            }
            return res;
        }));
  }

1
  save_more_preferences_filter(formData){
    return this.http.post<any>(appConfig.apiUrl + 'save-user-preferences', formData)
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

  visit_user_profile(formData){
    return this.http.post<any>(appConfig.apiUrl + 'visit-profile', formData)
    .pipe(map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(res));
        }
        return res;
    }));
  }

  apply_center_stage(formData){
    return this.http.post<any>(appConfig.apiUrl + 'center-stage', formData)
    .pipe(map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(res));
        }
        return res;
    }));
  }

  reset_filter(formData){
    return this.http.post<any>(appConfig.apiUrl + 'clear-filters', formData)
    .pipe(map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(res));
        }
        return res;
    }));
  }

  get_dashboard_banner(){
    return this.http.get<any>(appConfig.apiUrl + 'dashboard-banner')
    .pipe(map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(res));
        }
        return res;
    }));
  }

  get_user_stories(formData) {
    return this.http.post<any>(appConfig.apiUrl + 'stories', formData)
        .pipe(map((res: any) => {
            // login successful if there's a jwt token in the response
            if (res && res.token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(res));
            }
            return res;
        }));
  }

  get_countries_data(){
    return this.http.get<any>(appConfig.apiUrl + 'get-countries')
    .pipe(map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(res));
        }
        return res;
    }));
  }


  get_center_stage_profiles(formData){
    return this.http.post<any>(appConfig.apiUrl + 'center-profiles', formData)
    .pipe(map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(res));
        }
        return res;
    }));
  }

  get_biggest_admirer(formData){
    return this.http.post<any>(appConfig.apiUrl + 'biggest-admirer', formData)
    .pipe(map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(res));
        }
        return res;
    }));
  }

  page_visit_user(formData){
    return this.http.post<any>(appConfig.apiUrl + 'page-visit', formData)
    .pipe(map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(res));
        }
        return res;
    }));
  }

  view_user_stories(formData){
    return this.http.post<any>(appConfig.apiUrl + 'view-story', formData)
    .pipe(map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(res));
        }
        return res;
    }));
  }

  getUserImage(formData){
    return this.http.post<any>(appConfig.apiUrl + 'resize-image', formData)
    .pipe(map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(res));
        }
        return res.url;
    },(error) => {
      console.log('+++++++',error)
    }));
  }


  found_one_user(formData){
    return this.http.post<any>(appConfig.apiUrl + 'found-one', formData)
    .pipe(map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(res));
        }
        return res;
    }));
  }

  confirm_found_one(formData){
    return this.http.post<any>(appConfig.apiUrl + 'confirm-found-one', formData)
    .pipe(map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(res));
        }
        return res;
    }));
  }


  all_found_one(formData){
    return this.http.post<any>(appConfig.apiUrl + 'all-found-one', formData)
    .pipe(map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(res));
        }
        return res;
    }));
  }


  like_found_one(formData){
    return this.http.post<any>(appConfig.apiUrl + 'like-found-one', formData)
    .pipe(map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(res));
        }
        return res;
    }));
  }


 send_email_after_message(formData){
    return this.http.post<any>(appConfig.apiUrl + 'message-send', formData)
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