import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmbedVideoService } from 'ngx-embed-video';
import { DomSanitizer } from '@angular/platform-browser';

export interface DialogData {
	video: any;
}

@Component({
	selector: 'app-video-model',
	templateUrl: './video-model.component.html',
	styleUrls: ['./video-model.component.css']
})


export class videoComponent {
	videoLink: any;
	thumbnail: any;
	checkVideoType: any;
	height = 0;
	width = 0;
	@ViewChild('modalBody', null) modalBody : ElementRef;
	constructor(
		public dialogRef: MatDialogRef<videoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private embedService: EmbedVideoService,
		private dom : DomSanitizer

	) {
		if (this.data.video.match(/^.*\b(vimeo.com|youtube)\b.*$/) === null) {
			this.checkVideoType = true;
			this.videoLink = this.data.video;
		} else {
			this.videoLink = this.dom.bypassSecurityTrustResourceUrl(this.data.video.replace(/https:\/\/vimeo.com/i,'https://player.vimeo.com/video')+'?&autoplay=1&loop=1');
			this.checkVideoType = false;
			// this.heighWi();
			// window.onresize = () => {
			// 	this.heighWi();
			// }
		}
	}

	heighWi() {
		// let width  = 700;
		// let height = 400;
		// if(window.orientation === 0 || window.orientation == undefined) {
		// 	if(window.outerWidth < 700) {
		// 		width =  window.outerWidth - 20;
		// 		const widthIns = 700/width;
		// 		height = height/widthIns;
		// 	}
		// } else {
		// 	if(window.outerHeight < 400) {
		// 		height =  window.outerHeight - 30;
		// 		const widthIns = 400/height;
		// 		width = width/widthIns;
		// 	}
		// }
		// this.width = width;
		// this.height = height;
	}

	dismissModal() {
		this.dialogRef.close();
	}

	playStop() {
		let audioPlayer = <HTMLVideoElement>document.getElementById('VideoPlay');
		audioPlayer.pause()
		audioPlayer.play();
	}
}