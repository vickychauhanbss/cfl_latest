
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { appConfig } from '../app.config';


@Injectable({ providedIn: 'root' })
export class onboardingService {
  constructor(private http: HttpClient) {
  }


  General_Questions(formData) {
    return this.http.post<any>(appConfig.apiUrl + 'generalQuestions', formData)
        .pipe(map((res: any) => {
            // login successful if there's a jwt token in the response
            if (res && res.token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(res));
            }
            return res;
        }));
  }



  save_Questions(formData) {
    return this.http.post<any>(appConfig.apiUrl + 'submitAnswers', formData)
        .pipe(map((res: any) => {
            // login successful if there's a jwt token in the response
            if (res && res.token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(res));
            }
            return res;
        }));
  }

  Get_Bws_Questions(formData) {
    return this.http.post<any>(appConfig.apiUrl + 'getBwsQuestions', formData)
        .pipe(map((res: any) => {
            // login successful if there's a jwt token in the response
            if (res && res.token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(res));
            }
            return res;
        }));
  }

  Get_Bws_prev_Questions(formData) {
    return this.http.post<any>(appConfig.apiUrl + 'getPreviousQuestion', formData)
        .pipe(map((res: any) => {
            // login successful if there's a jwt token in the response
            if (res && res.token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(res));
            }
            return res;
        }));
  }

  submit_Onboarding_Answers(formData) {
    return this.http.post<any>(appConfig.apiUrl + 'submitOnboardingAnswers', formData)
        .pipe(map((res: any) => {
            // login successful if there's a jwt token in the response
            if (res && res.token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(res));
            }
            return res;
        }));
  }

  check_saved_Bws_Question(formData) {
    return this.http.post<any>(appConfig.apiUrl + 'getPreviousQuestions', formData)
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