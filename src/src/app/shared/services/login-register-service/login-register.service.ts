
import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { map  } from 'rxjs/operators';
import { appConfig } from '../app.config';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Users } from '../../../interfaces/users';
import { footerService } from '../../../shared/services/footer/footer.service';
import { HeaderService } from '../../../shared/services/header/header.service';
import { MessageService } from '../../../eventservice';


@Injectable({ providedIn: 'root' })
export class loginRegisterService {
    private currentUserSubject: BehaviorSubject<Users>;
    public currentUser: Observable<Users>;
    public onLogin: Subject<any> = new Subject();
    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private footerService: footerService,
        private HeaderService: HeaderService
    ) {
        this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('loginUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        // console.log(this.currentUser)
    }

    public get currentUserValue(): Users {
        return this.currentUserSubject.value;
    }

    Register_user(formData) {
        console.log(formData);
        return this.http.post<any>(appConfig.apiUrl + 'user/register', formData)
            .pipe(map((res: any) => {
                // login successful if there's a jwt token in the response
                if (res && res.token) {
                    console.log(res);
                    // localStorage.setItem('currentUser', JSON.stringify(res));
                    // this.currentUserSubject.next(res);

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    // localStorage.setItem('currentUser', JSON.stringify(res));
                }
                return res;
            }));

    }

    login_user(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'user/login', formData)
            .pipe(map((res: any) => {
                // login successful if there's a jwt token in the response
                if (res && res.token) {
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("loginUser", JSON.stringify(res.user));
                    localStorage.setItem("showDesc", 'showDesc');
                    this.currentUserSubject.next(res);
                    this.onLogin.next(res);
                }
                return res;
            }));

    }

    logout() {
        //remove user from local storage to log user out
        this.HeaderService.closePopupAfterLogout(true);
        this.footerService.hidefooter(false);
        this.messageService.login('showHeaderFooter');
        localStorage.removeItem("loginUser");
        localStorage.removeItem("token");
        localStorage.removeItem('userid');
        localStorage.removeItem('username');
        localStorage.removeItem('showDesc');
        this.currentUserSubject.next(null);
    }

    Verfiy_user(formData) {
        console.log(formData);
        return this.http.post<any>(appConfig.apiUrl + 'admin/varifyUser', formData)
            .pipe(map((res: any) => {
                // login successful if there's a jwt token in the response
                if (res && res.token) {
                    //localStorage.setItem("token", res.token);
                    //localStorage.setItem("loginUser", JSON.stringify(res.user));
                    // this.currentUserSubject.next(res);
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    // localStorage.setItem('currentUser', JSON.stringify(res));
                }
                return res;
            }));
    }

    forgot_password(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'user/forgot_password', formData)
            .pipe(map((res: any) => {
                // login successful if there's a jwt token in the response
                if (res && res.token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    // localStorage.setItem('currentUser', JSON.stringify(res));
                }
                return res;
            }));
    }

    check_user(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'check-user', formData)
            .pipe(map((res: any) => {
                // login successful if there's a jwt token in the response
                if (res && res.token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    // localStorage.setItem('currentUser', JSON.stringify(res));
                }
                return res;
            }));
    }


    admirer_online(formData) {
        return this.http.post<any>(appConfig.apiUrl + 'admirer-online', formData)
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