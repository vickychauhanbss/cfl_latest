import { Component, AfterViewInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Validators } from '@angular/forms';
import { HeaderService } from '../../src/app/shared/services/header/header.service';
import { homeService } from '../../src/app/shared/services/home/home.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { loginRegisterService } from '../../src/app/shared/services/login-register-service/login-register.service';
import * as moment from 'moment';
import { Idle } from 'idlejs/dist';
import { Router, Event as RouterEvent, NavigationStart, NavigationCancel, NavigationEnd, NavigationError } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from "@angular/common";
import { SocketService } from './shared/services/socket/socket.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	message;
	subscription: Subscription;
	statusText: any;
	timeout: any
	constructor(
		private headerService: HeaderService,
		public toastr: ToastrManager,
		private homeService: homeService,
		private loginRegisterService: loginRegisterService,
		private router: Router,
		private spinner: NgxSpinnerService,
		private _location: Location,
		private _socket: SocketService


	) {
		this.headerService.notify.subscribe((bit) => {
			this.toastr.successToastr(bit.notification.body, 'Success!');
		})

		this.router.events.subscribe((e: RouterEvent) => {
			this.navigationInterceptor(e);
		})

		this.headerService.activeStartEnd.subscribe((bit) => {
			console.log('start activity')
			this.updateActivity()
		})


		const idle = new Idle()
			.whenNotInteractive()
			//In Minutes.
			.within(30)
			.do(() => { console.warn('You are going to logout.'); this.loginRegisterService.logout(); this.router.navigate(['home']); })
			.start();

		//Check if user is logged in or not
		if(localStorage.getItem("loginUser") != null) {
			let userInfo = JSON.parse(localStorage.getItem("loginUser"));
			//Join Chat by using USER ID.
			this._socket.joinChat(userInfo.id);
		}

		//on login connect the user with socket
		this.loginRegisterService.onLogin.subscribe(user=> {
			let userInfo = JSON.parse(localStorage.getItem("loginUser"));
			this._socket.joinChat(userInfo.id);
		})
	}


	navigationInterceptor(event: RouterEvent): void {
		if (event instanceof NavigationStart && this._location.path() != '/home/onboarding') {
			this.spinner.show();
		}
		if (event instanceof NavigationEnd) {
			this.spinner.hide();
		}

		// Set loading state to false in both of the below events to hide the spinner in case a request fails
		if (event instanceof NavigationCancel) {
			this.spinner.hide();
		}
		if (event instanceof NavigationError) {
			this.spinner.hide();
		}
	}

	ngOnInit() {
		this.subscription = timer(0, 10000).pipe(
			switchMap(() => this.updateActivity())
		).subscribe(result => this.statusText = result);

		var saveTime = localStorage.getItem("SaveTime")
		let savedTime = JSON.parse(saveTime);
		var a = moment(savedTime)//now
		var b = moment()
		var duration = b.diff(a, 'minutes');
		if (duration > 5) {
			this.homeService.checkdata('start');
		}
	}


	ngAfterViewInit() {
		this.router.events
			.subscribe((event) => {
				if (event instanceof NavigationStart && this._location.path() != '/home/onboarding') {
					this.spinner.show();
					// this.loading = true;
				}
				else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
					this.spinner.hide();
				}
			});
	}

	updateActivity() {
		var currentTime = moment().format();
		localStorage.setItem("SaveTime", JSON.stringify(currentTime));
		return this.homeService.checkdata('end');
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	title = 'crazy-filipino-love';
	checked = false;
	indeterminate = false;
	labelPosition = 'after';
	disabled = false;

	emailFormControl = new FormControl('', [
		Validators.required,
		Validators.email,
	]);
	favoriteSeason: string;
	seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
}
