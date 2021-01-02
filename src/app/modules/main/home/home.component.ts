import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';

//Import libraries
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { trigger, animate, style, transition } from '@angular/animations';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialog } from '@angular/material/dialog';
// import { PlatformLocation } from '@angular/common';

//Import services
import { MessageService } from '../../../eventservice';
import { HeaderService } from '../../../shared/services/header/header.service';
import { footerService } from '../../../shared/services/footer/footer.service';
import { homeService } from '../../../shared/services/home/home.service';
import { appConfig } from '../../../shared/services/app.config';

//Import Components
import { StartnowModal } from '../home/start-now-modal/start-now.component';
import { videoComponent } from './video-model/video-model.component';
import { DownloadComponent } from './download-guide/download-guide.component';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	animations: [
		trigger('fade', [
			transition('void => *', [
				style({ opacity: 0 }),
				animate(2000, style({ opacity: 1 }))
			])
		])
	]
})
export class HomeComponent implements OnInit, AfterViewInit {
	@ViewChild('scrollToMe', { static: false }) scrollToMe: ElementRef;
	submitted = false;
	homeData: any;
	imageUrl: any;
	showRed = false;
	showText = false;
	charLimit = 200;
	downloadGuideForm: FormGroup;
	currentUesr = JSON.parse(localStorage.getItem("loginUser"));
	carouselOptions = {
		margin: 100,
		nav: true,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1,
				nav: true,
				loop: true

			},
			600: {
				items: 1,
				nav: true,
				loop: true

			},
			1000: {
				items: 1,
				nav: true,
				loop: true
			},
			1500: {
				items: 1,
				nav: true,
				loop: true
			}
		}
	}
	bucketUrl = appConfig.bucketUrl;

	constructor(
		public dialog: MatDialog,
		private headerService: HeaderService,
		private messageService: MessageService,
		private router: Router,
		private route: ActivatedRoute,
		public toastr: ToastrManager,
		public footerService: footerService,
		public homeService: homeService,
		private spinner: NgxSpinnerService,
		private elementRef: ElementRef,
	) {
		this.imageUrl = appConfig.imagesUrl
	}

	ngOnInit() {
		if (localStorage.getItem('blog') == null) {
			window.scrollTo(0, 0);
		}
		this.headerService.loggedIn(false);
		this.footerService.hidefooter(false);
		this.spinner.show();
		if (document.getElementById("toastr-container") != null) {
			document.getElementById("toastr-container").style.display = "bloack";
		}
		if (this.currentUesr != null) {
			if (this.currentUesr.onboarding_complete == '1') {
				if (this.currentUesr.gender == '1') {
					this.router.navigate(['home/trustplus/apm'])
				} else {
					this.router.navigate(['home/trustplus/apfi'])
				}
			} else {
				this.router.navigate(['home/onboarding'])
				this.messageService.login('hideHeaderFooter');
			}
			return false;
		}

		if (localStorage.getItem('blog') == null) {
			this.spinner.show();
			this.homeService.get_home_data().subscribe((data: any) => {
				this.spinner.hide();
				this.homeData = data.data;
				this.loadScript();
			}, error => {
				this.spinner.hide();
			})
		}



		setTimeout(() => {
			if (this.route.snapshot.paramMap.get('isOtherPage')) {
				if (this.route.snapshot.paramMap.get('isOtherPage') == 'Community') {
					let el = document.getElementById('community');
					el.scrollIntoView({ behavior: "smooth" });

				} else {
					let el = document.getElementById('about');
					el.scrollIntoView({ behavior: "smooth" });

				}
			}
			this.router.navigate(['home', {}]);
		}, 600)

	}

	ngAfterViewInit() {
		if (localStorage.getItem('blog') !== null) {
			let homeData = localStorage.getItem('homeData');
			this.homeData = JSON.parse(homeData)
			setTimeout(() => {
				this.scrollToMe.nativeElement.scrollIntoView()
				this.spinner.hide();
				localStorage.removeItem('blog')
			}, 200)
		}
	}

	loadScript() {
		// var s = document.createElement("script");
		// s.type = "text/javascript";
		// s.src = "https://app.kartra.com/optin/XRbqkfp9QA9c";
		// this.elementRef.nativeElement.appendChild(s);
	}

	get f() { return this.downloadGuideForm.controls; }

	openStartNowModal(): void {
		this.dialog.open(StartnowModal, {
			disableClose: true
		});
	}

	videoModal(link): void {
		let audioPlayer = <HTMLVideoElement>document.getElementById('homeVideo');
		audioPlayer.pause()
		this.dialog.open(videoComponent, {
			data: { video: link }
		});
	}

	showexpend() {
		this.showRed = this.showRed == false ? true : false
	}


	downloadGuide(file): void {
		this.dialog.open(DownloadComponent, {
			data: { file: file }
		});
	}


	//subscribe function
	onSubmit(formDirective: FormGroupDirective) {
		this.submitted = true;
		// stop here if form is invalid
		if (this.downloadGuideForm.invalid) {
			return;
		}
		//display form values on success
		this.spinner.show();
		this.homeService.download_guide(this.downloadGuideForm.value).subscribe((data: any) => {
			this.spinner.hide();
			this.submitted = false;
			this.downloadGuideForm.reset();
			this.downloadGuide(data.file);

		}, error => {
			this.spinner.hide();
		})
	}

	showDiv() {
		let limit = this.charLimit == 200 ? 1000 : 200;
		this.charLimit = limit;
	}

	goToDetailPage(blog) {
		localStorage.setItem('homeData', JSON.stringify(this.homeData))
		localStorage.setItem('blog', 'true')
		this.router.navigate(['home/crazyDetail', { 'id': blog.id }]);
	}

	goToLink(link) {
		window.open(link);
	}

}
