import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dashboardService } from '../../../shared/services/dashboard/dashboard.service';
import { HeaderService } from '../../../shared/services/header/header.service';
import { DomSanitizer } from '@angular/platform-browser';

export interface DialogData {
	check: string;
	video: any
}

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
	checkPage: any;
	videoUrl: any;
	showNextPopup: boolean = false;
	postData: any;
	private subscription;
	checkVideoType: any;
	height = 0;
	width = 0;

	constructor(
		public dialogRef: MatDialogRef<WelcomeComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		public dashboardService: dashboardService,
		public headerService: HeaderService,
		public dom : DomSanitizer
	) {
		this.checkPage = data.check;
		
		this.subscription = this.headerService.closePopup.subscribe((bit) => {
			this.dialogRef.close();
		})
		if (this.data.video.match(/^.*\b(vimeo.com|youtube)\b.*$/) === null) {
			this.checkVideoType = true;
			let video = data.video == '' ? 'assets/home-img/client-video-old.mp4' : data.video;
			this.videoUrl = video;
		} else {
			this.videoUrl = this.dom.bypassSecurityTrustResourceUrl(this.data.video.replace(/https:\/\/vimeo.com/i,'https://player.vimeo.com/video'));
			this.checkVideoType = false;
			this.heighWi();
			window.onresize = () => {
				this.heighWi();
			}
		}
	}

	ngOnInit() {
		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr);

		if (this.checkPage == 'userprofile') {
			this.postData = {
				'page': 'profile_visit',
				'user_id': userData.id
			}
		} else {
			this.postData = {
				'page': 'dashboard_visit',
				'user_id': userData.id
			}
		}

		this.dashboardService.page_visit_user(this.postData).subscribe((data: any) => {
			if (this.checkPage == 'userprofile') {
				userData.profile_visit = '0';
			} else {
				userData.dashboard_visit = '0';
			}
			localStorage.setItem("loginUser", JSON.stringify(userData));

		})
	}

	heighWi() {
		let width  = 700;
		let height = 400;
		if(window.orientation === 0 || window.orientation == undefined) {
			if(window.outerWidth < 700) {
				width =  window.outerWidth - 20;
				const widthIns = 700/width;
				height = height/widthIns;
			}
		} else {
			if(window.outerHeight < 400) {
				height =  window.outerHeight - 30;
				const widthIns = 400/height;
				width = width/widthIns;
			}
		}
		this.width = width;
		this.height = height;
	}

	dismissModal(next) {
		if (next) {
			this.showNextPopup = true
		} else {
			this.dialogRef.close();
		}
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
