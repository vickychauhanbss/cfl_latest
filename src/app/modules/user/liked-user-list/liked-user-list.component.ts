import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeaderService } from '../../../shared/services/header/header.service';
declare var require: any

export interface DialogData {
	name: string;
}

@Component({
	selector: 'app-liked-user-list',
	templateUrl: './liked-user-list.component.html',
	styleUrls: ['./liked-user-list.component.css']
})

export class UserlistComponent {
	userList: any = [];
	private subscription;
	defaultImage = require('../../../../assets/chat/image-loader.gif');


	constructor(
		public dialogRef: MatDialogRef<UserlistComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		public dialog: MatDialog,
		public headerService: HeaderService

	) {
		this.userList = data;
		this.subscription = this.headerService.closePopup.subscribe((bit) => {
			this.dialogRef.close();
		})
	}
	ngOnInit() { }

	goToUserProfile(users) {
		this.dialogRef.close(users);
	}
	dismissModal(users) {
		this.dialogRef.close('');
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

}