import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { homeService } from '../../../shared/services/home/home.service';
import { MessageService } from '../../../eventservice';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
import { footerService } from '../../../shared/services/footer/footer.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
	selector: 'app-just-join',
	templateUrl: './just-join.component.html',
	styleUrls: ['./just-join.component.css']
})

export class JustJoinComponent implements OnInit, AfterViewInit {
	just_join: any = [];
	page_title: any;
	userId: any;
	@ViewChild('interSectWidth',null) interSectWidth : ElementRef;
	constructor(
		public homeService: homeService,
		private messageService: MessageService,
		private toastr: ToastrManager,
		private spinner: NgxSpinnerService,
		private footerService: footerService,
		private dom : DomSanitizer
	) {
		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr);
		this.userId = userData.id
	}
	

	ngOnInit() {
		window.scrollTo(0, 0);
		
	}

	ngAfterViewInit() {
		this.messageService.login('showHeaderSubscription');
		this.footerService.hidefooter(true);
		this.spinner.show();
		this.homeService.get_help_and_support_data({ 'user_id': this.userId }).subscribe((data: any) => {
			this.spinner.hide();
			let width  = 700;
			let height = 400;
			if(this.interSectWidth.nativeElement.clientWidth) {
				width =  this.interSectWidth.nativeElement.clientWidth;
				const widthIns = 700/width;
				height = height/widthIns;
			}
			this.just_join = data.data.just_join.data.map(x=>{
				x['matched'] = this.matchRegex(x.video_link);
				x['videoFarme'] = this.dom.bypassSecurityTrustResourceUrl(x.video_link.replace(/https:\/\/vimeo.com/i,'https://player.vimeo.com/video'));
				return x;
			});
			this.page_title = data.data.just_join.page_title;
		}, error => {
			this.spinner.hide();
		})
	}

	matchRegex(str) {
		return str.match(/^.*\b(vimeo.com|youtube)\b.*$/);
	}
}