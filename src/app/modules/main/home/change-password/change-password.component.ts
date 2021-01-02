import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { homeService } from '../../../../shared/services/home/home.service';
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
//Import notification toast
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from "@angular/router";
import { HeaderService } from '../../../../shared/services/header/header.service';
import { footerService } from '../../../../shared/services/footer/footer.service';

declare var $: any;
@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, AfterViewInit {
	resetPasswordForm: FormGroup;
	submitted = false;
	@ViewChild('passwordField', null) passwordField: ElementRef;
	constructor(
		private formBuilder: FormBuilder,
		private homeService: homeService,
		private spinner: NgxSpinnerService,
		private toastr: ToastrManager,
		private route: ActivatedRoute,
		private router: Router,
		private HeaderService: HeaderService,
		private footerService: footerService
	) {
		this.resetPasswordForm = this.formBuilder.group({
			password: ['', [Validators.required, Validators.pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,15}$"))]],
			confirmPassword: ['', [Validators.required]],
			id: [''],
		}, {
			validator: this.MustMatch('password', 'confirmPassword')
		});

		this.route.queryParams.subscribe(params => {
			this.resetPasswordForm.patchValue({
				id: params['id']
			});


			//Check change password token
			if (params['id']) {
				this.homeService.check_forgot_password_token({ 'id': params['id'] }).subscribe((data: any) => {
					this.spinner.hide();
					if (data.status == "error") {
						this.toastr.errorToastr('Token expired', 'Oops!', {
							position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
						});
						this.router.navigate(['home'])
					}
				}, error => {
					this.spinner.hide();
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
			if (data.status == "OK") {
				this.submitted = false;
				this.resetPasswordForm.reset();
				this.router.navigate(['home'])
				this.toastr.successToastr('Password has been changed successfully.', 'Success',
					{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
				);
			}
		}, error => {
			this.spinner.hide();
		})
	}

	ngAfterViewInit() {
		$(this.passwordField.nativeElement).popover({
			html: true,
			content: `<ul style="    list-style: none;
			margin: 0px;
			padding-left: 4px;>
				<li style="padding: 5px 0px;" >Password should be minimum 8 characters long.</li>
				<li style="padding: 5px 0px;" >Password should be maximum 15 characters long.</li>
				<li style="padding: 5px 0px;" >Password should contain at least one numeric Letter.</li>
				<li style="padding: 5px 0px;" >Password should contain at least one upper Letter.</li>
				<li style="padding: 5px 0px;" >Password should contain at least one lower Letter.</li>
				<li style="padding: 5px 0px;" >Password should contain at least one special character.</li>
			</ul>`,
			placement: 'right',
			trigger: 'manual'
		})
	}

	pressPass() {
		if (this.resetPasswordForm.controls.password.valid) {
			$(this.passwordField.nativeElement).popover('hide');
		} else {
			$(this.passwordField.nativeElement).popover('show');
		}
	}

	showTool() {
		if (!this.resetPasswordForm.controls.password.valid) {
			$(this.passwordField.nativeElement).popover('show');
		}
	}

	hideTool() {
		if (!this.resetPasswordForm.controls.password.valid) {
			$(this.passwordField.nativeElement).popover('hide');
		}
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
