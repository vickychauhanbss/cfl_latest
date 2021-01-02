
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { appConfig } from '../app.config';
import { Observable, throwError } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class userService {
    constructor(private http: HttpClient) { }
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            return throwError(error);
        };
    }

    callAjax(url) {
        return this.http.get<any>(url)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    get_user_profile_data(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'user/getProfileData', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }


    /* Aditya code */
    get_user_profile_review_log(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'profile-review-log', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }
    /* end aditya code */
    update_about_me_data(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'user/updateAboutMe', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    update_interset_data(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'user/updateUserInterest', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    update_Questions(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'user/updateGeneralQuestions', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    add_New_interest(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'user/addUserInterest', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }


    get_admin_added_aboutme(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'get-admin-about', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    get_admin_added_interest(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'get-admin-interest', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }


    save_show_about_checked_data(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'show-about', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }


    get_user_interest_icon(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'interest-logo', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    update_status(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'user/update-user-status', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    change_gallery(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'save-gallary', formData, {
            reportProgress: true,
            observe: 'events'
        }).pipe(map((res: any) => {
                return res;
            }));
    }


    change_video(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'save-videos', formData, {
            reportProgress: true,
            observe: 'events'
        }).pipe(map((res: any) => {
            return res;
        }));
    }


    get_user_banner(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'user/get-banners', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    delete_image_video(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'delete-gallary', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    active_banner(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'user/activate-banner', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    save_user_likes(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'user/save-likes', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }


    get_user_profile_completness_data(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'profile-completenes', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    complete_profile(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'complete_profile', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }


    get_user_notification(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'get-notifications', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }


    logout_user(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'user/logout', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }


    onboarding_retake_user(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'retake', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }


    check_user_token() {
        return this.http.get<any>(appConfig.apiUrl + 'check-token')
            .pipe(tap((res: any) => {
                //return res;
            }),
                catchError(this.handleError<any>('check_user_token'))
            );
    }

    update_score(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'update-score', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    check_user_notification_count(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'notification-count', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    read_notifiaction_by_user(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'read-notification', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }


    id_proof_upload(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'id-proof-upload', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    delete_user_interest(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'delete-interest', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    get_user_account_settings(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'account-settings', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }


    save_account_settings(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'save-account-settings', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }


    remove_user_profile_image(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'remove-profileimg', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    get_gellery_data(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'user-gallary', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }


    upload_images_video_chat(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'aws-upload', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    get_user_trust_score(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'total_score', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }


    retake_onboarding(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'retake-onboard', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }


    notify_me_user(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'notify-me', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }


    get_country_details_data(formData) {
        return this.http.get<any>(appConfig.apiUrl + 'state-detail/' + formData.state)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    delete_about_me_question(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'delete-aboutme', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }


    delete_user_profile(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'delete-profile', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    set_More_Preferences(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'set-preferences', formData)
            .pipe(map((res: any) => {
                return res;
            }));
    }
}