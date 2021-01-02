import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeaderService } from '../../../shared/services/header/header.service';


export interface DialogData {
	score: string;
}

@Component({
	selector: 'app-trust-score',
	templateUrl: './trust-score-popup.component.html',
	styleUrls: ['./trust-score-popup.component.css']
})
export class TrustScoreComponent implements OnInit {
	scoreNumber: any;
	private subscription;

	constructor(
		public dialogRef: MatDialogRef<TrustScoreComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		public headerService: HeaderService

	) {

		this.scoreNumber = data.score;
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
