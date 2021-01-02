import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dashboardService } from '../../../shared/services/dashboard/dashboard.service';
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
import { ToastrManager } from 'ng6-toastr-notifications';
import { HeaderService } from '../../../shared/services/header/header.service';


export interface DialogData {
	user_id: string;
	condition: string;
	name: string
}

@Component({
	selector: 'app-found-one',
	templateUrl: './fount-the-one.component.html',
	styleUrls: ['./fount-the-one.component.css']
})
export class FoundTheOneComponent implements OnInit {
	user_id: any;
	condition: any;
	name: any;
	private subscription;

	constructor(
		public dialogRef: MatDialogRef<FoundTheOneComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		public dashboardService: dashboardService,
		private spinner: NgxSpinnerService,
		private toastr: ToastrManager,
		public headerService: HeaderService
	) {

		this.user_id = data.user_id
		this.condition = data.condition
		this.name = data.name;


		this.subscription = this.headerService.closePopup.subscribe((bit) => {
			this.dialogRef.close();
		})
	}

	ngOnInit() { }

	dismissModal() {
		this.dialogRef.close();
	}


	sendNotification() {
		this.spinner.show();
		if (this.condition == 'userprofile') {
			this.dashboardService.found_one_user({ found_user: this.user_id }).subscribe((data: any) => {

				this.spinner.hide();
				this.dialogRef.close(true);
				if (data.status == 'OK') {
					var text = 'Yippe! ' + this.name + ' has been sent a "Found Love" request by you';
					this.toastr.successToastr(text, 'Success',
						{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
					);
				}
			}, error => {
				this.spinner.hide();
			})
		} else {
			this.dashboardService.confirm_found_one({ found_user: this.user_id }).subscribe((data: any) => {

				this.spinner.hide();
				if (data.status == 'OK') {
					this.toastr.successToastr('Yippe! Status changed to found someone Special!', 'Success', { enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
					);
				}
				this.dialogRef.close();
			}, error => {
				this.spinner.hide();
			})
		}
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
