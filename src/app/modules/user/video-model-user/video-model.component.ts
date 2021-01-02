import { Component, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeaderService } from '../../../shared/services/header/header.service';
import { EmbedVideoService } from 'ngx-embed-video';
import { appConfig } from 'src/app/shared/services/app.config';
import { DomSanitizer } from '@angular/platform-browser';
export interface DialogData {
	video: any
}

@Component({
	selector: 'app-video-model',
	templateUrl: './video-model.component.html',
	styleUrls: ['./video-model.component.css']
})


export class videoUserComponent {
	videoLink: any;
	checkVideoType: any = false;
	private subscription;
	image : string ='';
	bucketUrl = appConfig.bucketUrl;
	routeUrl = appConfig.apiUrl;
	constructor(
		public dialogRef: MatDialogRef<videoUserComponent>,
		public headerService: HeaderService,
		private embedService: EmbedVideoService,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private dom : DomSanitizer
		) {
			
	}

	ngOnInit() {
		if (this.data.video.path.match(/^.*\b(vimeo.com|youtube)\b.*$/) != null) {
			this.checkVideoType = false;
			this.videoLink = this.dom.bypassSecurityTrustResourceUrl(this.data.video.path.replace(/https:\/\/vimeo.com/i,'https://player.vimeo.com/video')+'?&autoplay=1&loop=1');
			// this.videoLink = this.embedService.embed(this.data.video.path, {
			// 	query: { autoplay: 1 }, attr: { width: 700, height: 400, allow: "autoplay" }
			// });
		} else {
			this.checkVideoType = true;
			this.videoLink = this.bucketUrl+''+this.data.video.path;
			if(this.data.video.name) {
				var test =  this.data.video.name.split('/');
				const test2 =  test.join('*');
				let actualDimensionTemp = this.data.video.path_dimension.split('x');
				const actualWidth = parseInt(actualDimensionTemp[0]);
				const actualHeight = parseInt(actualDimensionTemp[1]);
				const mod = actualWidth/300;
				const height = parseInt((actualHeight/mod).toFixed(0));
				this.image = this.routeUrl+'get-resize-image/'+test2+'/300/'+height;
			}
		}
		this.subscription = this.headerService.closePopup.subscribe((bit) => {
			this.dialogRef.close();
		})
	}

	dismissModal() {
		this.dialogRef.close();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}