import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { HeaderService } from '../../../shared/services/header/header.service';

export interface DialogData {
	name: string;
}

@Component({
	selector: 'plan-validation-popup',
	templateUrl: './plan-validation-popup.component.html',
	styleUrls: ['./plan-validation-popup.component.css']
})


export class PlanValidationPopup {
	text: any
	private subscription;

	constructor(public dialogRef: MatDialogRef<PlanValidationPopup>,
		public headerService: HeaderService,
		@Inject(MAT_DIALOG_DATA) public data: DialogData, private router: Router,) {

		this.text = data.name;
		this.subscription = this.headerService.closePopup.subscribe((bit) => {
			this.dialogRef.close();
		})
	}

	ngOnInit() {
	}

	dismissModal() {
		this.dialogRef.close();
	}

	goToUpgradeNowPage() {
		this.dialogRef.close('closedOther');
		let currentUesr = JSON.parse(localStorage.getItem("loginUser"));
		if (currentUesr.gender == '1') {
			this.router.navigate(['home/trustplus/apm']);
		} else {
			this.router.navigate(['home/trustplus/apfi']);
		}
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}