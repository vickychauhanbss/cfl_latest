import { Component, Inject } from '@angular/core';
//Import Libraries
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//Import services
import { loginRegisterService } from '../../../../shared/services/login-register-service/login-register.service';

export interface DialogData {
}

@Component({
	selector: 'app-forgot-model',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.css']
})


export class ForgotPasswordComponent {
	email: any;
	errorMessage: any;
	forgotPasswordForm: FormGroup;
	submitted = false;
	constructor(
		public dialogRef: MatDialogRef<ForgotPasswordComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private formBuilder: FormBuilder,
		private loginRegisterService: loginRegisterService,
		public toastr: ToastrManager,
		private spinner: NgxSpinnerService
	) { }

	ngOnInit() {
		this.forgotPasswordForm = this.formBuilder.group({
			email: ['', Validators.required],
		});
	}

	get f() { return this.forgotPasswordForm.controls; }

	dismissModal() {
		this.dialogRef.close();
	}

	//Forgot Password function
	onSubmit() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.forgotPasswordForm.invalid) {
			return;
		}
		// display form values on success
		this.spinner.show();
		this.loginRegisterService.forgot_password(this.forgotPasswordForm.value).subscribe((data: any) => {

			this.toastr.successToastr(data.result.msg, 'Success',
				{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
			);
			this.dialogRef.close();
			this.spinner.hide();
		}, error => {
			this.spinner.hide();
			this.errorMessage = error.error;
		})
	}
}