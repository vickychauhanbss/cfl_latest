import { Component, OnInit, ViewChild, ElementRef,AfterViewInit } from '@angular/core';

// Import Libraries
import { Router } from "@angular/router";
import { Options } from 'ng5-slider';
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialog } from '@angular/material/dialog';

//Import Interface
import { User } from './../../../interfaces/user';
import { ChatListResponse } from './../../../interfaces/chat-list-response';
import { Message } from './../../../interfaces/message';
import { MessagesResponse } from './../../../interfaces/messages-response';


//Import services
import { MessageService } from '../../../eventservice';
import { footerService } from '../../../shared/services/footer/footer.service';
import { centerStageService } from '../../../shared/services/centerstage/centerstage.service';
import { dashboardService } from '../../../shared/services/dashboard/dashboard.service';
import { HeaderService } from '../../../shared/services/header/header.service';
import { ChatService } from '../../../shared/services/chat/chat.service';
import { SocketService } from '../../../shared/services/socket/socket.service';
import { DataShareService } from '../../../shared/services/utils/data-share.service';

//import Component
import { PlanValidationPopup } from '../plan-validation-popup/plan-validation-popup.component';
import { videoUserComponent } from '../video-model-user/video-model.component';
import { PhilipinesComponent } from '../philipines-state/philipines-state.component';
import { ChooseGallaryComponent } from '../choose-gallary-chat/choose-gallary.component';
import { QucikviewComponent } from '../quick-view/quick-view.component';
import { TrustScoreComponent } from '../trust-score-popup/trust-score-popup.component';
import { OpenImageComponent } from '../open-image/open-image.component';
import {
	debounceTime,
	map,
	distinctUntilChanged,
	filter,
} from "rxjs/operators";

import { Subject } from "rxjs";
import { appConfig } from 'src/app/shared/services/app.config';
import {Location} from '@angular/common'; 
declare var require: any
declare var $ : any;

@Component({
	selector: 'app-centerstage',
	templateUrl: './centerstage.component.html',
	styleUrls: ['./centerstage.component.css'],
	host: {
		'(document:click)': 'onClick($event)',
	},
})



export class CenterstageComponent implements OnInit, AfterViewInit {
	lastIndex: any;
	userId: any;
	index: any;
	showChecked: any;
	interest_user_id: any;
	coverBanner: any;
	dashboardBanner: any;
	showCountryBanner: any;
	profileStatus: any;
	newLikes: any;
	admirers: any;
	userData: any;
	post_data: any;
	countryData: any;
	displayRight: any;
	showMobileFilter: boolean;
	socket_userId: any;
	select_state_id: any;
	Philippines: any;
	trueAdmir: any;
	stateBanner: any;
	selectedUserId: string = null;
	biggestAdmirer: any = [];
	uesrStories: any = [];
	_albums: any = [];
	unread: any = [];
	unreadVideo: any = [];
	centerStageUsers: any = [];
	countiesArray: any = [];
	statesArray: any = [];
	chatListUsers: User[] = [];
	displayddl = false;
	loading = true;
	gaugeType = "full";
	showStory = false;
	ShowRightOnMobile = false;
	displayMessage: boolean = false;
	showAdmir = 0;
	size = 22;
	sheetSize: 16 | 20 | 32 | 64 = 64;
	sheetRows = 57;
	sheetColumns = 57;
	defaultImage = require('../../../../assets/chat/image-loader.gif');
	backgroundUrl = 'https://unpkg.com/emoji-datasource-${set}@5.0.1/img/${set}/sheets-256/${sheetSize}.png';
	htmlString = '';
	sheet = 'apple';
	throttle = 1500;
	scrollDistance = 1;
	scrollUpDistance = 1;
	interestOptions = [
		{ id: '1', name: 'Maybe', image: 'assets/dashboard/maybe1.png' },
		{ id: '2', name: 'Probably', image: 'assets/dashboard/probably1.png' },
		{ id: '3', name: 'Absolutely', image: 'assets/dashboard/absolutely.png' },
		{ id: '4', name: 'Not today', image: 'assets/dashboard/not_today.png' }
	];

	thresholdConfig = {
		'0': { color: '#9d3aba' },
		'40': { color: '#9d3aba' },
		'75.5': { color: '#9d3aba' }
	};
	gaugeLabel = "Trust Score";
	options: Options = {
		floor: 1,
		ceil: 5,
		step: 1,
		disabled: true,
		showTicks: true,
		showSelectionBar: true,
	};


	carouselOptionsStory = {
		margin: 100,
		dots: false,
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
	socketIntervalIns: any;


	logggedInUserData = JSON.parse(localStorage.getItem("loginUser"));
	@ViewChild('fixedLeftBar', null)  fixedLeftBar : ElementRef;
	@ViewChild('fixedRightBar', null)  fixedRightBar : ElementRef;
	stickySideBarIns : any
	noDataFound : boolean = false;
	fetchDataIns: any;
	loadingMore: boolean = false;
	filters = {
		user_id: this.logggedInUserData.id,
		page: 1,
		user_name: '',
		state: null,
		country: null,
		interest_id: null,
		filter: {
			new_to_me: false,
			complete_profile: false,
			common_values: false,
			most_engagement: false,
			recent_active: false
		},
	};

	nextPage = '';
	mobileActivePage : string = '';
	lastScrolled : any;
	viewProfilePage : any = null;
	public keyUp = new Subject<string>();
	constructor(
		private messageService: MessageService,
		private footerService: footerService,
		private centerstageservice: centerStageService,
		private spinner: NgxSpinnerService,
		private dashboardService: dashboardService,
		private toastr: ToastrManager,
		public dialog: MatDialog,
		private router: Router,
		public headerService: HeaderService,
		private chatService: ChatService,
		private socketService: SocketService,
		private dataShareService: DataShareService,
		private _location : Location
	) {
		window.scrollTo(0, 0)
		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr)
		if (userData) {
			this.userId = userData.id;
			this.userData = userData;
		}

		this.fetchUserBanner();
		this.socket_userId = this.dataShareService.getUserId();
		this.getChatList();

		
		this.keyUp.pipe(
			// get value
			map((event: any) => {
				return event.target.value;
			})
			// if character length greater then 2
			, filter(res => res.length > 2)
			// Time in milliseconds between key events
			, debounceTime(500)
			// If previous query is diffent from current   
			, distinctUntilChanged()
			// subscription for response
			).subscribe((text: string) => {
				this.reFetch();
			})
	}

	backgroundImageFn = (set: any, sheetSize: number) =>
		this.backgroundUrl.replace(/\$\{set\}/g, set).replace(/\$\{sheetSize\}/g, String(sheetSize))

	ngAfterViewInit() {
		if(window.innerWidth > 768) {
			$(this.fixedLeftBar.nativeElement).theiaStickySidebar({
				// container element
				'containerSelector': '#my-warpper',
				// top/bottom margiin in pixels
				'additionalMarginTop': 100,
				'additionalMarginBottom': 20,
				// auto up<a href="https://www.jqueryscript.net/time-clock/">date</a> height on window resize
				'updateSidebarHeight': true,
				// disable the plugin when the screen size is smaller than...
				'minWidth': 0,
				// or 'stick-to-top', 'stick-to-bottom'
				'sidebarBehavior': 'modern',
				// or 'absolute'
				'defaultPosition': 'relative',
				// namespace
				'namespace': 'TSS'
			  });
			$(this.fixedRightBar.nativeElement).theiaStickySidebar({
				// container element
				'containerSelector': '#my-warpper',
				// top/bottom margiin in pixels
				'additionalMarginTop': 100,
				'additionalMarginBottom': 20,
				// auto up<a href="https://www.jqueryscript.net/time-clock/">date</a> height on window resize
				'updateSidebarHeight': true,
				// disable the plugin when the screen size is smaller than...
				'minWidth': 0,
				// or 'stick-to-top', 'stick-to-bottom'
				'sidebarBehavior': 'modern',
				// or 'absolute'
				'defaultPosition': 'relative',
				// namespace
				'namespace': 'TSS'
			});
		}
	}

	ngOnInit() {
		this.loading = true;
		this.displayRight = 'none';
		this.showCountryBanner = false;
		this.messageService.login('showHeaderSubscription');
		this.footerService.hidefooter(true);
		this.fetchProfiles();
		this.get_biggest_admirer();
		this.getUserNewCount();
		this.getUsersStory();

		$(window).scroll(() => {
			if ($(window).scrollTop() + 500 >= $(document).height() - $(window).height()) {
				if (!this.loadingMore) {
					this.filters.page = this.filters.page + 1;
					if (this.nextPage != '') {
						this.fetchProfiles();
					}
				}
			}
		});
		this.getChatList();

	}

	fetchUserBanner() {
		this.dashboardService.get_dashboard_banner().subscribe((data: any) => {
			this.spinner.hide();
			if (data.status == 'OK') {
				this.coverBanner = data.video;
			}
		}, error => {
			this.spinner.hide();
		})
	}


	get_biggest_admirer() {
		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr);
		if (userData) {
			this.spinner.show();
			this.dashboardService.get_biggest_admirer({ 'user_id': this.userId }).subscribe((data: any) => {
				if (data && data.records) {
					this.biggestAdmirer = data.records.admirer;
					this.trueAdmir = data.records.admirer[0].interest;
					this.spinner.hide();
				} else {
					this.spinner.hide();
				}

			}, error => {
				this.spinner.hide();
			})
		}
	}



	async getChatList() {
		//First time on load trigger the chatlistUpdated Event
		this.socketService.chatListUpdatedTrigger(this.userId);

		//Subscribe to the chatListUpdated Event
		this.socketIntervalIns = this.socketService.chatListUpdated().subscribe((chatListResponse: ChatListResponse) => {
			if (chatListResponse.chatList.length > 0) {
				this.unread = chatListResponse.unread;
				this.unreadVideo = chatListResponse.unreadVideo;
				chatListResponse.chatList.forEach(user => {
					var countMessage = chatListResponse.unread.find(x => x.fromUserId === user.id);
					var countVideo = chatListResponse.unreadVideo.find(x => x.fromUserId === user.id);
					var messageCount = countMessage == undefined ? 0 : countMessage.unread_msg_counts;
					var videoCount = countVideo == undefined ? 0 : countVideo.unread_msg_counts;
					user['unread'] = messageCount + videoCount
				})
				this.renderChatList(chatListResponse);
			} else {
				this.displayMessage = true;
			}
		});
	}


	renderChatList(chatListResponse: ChatListResponse): void {
		if (chatListResponse.singleUser) {
			if (this.chatListUsers.length > 0) {
				this.chatListUsers = this.chatListUsers.filter(function (obj: User) {
					return obj.id !== chatListResponse.chatList[0].id;
				});
			}
			/* Adding new online user into chat list array */
			if (this.socket_userId != chatListResponse.chatList[0].id) {
				this.chatListUsers = this.chatListUsers.concat(chatListResponse.chatList);
			}
		} else if (chatListResponse.userDisconnected) {
			const loggedOutUser = this.chatListUsers.findIndex((obj: User) => obj.id === chatListResponse.userid);
			if (loggedOutUser >= 0) {
				this.chatListUsers[loggedOutUser].online = 'N';
			}
		} else {
			/* Updating entire chatlist if user logs in. */
			this.chatListUsers = chatListResponse.chatList;
		}
		this.loading = false;
	}

	onClick(event) {
		if (event.target.id != 'check-open') {
			this.index = -1;
			this.lastIndex = -1;
			this.showAdmir = 0;
		}
	}

	//Fetch user Stories
	getUsersStory() {
		this.dashboardService.get_user_stories({ 'user_id': this.userId }).subscribe((data: any) => {

			this.showStory = true;
			if (data.status == "OK") {
				this.uesrStories = data.records;
			}
		})
	}

	//Fetch likes count
	getUserNewCount() {
		this.dashboardService.get_users_new_count({ 'user_id': this.userId }).subscribe((data: any) => {
			if (data.records) {
				this.newLikes = data.records.likes;
				this.admirers = data.records.admirers;
			}

			this.fetchCountriesData();
		})
	}

	//Fetch countries and state
	fetchCountriesData() {
		this.dashboardService.get_countries_data().subscribe((data: any) => {
			this.fetchDashboardBanner();
			if (data.status == "OK") {
				this.countiesArray = data.records;
				this.countiesArray.forEach(obj => {
					if (obj.name === 'Philippines') {
						this.Philippines = obj.states
					}
				})
			}
		})
	}

	//Fetch dashboard banner
	fetchDashboardBanner() {
		this.dashboardService.get_dashboard_banner().subscribe((data: any) => {

			if (data.records) {
				this.dashboardBanner = data.records[0];
			}

			this.stateBanner = data.state_banner;
		})
	}

	showDiv(index, user) {
		if (this.lastIndex == index) {
			index = -1;
		}
		this.showChecked = user.user_interest
		this.interest_user_id = user.id

		this.index = index;
		this.lastIndex = this.index;
	}


	updateDivInterest(index, value) {
		//Remove current stage if element id is 4/block user.
		let id = this.centerStageUsers[index]['id'];
		if (value == '4') {
			this.centerStageUsers.splice(index, 1);
			this.toastr.successToastr('User Blocked successfully.', 'Success',
				{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
				);
		} else {
			if (this.centerStageUsers[index]['interest_user_id'] != null) {
				this.centerStageUsers[index]['interest_user_id']['interest'] = value;
			} else {
				this.centerStageUsers[index]['interest_user_id'] = {
					"id": null,
					"interest": value
				}
			}
		}
		this.index = -1;
		let formData = { 'interest': value, 'interest_user_id': id, 'user_id': this.userId };
		this.updateInterest2(formData).then(() => { });
	}


	updateAdmireInterest(value) {
		//Remove current stage if element id is 4/block user.
		let id = this.biggestAdmirer[0]['id'];
		if (value == '4') {
			this.biggestAdmirer.splice(0, 1);
			this.toastr.successToastr('User Blocked successfully.', 'Success',
				{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
				);
		} else {
			if (this.biggestAdmirer[0]['interest_user_id'] != null) {
				this.biggestAdmirer[0]['interest_user_id']['interest'] = value;
			} else {
				this.biggestAdmirer[0]['interest_user_id'] = {
					"id": null,
					"interest": value
				}
			}
		}
		this.showAdmir = 0;
		let formData = { 'interest': value, 'interest_user_id': id, 'user_id': this.userId };
		this.updateInterest2(formData).then(() => { });
	}
	
	
	updateInterest2(formData): Promise<any> {
		return new Promise((resolve, reject) => {
			this.dashboardService.update_interest(formData).subscribe((data: any) => {
				resolve(data);
			}, error => {
				reject(error);
			})
		});
	}

	chooseCountry(country): void {
		this.filters.state = '';
		this.filters.country = country.target.value.split(':')[1].trim();
		this.countiesArray.forEach(obj => {
			if (obj.id === Number(this.filters.country)) {
				this.statesArray = obj.states;
			}
		})
	}

	chooseState(selectSate): void {
		this.filters.state = selectSate.target.value.split(':')[1].trim();
		this.statesArray.forEach(obj => {
			if (obj.id === Number(this.filters.state)) {
				this.select_state_id = obj.id
			}
		})
	}

	videoModal(video): void {
		this.dialog.open(videoUserComponent, {
			data: { 'video': video }
		});
	}

	goToUserProfilePage(user) {
		$('body').addClass('overflow-app');
		this.lastScrolled = window.scrollY;
		this.viewProfilePage = null;
		this._location.replaceState("/home/dashboard/userprofile;id="+user.id);
		setTimeout(()=>{
			this.viewProfilePage = user.id;
		},100)
		this.dashboardService.visit_user_profile({ 'user_id': this.userId, 'visited_user': user.id }).subscribe((data: any) => {
		})
		// this.router.navigate(['home/dashboard/userprofile', { id: user.id }])
	}

	closedPage(event) {
		$('body').removeClass('overflow-app');
		this.viewProfilePage = null;
		window.scrollTo(0, this.lastScrolled);
		this._location.replaceState("/home/dashboard/centerstage");
	}

	show_popup(string) {
		this.dialog.open(PlanValidationPopup, {
			data: { name: string }
		});
		return
	}

	goToNotificationPage() {
		this.router.navigate(['home/dashboard/notification'])
	}


	headerFilter(string) {
		var elems = document.querySelector(".active-filter");
		if (elems !== null) {
			elems.classList.remove("active-filter");
		}

		this.router.navigate(['home/dashboard'])
		setTimeout(() => {
			this.headerService.loginFilter(string);
		}, 500)
	}

	ShowRight() {
		this.ShowRightOnMobile = !this.ShowRightOnMobile;
		this.displayRight = this.ShowRightOnMobile ? "block" : "none";
	}


	showFilterOnMobile() {
		var elems = document.querySelector(".active-filter");
		if (elems !== null) {
			elems.classList.remove("active-filter");
		}

		var addActive = document.querySelector(".last-filter");
		if (addActive !== null) {
			addActive.classList.add("active-filter");
		}
		this.showMobileFilter = !this.showMobileFilter;
		this.displayddl = this.showMobileFilter ? true : false;

		if (this.displayddl) {
			let el = document.getElementById('mobile-scl-filter');
			el.scrollIntoView({ behavior: "smooth" });
		}
	}


	goToCountryDetailPage() {
		this.router.navigate(['home/dashboard/uservideo', { 'state': this.filters.state }])
	}

	selectedUser(user: User): void {
		this.headerService.selectUser(user);
		this.dataShareService.changeSelectedUser(user);
		this.router.navigate(['home/dashboard/user-chat', { chat: 'dashboard' }]);
	}

	//Show philippines modal
	goToPhilipinePage() {
		const dialogRef = this.dialog.open(PhilipinesComponent, {
			data: { name: this.Philippines }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.filters.country = result.country_id;
				this.filters.state = result.id;
				this.showCountryBanner = true;
				this.reFetch();
			}
		})
	}

	openLink(link) {
		window.open(link, '_blank');
	}

	openImage(user, index) {
		this._albums = []
		for (let i = 0; i < user.length; i++) {
			const src = user[i].path
			const album = {
				src: appConfig.bucketUrl + src
			};
			this._albums.push(album);
		}

		setTimeout(() => {
			this.dialog.open(OpenImageComponent, { data: { 'images': this._albums, 'index': index } });
		}, 500)
	}


	videoStories(video, index): void {
		if (video != undefined) {
			const dialogRef = this.dialog.open(videoUserComponent, {
				data: { 'video': video.user_info.profile_story }
			});

			dialogRef.afterClosed().subscribe(result => {
				this.dashboardService.view_user_stories({ user_id: this.userId, story_id: video.user_info.profile_story.id }).subscribe((data: any) => {
					if (data.status == "OK") {
						this.uesrStories.splice(index, 1);
					}
				})
			});
		}
	}

	//Convert time into 12 hours
	formatAMPM(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}


	goToChatPage(user) {
		var message_time = this.formatAMPM(new Date())
		this.sendFirstMessage({
			fromUserId: this.userId,
			message: 'Hey',
			toUserId: user.id,
			message_time: message_time,
			type: 'simple',
			token: 'Bearer ' + localStorage.getItem('token')
		}, user);
	}


	sendFirstMessage(message: Message, selectedUser) {
		var data = {
			first_name: selectedUser.user_name = selectedUser.user_name ? selectedUser.user_name : selectedUser.first_name,
			id: selectedUser.id,
			online: '',
			username: selectedUser.user_name = selectedUser.user_name ? selectedUser.user_name : selectedUser.first_name,
			path: ''
		}


		this.chatService.getMessages({ userId: this.userId, toUserId: selectedUser.id }).subscribe((response: MessagesResponse) => {
			this.spinner.hide();
			if (response.messages.length == 0) {
				try {
					this.socketService.sendMessage(message);
					this.headerService.chatListReload(true);
					this.headerService.selectUser(data);
					this.dataShareService.changeSelectedUser(data);
					this.router.navigate(['home/dashboard/user-chat', { chat: 'dashboard' }]);
				} catch (error) {
					alert(`Can't send your message`);
				}

			} else {
				this.headerService.selectUser(data);
				this.dataShareService.changeSelectedUser(data);
				this.router.navigate(['home/dashboard/user-chat', { chat: 'dashboard' }]);
			}
		});
	}


	openVideoGreeting(user) {
		const dialogRef = this.dialog.open(ChooseGallaryComponent, { data: { condition: 'dashboard' } });
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				var message_time = this.formatAMPM(new Date())
				this.sendAndUpdateMessages({
					fromUserId: this.userId,
					message: (result.path).trim(),
					toUserId: user.id,
					message_time: message_time,
					type: 'video',
					token: 'Bearer ' + localStorage.getItem('token')
				}, user.id);
			}
		});
	}


	sendAndUpdateMessages(message: Message, toUserId) {
		this.sendEmailAfterMail(toUserId)
		try {
			this.toastr.successToastr('Video greeting send successfully.', 'Success',
				{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
			);
			this.socketService.sendMessage(message);
			this.headerService.chatListReload(true);
		} catch (error) {
			alert(`Can't send your message`);
		}
	}

	sendEmailAfterMail(toUserId) {
		var post_data = {
			'from_user': this.userId,
			'to_user': toUserId,
			'type': 'video'
		}
		this.dashboardService.send_email_after_message(post_data).subscribe((data: any) => {
		})
	}

	goToChatPageViewAll() {
		localStorage.removeItem("selectId");
		this.router.navigate(['home/dashboard/user-chat'])
	}




	openQuickView(index, user, string): void {
		this.headerService.selectUser(user);
		this.dataShareService.changeSelectedUser(user);
		let modalRef = this.dialog.open(QucikviewComponent, {
			data: { user: user, dataLength: this.biggestAdmirer.length, page: this.filters.page, index: index, filter: 'biggestadmirer' }
		});
		modalRef.componentInstance.onDataChange.subscribe(updatedIndex => {
			modalRef.componentInstance.user = this.biggestAdmirer[updatedIndex];
			modalRef.componentInstance.dataUpdated();
		});

		modalRef.componentInstance.onupdateInterest.subscribe(data => {
			this.updateAdmireInterest(data.value);
			modalRef.componentInstance.user = this.biggestAdmirer[data.index];
		});	
	}

	showInterestOptions(data) {
		var showAdmin = this.showAdmir == 0 ? 1 : 0;
		this.showAdmir = showAdmin
		this.interest_user_id = data.id
	}


	openTrustScorePopup(score) {
		this.dialog.open(TrustScoreComponent, { data: { 'score': score } });
	}

	ngOnDestroy() {
		this.socketIntervalIns.unsubscribe();
	}

	reFetch() {
		this.centerStageUsers = [];
		this.filters.page = 1;
		this.fetchProfiles();
	}

	fetchProfiles() {
		this.noDataFound = false;
		this.loadingMore = true;
		//prevent from multiples calls
		if (this.fetchDataIns) {
			clearTimeout(this.fetchDataIns);
		}
		this.fetchDataIns = setTimeout(() => {
			this.centerstageservice.get_center_stage_profiles(this.filters).subscribe((data: any) => {
				this.loadingMore = false;
				if (data.status == 'OK' && data.records.data) {
					if(data.records.data.length  == 0 && this.filters.page === 1) {
						this.noDataFound = true;
					}
					
					if(data.records.data.length  <= 2 && this.filters.page === 1) {
						setTimeout(()=>{
							if($(".stage-top-sect").length > 0) {
								$([document.documentElement, document.body]).animate({
									scrollTop: $(".stage-top-sect").offset().top - 100
								}, 200);
							}
						},200);
					}

					setTimeout(()=>{
						$(window).resize();
					},200)

					if (data.records.data) {
						data.records.data.forEach(obj => {
							this.centerStageUsers.push(obj);
						})
					}
					if (data.records.next_page_url != undefined) {
						this.nextPage = data.records.next_page_url
					} else {
						this.nextPage = '';
					}
				} else {
					this.noDataFound = true;
					setTimeout(()=>{
						if($(".stage-top-sect").length > 0) {
							$([document.documentElement, document.body]).animate({
								scrollTop: $(".stage-top-sect").offset().top - 100
							}, 500);
						}
					},200);
				}

				if (data.records.countryData) {
					this.countryData = data.records.countryData;
				}
			}, error => {
				this.loadingMore = false;
			})
		}, 600);
	}
}