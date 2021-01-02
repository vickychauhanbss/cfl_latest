
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { appConfig } from '../app.config';
import { HeaderService } from '../../../shared/services/header/header.service';

import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class homeService {
  constructor(
      private http: HttpClient,
      private headerService : HeaderService,
    ) { }

  get_home_data() {
    return this.http.get<any>(appConfig.apiUrl + 'get-home-data')
        .pipe(map((res: any) => {
            if (res && res.token) {
            }
            return res;
        }));
  }

  download_guide(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'download-guide', formData)
            .pipe(map((res: any) => {
                if (res && res.token) {
                }
                return res;
            }));
    }


    subscribe_user(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'subscribe-newsletter', formData)
            .pipe(map((res: any) => {
                if (res && res.token) {
                }
                return res;
            }));
    }

    get_insta_links() {
        return this.http.get<any>('https://api.instagram.com/v1/users/8987997106/media/recent?access_token=8987997106.924f677.8555ecbd52584f41b9b22ec1a16dafb9')
            .pipe(map((res: any) => {
                if (res && res.token) {
                }
                return res;
            }));
    }

    get_facebook_links() {
        return this.http.get<any>('https://graph.facebook.com/?fields=og_object{likes.summary(total_count).limit(0)},share&id=659363287763140')
            .pipe(map((res: any) => {
                if (res && res.token) {
                }
                return res;
            }));
    }

    get_youtube_likes() {
        return this.http.get<any>('https://www.googleapis.com/youtube/v3/search?key=AIzaSyC54Msu0PHDD7bpmjrd4eLRFQ2RLxjSWwY&channelId=UCooOp70lTrrOi4bqG531JOA&order=date&part=snippet&type=video,id&maxResults=1')
            .pipe(map((res: any) => {
                if (res && res.token) {
                }
                return res;
            }));
    }

    reset_user_password(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'user/reset_password', formData)
            .pipe(map((res: any) => {
                if (res && res.token) {
                }
                return res;
            }));
    }

    get_single_blog(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'get-blog', formData)
            .pipe(map((res: any) => {
                if (res && res.token) {
                }
                return res;
            }));
    }

    check_forgot_password_token(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'check-reset-token',formData)
            .pipe(map((res: any) => {
                if (res && res.token) {
                }
                return res;
            }));
      }

    get_help_and_support_data(formData){
        return this.http.post<any>(appConfig.apiUrl + 'help-support', formData)
        .pipe(map((res: any) => {
            if (res && res.token) {
            }
            return res;
        }));
    }


    save_faq_questions(formData){
        return this.http.post<any>(appConfig.apiUrl + 'faq-count', formData)
        .pipe(map((res: any) => {
            if (res && res.token) {
            }
            return res;
        }));
    }

    search_faq_questions(formData){
        return this.http.post<any>(appConfig.apiUrl + 'search-faq', formData)
        .pipe(map((res: any) => {
            if (res && res.token) {
            }
            return res;
        }));
    }

    checkdata(type) {
            return this.http.get<any>(appConfig.apiUrl + 'update-activity/' + type)
            .pipe(map((res: any) => {
                if (res && res.status == "OK") {
                    var dateToCompare = moment(res.data.expired_date);
                    var today = moment(new Date());
                     if(dateToCompare > today && res.data.current_plan == 1){
                        let currentUesr =  localStorage.getItem("loginUser");
                        let userData = JSON.parse(currentUesr);
                        userData.plan_type = res.data.previous_plan;
                        localStorage.setItem("loginUser", JSON.stringify(userData));
                        this.headerService.updateUserPlan(res.data.previous_plan);
                     }
                }
                return res;
            }));
    }
}