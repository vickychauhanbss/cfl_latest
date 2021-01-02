import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { homeService } from '../../../../shared/services/home/home.service';
import { NgxSpinnerService } from "ngx-spinner";
//Import notification toast
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router,ActivatedRoute } from "@angular/router";
import { HeaderService } from '../../../../shared/services/header/header.service';
import { footerService } from '../../../../shared/services/footer/footer.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private homeService: homeService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrManager,
    private route: ActivatedRoute,
    private router: Router,
    private HeaderService: HeaderService,
    private footerService: footerService
  ) {
    this.resetPasswordForm = this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        id: [''],
      }, {validator: this.MustMatch('password', 'confirmPassword')
    });

    this.route.queryParams.subscribe(params => {
      this.resetPasswordForm.patchValue({
        id: params['id']
     });


     //Check change password token
     if(params['id']){
      this.homeService.check_forgot_password_token({'id':params['id']}).subscribe((data: any) => {
        this.spinner.hide();
        if(data.status == "error"){
          this.toastr.errorToastr('Token expired', 'Oops!',   {
            position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
          });
          this.router.navigate(['home'])
        }
      }, error => {
        console.log(error);
        this.spinner.hide();
        this.toastr.errorToastr(error.error, 'Oops!',   {
          position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
        });
      })
     }
    })
   }

  ngOnInit() {
    this.HeaderService.loggedIn('hideHeader');
    this.footerService.hidefooter('hidefooter');
  }

  get f() { return this.resetPasswordForm.controls; }

  //Change password function
  onSubmit() {
    this.submitted = true;
    //stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
        return;
    }

    this.spinner.show();
    this.homeService.reset_user_password(this.resetPasswordForm.value).subscribe((data: any) => {
      this.spinner.hide();
      if(data.status == "OK"){
        this.submitted = false;
        this.resetPasswordForm.reset();
        this.router.navigate(['home'])
        this.toastr.successToastr('Password has been changed successfully.', 'Success',
            { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        );
      }
    }, error => {
      this.spinner.hide();
      this.toastr.errorToastr('Token expired', 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
    })
  }

  //password and confirm password match
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
}
