import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeaderService } from '../../../shared/services/header/header.service';

export interface DialogData {
	name: string;
}

@Component({
	selector: 'app-philipines-state',
	templateUrl: './philipines-state.component.html',
	styleUrls: ['./philipines-state.component.css']
})

export class PhilipinesComponent {
	Lists: any = [];
	private subscription;
	constructor(
		public dialogRef: MatDialogRef<PhilipinesComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		public dialog: MatDialog,
		public headerService: HeaderService

	) {
		this.Lists = data.name;
		this.Lists.sort(function(a, b){
			if(a.name < b.name) { return -1; }
			if(a.name > b.name) { return 1; }
			return 0;
		})
		console.log('this.Lists',this.Lists);
		this.subscription = this.headerService.closePopup.subscribe((bit) => {
			this.dialogRef.close();
		})
	}

	ngOnInit() {
	}

	dismissModal(users) {
		this.dialogRef.close(users);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}