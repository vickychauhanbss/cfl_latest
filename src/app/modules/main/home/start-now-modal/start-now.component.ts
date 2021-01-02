import { Component, Inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
//Import Libraries
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
import { VerifyComponent } from '../verify-model/verify-model.component';
import { Router } from "@angular/router";
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login-v2';

//Import services
import { loginService } from '../../../../shared/services/change-login/login.service';
import { loginRegisterService } from '../../../../shared/services/login-register-service/login-register.service';
import { MessageService } from '../../../../eventservice';
declare var $: any;
export interface DialogData {
	name: string;
	condition: string;
}

@Component({
	selector: 'app-start-now',
	templateUrl: './start-now.component.html',
	styleUrls: ['./start-now.component.css']
})


export class StartnowModal implements AfterViewInit {
	@ViewChild('passwordField', null) passwordField: ElementRef;
	registerForm: FormGroup;
	submitted = false;
	animal: string;
	name: string;
	errorMessage: any;
	emailPattern: any;
	userData: any;
	message: any;
	socialType: any;
	isLoading: boolean = false;
	constructor(
		public dialogRef: MatDialogRef<StartnowModal>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private formBuilder: FormBuilder,
		private loginService: loginService,
		private loginRegisterService: loginRegisterService,
		private spinner: NgxSpinnerService,
		private socialAuthService: AuthService,
		public dialog: MatDialog,
		private messageService: MessageService,
		private router: Router
	) {
		this.loginService.redirectPage.subscribe((bit) => {
			this.dismissModal();
		})
	}

	//On load function
	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			gender: ['', Validators.required],
			interest: ['', Validators.required],
			first_name: ['', [Validators.required, Validators.maxLength(12), Validators.pattern("^[a-zA-Z]+$"),]],
			last_name: ['', [Validators.required, Validators.maxLength(12), Validators.pattern("^[a-zA-Z]+$"),]],
			email: ['', Validators.required],
			password: ['', [Validators.required, Validators.pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,15}$"))]],
			acceptTerms: [false, Validators.requiredTrue]
		});
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
			placement: 'bottom',
			trigger: 'manual'
		})
	}

	pressPass() {
		if (this.registerForm.controls.password.valid) {
			$(this.passwordField.nativeElement).popover('hide');
		} else {
			$(this.passwordField.nativeElement).popover('show');
		}
	}

	showTool() {
		if (!this.registerForm.controls.password.valid) {
			$(this.passwordField.nativeElement).popover('show');
		}
	}

	hideTool() {
		if (!this.registerForm.controls.password.valid) {
			$(this.passwordField.nativeElement).popover('hide');
		}
	}


	get f() { return this.registerForm.controls; }


	dismissModal() {
		this.dialogRef.close();
	}

	//Register function
	onSubmit() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.registerForm.invalid) {
			return;
		}
		// display form values on success
		this.isLoading = true;
		this.loginRegisterService.Register_user(this.registerForm.value).subscribe((data: any) => {
			this.isLoading = false;
			if (data.status == 'error') {
				this.errorMessage = data.error;
			} else {
				this.dialogRef.close();
				this.verifyModal(this.registerForm.value.email, 'register')
				this.dialogRef.close();
			}
		}, error => {
			this.isLoading = false;
			this.errorMessage = error.error;
		})
	}

	// Social login
	public socialSignIn(socialPlatform: string) {
		this.dialogRef.close();
		let socialPlatformProvider;
		if (socialPlatform == "facebook") {
			this.socialType = 'facebook';
			socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
		} else if (socialPlatform == "google") {
			this.socialType = 'gmail';
			socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
		}
		this.socialAuthService.signIn(socialPlatformProvider).then(
			(userData) => {
				this.userData = userData;

				this.spinner.show();
				this.loginRegisterService.check_user({ 'email': userData.email }).subscribe((data: any) => {
					if (data.status == 'OK' && data.exists == 0) {
						this.spinner.hide();
						this.verifyModal(userData.email, 'socialLogin')
					} else {
						this.loginRegisterService.login_user({ email: userData.email, type: 'gmail' }).subscribe((data: any) => {
							this.spinner.hide();
							if (data.user.onboarding_complete == '1') {
								if (data.user.plan_type == 1 || data.user.plan_type == '') {
									if (data.user.gender == '1') {
										this.router.navigate(['home/trustplus/apm']);
									} else {
										this.router.navigate(['home/trustplus/apfi']);
									}
									// this.router.navigate(['home/trustplus/ap']);
								} else if (data.user.plan_type == 2) {
									if (data.user.gender == '1') {
										this.router.navigate(['home/centerstage/cupgm']);
									} else {
										this.router.navigate(['home/centerstage/cupgfi']);
									}
									this.router.navigate(['home/centerstage/cupg']);
								} else if (data.user.plan_type == 3) {
									this.router.navigate(['home/dashboard']);
								}
								// this.dialogRef.close();
							} else {
								this.spinner.hide();
								// this.dialogRef.close();
								this.messageService.login('hideHeaderFooter');
								localStorage.setItem("showNotification", 'true');
								this.router.navigate(['home/onboarding'])
							}
						}, error => {
							this.spinner.hide();
							this.errorMessage = error.error
						})
					}
					this.spinner.hide();
				}, error => {
					this.spinner.hide();
					this.errorMessage = error.error;
				})

				// Now sign-in with userData
				// ...
			}
		);
	}

	verifyModal(email, condition): void {
		const dialogRef = this.dialog.open(VerifyComponent, {
			data: { name: email, condition: condition }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (condition == 'socialLogin' && result) {
				var postData = {
					gender: result.gender,
					interest: result.interest,
					first_name: this.userData.name.split(' ')[0],
					last_name: this.userData.name.split(' ')[1],
					email: this.userData.email,
					type: 'gmail'
				}

				this.spinner.show();
				this.loginRegisterService.login_user(postData).subscribe((data: any) => {
					this.spinner.hide();

					if (data.user.onboarding_complete == '1') {
						if (data.user.plan_type == 1 || data.user.plan_type == '') {
							if (data.user.gender == '1') {
								this.router.navigate(['home/trustplus/apm']);
							} else {
								this.router.navigate(['home/trustplus/apfi']);
							}
						} else if (data.user.plan_type == 2) {
							if (data.user.gender == '1') {
								this.router.navigate(['home/centerstage/cupgm']);
							} else {
								this.router.navigate(['home/centerstage/cupgfi']);
							}
						} else if (data.user.plan_type == 3) {
							this.router.navigate(['home/dashboard']);
						}
						this.dialogRef.close();
					} else {
						this.spinner.hide();
						this.dialogRef.close();
						this.messageService.login('hideHeaderFooter');
						localStorage.setItem("showNotification", 'true');
						this.router.navigate(['home/onboarding'])
					}
				}, error => {
					this.spinner.hide();
					this.errorMessage = error.error
				})
			}
		});
	}


	goToLoginPage() {
		this.loginService.redirectlogin(true)
	}


	keyPress(event) {
		const pattern = /[a-zA-Z]/;   //[a-zA-Z]
		const inputChar = String.fromCharCode(event.charCode);
		if (!pattern.test(inputChar)) {
			// invalid character, prevent input
			event.preventDefault();
		}
	}
}
