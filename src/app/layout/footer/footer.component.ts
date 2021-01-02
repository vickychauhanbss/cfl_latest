import { Component, OnInit, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

//Import Libraries
// import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';

//Import Services
import { footerService } from '../../shared/services/footer/footer.service';
import { homeService } from '../../shared/services/home/home.service';
// import { Location } from "@angular/common";

//Import Components
import { SubscribeComponent } from '../../modules/main/home/subscribe-modal/subscribe-modal.component';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
	// animal: string;
	name: string;
	hideFooter: any;
	homeData: any;
	private subscription;

	constructor(
		public dialog: MatDialog,
		private footerService: footerService,
		private homeService: homeService,
		// private spinner: NgxSpinnerService,
		private router: Router,
		// private _location: Location,
		private elementRef: ElementRef,
		// private renderer: Renderer2


	) {
		this.subscription = this.footerService.hideFooter.subscribe((msg) => {
			this.hideFooter = msg;
			if (localStorage.getItem("loginUser") == null) {
				this.loadScript()
			}
		})
	}

	ngOnInit() {
		this.homeService.get_home_data().subscribe(x=>{
			this.homeData = x.data;
		})
	}


	loadScript() {
		// if (localStorage.getItem("loginUser") == null) {
		// 	var s = document.createElement("script");
		// 	s.type = "text/javascript";
		// 	s.src = "https://app.kartra.com/optin/8vUADaTRxNrK";
		// 	this.elementRef.nativeElement.appendChild(s);
		// }
	}

	scroll(string) {
		if (string == 'about') {
			let el = document.getElementById('about');
			if (el) {
				el.scrollIntoView({ behavior: "smooth" });
			} else {
				this.router.navigate(['home', { 'isOtherPage': string }])
			}
		} else {
			let el = document.getElementById('community');
			if (el) {
				el.scrollIntoView({ behavior: "smooth" });
			} else {
				this.router.navigate(['home', { 'isOtherPage': string }])
			}
		}
	}

	subscribe_modal(): void {
		this.dialog.open(SubscribeComponent, {
			data: null
		});
	}

	redirectPage(string) {
		this.router.navigate([string])
	}


	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}