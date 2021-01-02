import { Component } from '@angular/core';
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
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from "@angular/router";
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";
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
	isLoading: boolean = true;
	constructor(
		private headerService: HeaderService,
		public toastr: ToastrManager,
		private homeService: homeService,
		private loginRegisterService: loginRegisterService,
		private router: Router,
		public spinner: NgxSpinnerService,
		private _location: Location,
		private _socket: SocketService


	) {
		this.headerService.notify.subscribe((bit) => {
			this.toastr.successToastr(bit.notification.body, 'Success!');
		})

		this.updateActivity();

		new Idle()
			.whenNotInteractive()
			//In Minutes.
			.within(30)
			.do(() => {
				console.warn('You are going to logout.'); this.loginRegisterService.logout();
				this.router.navigate(['home']);
			})
			.start();

		//Check if user is logged in or not
		if (localStorage.getItem("loginUser") != null) {
			let userInfo = JSON.parse(localStorage.getItem("loginUser"));
			this.loginRegisterService.loggedInUserFetchData().subscribe(x=>{
				if(x.user) {
					localStorage.setItem("loginUser", JSON.stringify(x.user));
					this.headerService.profileDataUpdated.next(x.user);
				}
			});
			//Join Chat by using USER ID.
			this._socket.joinChat(userInfo.id);
		}

		//on login connect the user with socket
		this.loginRegisterService.onLogin.subscribe(user => {
			let userInfo = JSON.parse(localStorage.getItem("loginUser"));
			this._socket.joinChat(userInfo.id);
		})
	}

	ngOnInit() {
		setInterval(()=>{
			this.updateActivity()
		},10000);
		// this.subscription = timer(0, 10000).pipe(
		// 	switchMap(() => this.updateActivity())
		// ).subscribe(result => this.statusText = result);

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
				}
				else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
					this.spinner.hide();
				}
			});
	}

	updateActivity() {
		console.log('I am calling here');
		if (localStorage.getItem("loginUser") != null) {
			var currentTime = moment().format();
			localStorage.setItem("SaveTime", JSON.stringify(currentTime));
			return this.homeService.checkdata('end').subscribe();
		}
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
