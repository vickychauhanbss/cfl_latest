import { Component, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { userService } from '../../../shared/services/user/user.service';
//Import Api loader
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
import { ToastrManager } from 'ng6-toastr-notifications';
import { ConfirmationComponent } from '../../main/home/confirmation-model/confirmation-model.component';
import { CropbannerComponent } from '../crop-banner/crop-banner.component';
import { showMessageComponent } from '../show-message/show-message.component';
import { HeaderService } from '../../../shared/services/header/header.service';

export interface DialogData {
	image: any;
}

@Component({
	selector: 'app-cover-banner-modal',
	templateUrl: './cover-banner-modal.component.html',
	styleUrls: ['./cover-banner-modal.component.css']
})

export class coverBannerComponent {
	@ViewChild('filesc', { static: false }) myInputVariable: ElementRef;
	coverImage: File = null;
	showCoverImage: any;
	userId: any;
	showError: any;
	coverBanner: any = [];
	private subscription;

	constructor(
		public dialogRef: MatDialogRef<coverBannerComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		public dialog: MatDialog,
		private spinner: NgxSpinnerService,
		private userService: userService,
		private toastr: ToastrManager,
		public headerService: HeaderService

	) {
		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr)
		this.userId = userData.id;

		this.subscription = this.headerService.closePopup.subscribe((bit) => {
			this.dialogRef.close();
		})
	}

	ngOnInit() {
		// this.spinner.show();
		this.userService.get_user_banner({ 'user_id': this.userId }).subscribe((data: any) => {
			this.spinner.hide();
			if (data.status == 'OK') {
				this.coverBanner = data.records
			}
		}, error => {
			this.spinner.hide();
		})
	}


	chooseCoverImages(fileInput: any) {
		this.showError = '';
		let windowIns : any = window;
		var _URL = windowIns.URL || windowIns.webkitURL;
		var file, img;
		if ((file = <File>fileInput.target.files[0])) {
			var mimeType = file.type;
			if (mimeType.split('/')[1] == 'gif' || mimeType.split('/')[1] == 'svg+xml') {
				this.showError = "Allowed Image extensions: jpeg, jpg, png."
				return;
			}
	
			if (mimeType.match(/image\/*/) == null) {
				this.showError = "Allowed Image extensions: jpeg, jpg, png. "
				return;
			}
	
			img = new Image();
			var objectUrl = _URL.createObjectURL(file);
			img.onload =  () => {
				if (img.width < 1350 && img.height < 650) {
					this.showError = "Banner dimension should be greater than or equal to 1350X650.";

				} else {
					const dialogRef = this.dialog.open(CropbannerComponent, {
						data: { image: fileInput, string: 'banner', width: img.width, height: img.height }
					});
					dialogRef.afterClosed().subscribe(result => {
						if (result) {
							const formData = new FormData();
							formData.append('image', result);
							formData.append('type', 'banner_img');
							formData.append('user_id', this.userId);
							this.spinner.show();
							this.userService.change_gallery(formData).subscribe((data: any) => {
								if (data.type === 4) {
									this.myInputVariable.nativeElement.value = "";
									this.spinner.hide();
									if (data.body.status == "OK") {
										this.dismissModal(data.body.inserted_data);
										this.showPopup('Banner');
									}
								}
							}, error => {
								this.spinner.hide();
							})
						}
					})
				}
				_URL.revokeObjectURL(objectUrl);
			};
			img.src = objectUrl;
		}
	}

	showPopup(text) {
		this.dialog.open(showMessageComponent, {
			data: { condition: text }
		});
	}


	dismissModal(image) {
		this.dialogRef.close(image);
	}

	activeBanner(image) {
		let default_id = image.default_id != null ? image.default_id : null;
		let id = image.id != null ? image.id : null;
		this.spinner.show();
		this.userService.active_banner({ 'user_id': this.userId, 'type': image.type, 'default_id': default_id, 'id': id }).subscribe((data: any) => {

			this.spinner.hide();
			this.toastr.successToastr('Banner activated successfully.', 'Success',
				{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
			);
			this.dismissModal(image)
		}, error => {
			this.spinner.hide();
		})
	}

	deleteImage(index, item, string) {
		const dialogRef = this.dialog.open(ConfirmationComponent, {
			data: { name: 'deleteImage', string: string }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result == 'delete') {
				this.spinner.show();
				this.userService.delete_image_video({ 'id': item.id, 'user_id': this.userId, 'type': 'image' }).subscribe((data: any) => {
					this.spinner.hide();
					if (data.status == 'OK') {
						this.coverBanner.splice(index, 1);
					}
				}, error => {
					this.spinner.hide();
				})
			}
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

