import { Component, Inject } from '@angular/core';

//Import Libraries
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;

//Import services
import { homeService } from '../../../../shared/services/home/home.service';

export interface DialogData {
	name: string;
}

@Component({
	selector: 'app-subscribe-modal',
	templateUrl: './subscribe-modal.component.html',
	styleUrls: ['./subscribe-modal.component.css']
})

export class SubscribeComponent {
	subscribeForm: FormGroup;
	submitted = false;
	firstNamePattern: any;
	errorMessage: any;
	constructor(
		public dialogRef: MatDialogRef<SubscribeComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private formBuilder: FormBuilder,
		private homeService: homeService,
		private toastr: ToastrManager,
		private spinner: NgxSpinnerService
	) {
		this.firstNamePattern = "^[a-zA-Z ]{1,24}";
	}

	ngOnInit() {
		this.subscribeForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.pattern(this.firstNamePattern)]],
			email: ['', Validators.required],
			acceptTerms: [false, Validators.requiredTrue]
		});
	}

	get f() { return this.subscribeForm.controls; }


	dismissModal() {
		this.dialogRef.close();
	}

	//subscribe function
	onSubmit() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.subscribeForm.invalid) {
			return;
		}
		// display form values on success
		this.spinner.show();
		this.homeService.subscribe_user(this.subscribeForm.value).subscribe((data: any) => {

			this.spinner.hide();
			if (data.status == 1) {
				this.toastr.successToastr('Newsletter subscribe successfully.', 'Success!');
				this.dialogRef.close();
			} else {
				this.errorMessage = 'This email address already subscribed';
			}
		}, error => {
			this.spinner.hide();
		})
	}

}
