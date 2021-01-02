import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
	percentage: number;
}


@Component({
	selector: 'app-uploadvideoprogress',
	templateUrl: './uploadvideoprogress.component.html',
	styleUrls: ['./uploadvideoprogress.component.css']
})
export class UploadvideoprogressComponent {
	
	constructor(
		public dialogRef: MatDialogRef<UploadvideoprogressComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
	) { }

	cancelUploading() {
		this.dialogRef.close();
	}
}
