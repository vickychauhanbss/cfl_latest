import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private toastr: ToastrManager,

    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = JSON.parse(localStorage.getItem('loginUser'));
        console.log('Auth Gurad Check,', localStorage.getItem('loginUser'));
        if (currentUser != null) {
            return true;
        }
        this.toastr.successToastr('You need to login first', 'Oops!', {
            position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
        });
        this.router.navigate(['/']);
        return false;
    }
}