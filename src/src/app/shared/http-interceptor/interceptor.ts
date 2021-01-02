import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let Token = localStorage.getItem('token');
        let headers = {
        }
        if (Token) {
            headers['Authorization'] = `Bearer ${Token}`;
        }
        request = request.clone({
            setHeaders: headers
        });
        return next.handle(request);
    }
}