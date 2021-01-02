import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private toastr: ToastrManager,

    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if(localStorage.getItem('firstTime') == null){
            const currentUser = JSON.parse(localStorage.getItem('loginUser'));
            if (currentUser) {
                console.log('--------------------',currentUser)
                // authorised so return true
                return true;
            }

            this.toastr.successToastr('You need to login first', 'Oops!',   {
                position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
            });

            localStorage.setItem('firstTime', 'firstTime')
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/']);


            setTimeout(() => {
                localStorage.removeItem('firstTime')
            }, 1000)
            return false;
        }
    }
}