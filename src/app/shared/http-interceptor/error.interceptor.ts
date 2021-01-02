import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MessageService } from '../../eventservice';
import { Router } from "@angular/router";
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private toaster : ToastrManager, private messageService : MessageService, private router : Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log('err',err);
            if(err.status === 400) {
                if(err.error.error === 'token_not_provided') {
                    this.toaster.errorToastr('Your session has expired. Please login again', 'Oops!', {
                        position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
                    });
                    this.messageService.login('showHeaderFooter');
                    localStorage.removeItem("loginUser");
                    localStorage.removeItem("token");
                    this.router.navigate(['home']);
                } else {
                    this.toaster.errorToastr(err.error, 'Oops!', {
                        position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
                    });
                }
            } else {
                this.toaster.errorToastr(err.error.message, 'Oops!', {
                    position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
                });
            }
            const error = err.error.error_description || err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
