import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';


@Injectable({ providedIn: 'root' })
export class OnboardingGuard implements CanActivate {
    constructor(
        private router: Router,
        private toastr: ToastrManager,

    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(localStorage.getItem('firstTime') == null){
            const currentUser = JSON.parse(localStorage.getItem('loginUser'));
            if (currentUser && currentUser.onboarding_complete == '1') {
               return true;
            }
            this.toastr.successToastr('Complete your onboarding first.', 'Oops!',   {
                position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
            });
            this.router.navigate(['home/onboarding']);
            return false;
        }
    }
}