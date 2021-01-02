import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
import { HeaderService } from '../../../shared/services/header/header.service';

export interface DialogData {
	image: any;
	string: any;
	height: any;
	width: any;
}

@Component({
	selector: 'app-crop-banner',
	templateUrl: './crop-banner.component.html',
	styleUrls: ['./crop-banner.component.css']
})


export class CropbannerComponent {
	IntersetIcons: any = [];
	imageChangedEvent: any;
	croppedImage: any;
	ratio1: any;
	ratio2: any;
	imageHeigth: any;
	imageWidth: any;
	circleImage = false;
	showCropper = false;
	private subscription;



	constructor(
		public dialogRef: MatDialogRef<CropbannerComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		public dialog: MatDialog,
		private spinner: NgxSpinnerService,
		public headerService: HeaderService


	) {
		this.imageHeigth = data.height;
		this.imageWidth = data.width;

		if (data.string == 'banner') {
			this.ratio1 = 6.088;
			this.ratio2 = 1;
			this.circleImage = false;

		} else if (data.string == "profile") {
			this.ratio1 = 1;
			this.ratio2 = 1;
			this.circleImage = true;

		} else if (data.string == 'gallery') {
			this.ratio1 = 1;
			this.ratio2 = 1;
			this.circleImage = false;
		}
		this.imageChangedEvent = data.image;


		this.subscription = this.headerService.closePopup.subscribe((bit) => {
			this.dialogRef.close();
		})
	}

	ngOnInit() {
		this.spinner.show();
	}

	imageCropped(event: ImageCroppedEvent) {
		this.croppedImage = event.file;
	}

	imageLoaded() {
		this.spinner.hide();
		this.showCropper = true;
	}
	cropperReady() {
		// cropper ready
	}
	loadImageFailed() {
		// show message
	}

	dismissModal(image) {
		this.dialogRef.close(image);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}