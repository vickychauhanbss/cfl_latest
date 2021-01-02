import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeaderService } from '../../../shared/services/header/header.service';

export interface DialogData {
	condition: string;
}

@Component({
	selector: 'app-show-message',
	templateUrl: './show-message.component.html',
	styleUrls: ['./show-message.component.css']
})


export class showMessageComponent {
	text: any;
	private subscription;
	constructor(
		public dialogRef: MatDialogRef<showMessageComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		public headerService: HeaderService
	) {
		this.text = data.condition;
		this.subscription = this.headerService.closePopup.subscribe((bit) => {
			this.dialogRef.close();
		})
	}

	ngOnInit() {
	}

	dismissModal() {
		this.dialogRef.close();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}