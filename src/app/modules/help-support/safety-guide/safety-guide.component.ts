import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { homeService } from '../../../shared/services/home/home.service';
import { MessageService } from '../../../eventservice';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
import { footerService } from '../../../shared/services/footer/footer.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
	selector: 'app-safety-guide',
	templateUrl: './safety-guide.component.html',
	styleUrls: ['./safety-guide.component.css']
})
export class SafetyGuideComponent implements AfterViewInit {
	safety_guide = {
		text: '',
		heading1: '',
		description1: '',
		video: null,
		heading2: '',
		description2: '',
		matched: false
	}
	userId: any;
	@ViewChild('interSectWidth', null) interSectWidth: ElementRef;
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

	ngAfterViewInit() {
		this.messageService.login('showHeaderSubscription');
		this.footerService.hidefooter(true);
		this.spinner.show();
		this.homeService.get_help_and_support_data({ 'user_id': this.userId }).subscribe((data: any) => {
			this.spinner.hide();
			this.safety_guide = data.data.safety_guide;
			this.spinner.hide();
			if(this.matchRegex(data.data.safety_guide.video)) {
				this.safety_guide.matched = true;
				this.safety_guide.video = this.dom.bypassSecurityTrustResourceUrl(data.data.safety_guide.video.replace(/https:\/\/vimeo.com/i,'https://player.vimeo.com/video'));
			}
		}, error => {
			this.spinner.hide();
		})
	}

	matchRegex(str) {
		return str.match(/^.*\b(vimeo.com|youtube)\b.*$/);
	}

	ngOnInit() {
		window.scrollTo(0, 0);
	}
}
