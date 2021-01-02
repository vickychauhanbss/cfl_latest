import { Component, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { HeaderService } from '../../../shared/services/header/header.service';
import { dashboardService } from '../../../shared/services/dashboard/dashboard.service';
//Import notification toast
import { ToastrManager } from 'ng6-toastr-notifications';
import { footerService } from '../../../shared/services/footer/footer.service';


//Import Api loader
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
import { videoUserComponent } from '../video-model-user/video-model.component';
import { MatDialog } from '@angular/material/dialog';
// import { Country } from '../../../shared/services/countries';
import { QucikviewComponent } from '../quick-view/quick-view.component';
import { MessageService } from '../../../eventservice';
import { userService } from '../../../shared/services/user/user.service';
import { PlanValidationPopup } from '../plan-validation-popup/plan-validation-popup.component';
import { PhilipinesComponent } from '../philipines-state/philipines-state.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { ChooseGallaryComponent } from '../choose-gallary-chat/choose-gallary.component';
import { FoundConnectComponent } from '../fount-one-users/fount-one-users.component';
import {Location} from '@angular/common'; 

// Get chat list
import { User } from './../../../interfaces/user';
import { ChatListResponse } from './../../../interfaces/chat-list-response';
import { ChatService } from '../../../shared/services/chat/chat.service';
import { SocketService } from '../../../shared/services/socket/socket.service';
import { DataShareService } from '../../../shared/services/utils/data-share.service';
import { Message } from './../../../interfaces/message';
import { MessagesResponse } from './../../../interfaces/messages-response';
import {
	debounceTime,
	map,
	distinctUntilChanged,
	filter,
} from "rxjs/operators";

import { Subject } from "rxjs";
import { of } from "rxjs";

declare var $ : any;
declare var require: any


//import Router
import { Router } from "@angular/router";
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
@Component({
	selector: 'app-userdashboard',
	templateUrl: './userdashboard.component.html',
	styleUrls: ['./userdashboard.component.css'],
	host: {
		'(document:click)': 'onClick($event)',
	},
})
export class UserdashboardComponent implements OnInit, AfterViewInit {
	@ViewChild('fixedLeftBar', null)  fixedLeftBar : ElementRef;
	@ViewChild('fixedRightBar', null)  fixedRightBar : ElementRef;
	userProfiles: any = [];
	applyFilter: any = [];
	page: any;
	userId: any;
	countiesArray: any = [];
	statesArray: any = [];
	centerStage: any = [];
	username: any;
	selectedCountry: any;
	selectedState: any;
	currentPage: any;
	userData: any;
	hideme = []
	items = [];
	index: any;
	interest_user_id: any;
	trueClient: any;
	trueCenter: any;
	optionObj: any;
	serviceMessage: any;
	lastIndex: any;
	showCountryBanner: any;
	lastCenterIndex: any;
	indexCenter: any;
	hideLoader: any;
	displayddl: any;
	showMobileFilter: boolean;
	dashboardBanner: any;
	showRefreshButton: any;
	interestFilter: number;
	new_to_me: any;
	complete_profile: any;
	common_values: any;
	most_engagement: any;
	recent_active: any;
	user_name: any
	checkUser: any;
	interest_id: any;
	filterName: any;
	newLikes: any;
	admirers: any;
	coverImage: any;
	biggestAdmirer: any = [];
	countryData: any = [];
	Philippines: any;
	selected_country = 0;
	selected_state = 0;
	phillips_state = 0;
	trueAdmir: any;
	post_data: any;
	totalUser: any;
	showAdmir = 0;
	chatList: any = []
	apply_filter = false;
	socket_userId: any;
	ShowRightOnMobile = false;
	displayRight: any;
	get_profiles_data = false;
	loading = true;
	chatListUsers: User[] = [];
	selectedUserId: string = null;
	uesrStories: any = [];
	showStory = false;
	showNotFound = false;
	select_state_id: any;
	bannerVideo: any;
	selectedFilterName: any;
	unread: any = [];
	unreadVideo: any = [];
	currentCheckedValue = null;
	interestRadio: any;
	found_one_count: any;
	stateBanner: any;
	toggle: boolean = false;
	showLoader = false;
	throttle = 150;
	scrollDistance = 1;
	scrollUpDistance = 1;
	private subscription;
	private filterSubscription;

	interestOptions = [
	{ id: '1', name: 'Maybe', image: 'assets/dashboard/maybe1.png' },
	{ id: '2', name: 'Probably', image: 'assets/dashboard/probably1.png' },
	{ id: '3', name: 'Absolutely', image: 'assets/dashboard/absolutely.png' },
	{ id: '4', name: 'Not today', image: 'assets/dashboard/not_today.png' }
	];
	displayMessage: boolean = false

	size = 22;
	sheetSize: 16 | 20 | 32 | 64 = 64;
	sheetRows = 57;
	sheetColumns = 57;
	backgroundUrl = 'https://unpkg.com/emoji-datasource-${set}@5.0.1/img/${set}/sheets-256/${sheetSize}.png';
	htmlString = '';
	sheet = 'apple';
	defaultImage = require('../../../../assets/chat/image-loader.gif');

	carouselOptions = {
		margin: 10,
		items: 3,
		autoplay: true,
		loop: false,
		dots: false,
		rewind: true,
		touchDrag: false,
		mouseDrag: false,
		responsive: {
			0: {
				items: 2,
				nav: false,
			},
			600: {
				items: 3,
				nav: false,
			},
		}
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
	loadingMore: boolean = false;
	socketIntervalIns: any;

	logggedInUserData = JSON.parse(localStorage.getItem("loginUser"));

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
		tab: ''
	};
	nextPage = '';
	noDataFound : boolean = false;
	fetchDataIns: any;
	public keyUp = new Subject<string>();
	stickySideBarIns : any
	mobileActivePage : string = '';
	viewProfilePage : any;
	lastScrolled : number;
	constructor(
		public headerService: HeaderService,
		private toastr: ToastrManager,
		private spinner: NgxSpinnerService,
		private dashboardService: dashboardService,
		public dialog: MatDialog,
		private router: Router,
		private _eref: ElementRef,
		private footerService: footerService,
		private messageService: MessageService,
		private userService: userService,
		private chatService: ChatService,
		private socketService: SocketService,
		private dataShareService: DataShareService,
		private ren: Renderer2,
		private _location : Location
		) {

		let currentUesr = localStorage.getItem("loginUser");
		this.footerService.hidefooter(true);
		let userData = JSON.parse(currentUesr);
		if (userData) {
			this.userId = userData.id
			this.userData = userData
		}
		//this.countiesArray = Country;
		this.displayddl = false;
		this.displayRight = 'none';
		this.page = 1;
		this.showCountryBanner = false;
		this.hideLoader = false;
		if (localStorage.getItem('userprofiles') == null) {
			window.scrollTo(0, 0)
		}
		this.optionObj = {
			'user_id': this.userId,
			'page': this.page
		}

		this.filterSubscription = this.headerService.onlineFilter.subscribe((bit) => {
			this.page = 1;
			if (bit === 'onlinenow' || bit === 'its_mutual' || bit === 'all_admirers' || bit === 'more_preferences') {
				this.serviceMessage = bit;
				this.headerService.loggedIn(true);
				this.filters.tab = bit == 'onlinenow' ? 'is_online' : bit == 'its_mutual' ? 'its_mutual' : bit == 'more_preferences' ? 'more_preferences' : 'all_admirers';
				this.reFetch();
				if(bit=='more_preferences') {
					this.get_center_stage_profiles();
				}
				this.viewProfilePage = null;
				$('body').removeClass('overflow-app');
				window.scrollTo(0, this.lastScrolled);
				this._location.replaceState("/home/dashboard");
			} else {
				this.viewProfilePage = null;
				$('body').removeClass('overflow-app');
				window.scrollTo(0, this.lastScrolled);
				this._location.replaceState("/home/dashboard");
			}
		})

		this.headerService.updateInterest.subscribe((bit) => {
			if (this.checkUser == 'simpleUsers') {
				this.userProfiles[bit.index].interest = bit.id;
			} else if (this.checkUser == 'centerStage') {
				this.centerStage[bit.index].interest = bit.id;
			}
		})

		this.headerService.updatePlan.subscribe(() => {
			this.userData = JSON.parse(localStorage.getItem("loginUser"));
		})

		this.subscription = this.headerService.reloadDashboard.subscribe((bit) => {
			this.filters = {
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
				tab: ''
			};
			this.showCountryBanner = false;
			this.centerStage = [];
			this.userProfiles = [];
			this.get_center_stage_profiles();
			this.reFetch();
		})
		this.get_dashboard_banner();
		this.socket_userId = this.dataShareService.getUserId();


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

		backgroundImageFn = (set: any, sheetSize: number) =>
		this.backgroundUrl.replace(/\$\{set\}/g, set).replace(/\$\{sheetSize\}/g, String(sheetSize))

		onClick(event) {
			if (event.target.classList.value != 'ng-tns-c4-0' && event.target.classList.value != 'mat-radio-label-content' && event.target.id != 'check-open') {
				this.index = -1;
				this.lastIndex = -1;
				this.indexCenter = -1;
				this.lastCenterIndex = -1;
				this.showAdmir = 0;
			}
		}



		ngOnInit() {
			if (this.logggedInUserData != null) {
				this.headerService.loggedIn(true);
			}
			this.fetchProfiles();
			this.get_center_stage_profiles();
			this.get_biggest_admirer();
			this.getUserNewCount();
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

	async getChatList() {
		//user connected to socket.
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
				// let me = this
				this.chatListUsers = this.chatListUsers.filter(function (obj: User) {
					return obj.id !== chatListResponse.chatList[0].id;
				});
			}
			/* Adding new online user into chat list array */
			if (this.userId != chatListResponse.chatList[0].id) {
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

	fetchAllFoundOne() {
		this.dialog.open(FoundConnectComponent, { data: { 'condition': 'dashboard', userId: '' } });
	}



	get_center_stage_profiles() {
		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr);
		if (userData) {
			this.dashboardService.get_center_stage_profiles({ 'user_id': this.userId }).subscribe((data: any) => {
				if (data.records) {
					this.centerStage = data.records.center;
				} else {
					this.centerStage = [];
					this.showNotFound = true;
				}
			})
		}
	}


	get_biggest_admirer() {
		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr);
		if (userData) {
			this.dashboardService.get_biggest_admirer({ 'user_id': this.userId }).subscribe((data: any) => {
				if (data && data.records) {
					this.biggestAdmirer = data.records.admirer;
					if(data.records.admirer[0].interest_user_id != null) {
						this.trueAdmir = data.records.admirer[0].interest_user_id.interest;
					} else {
						this.trueAdmir = '0';
					}
				}
				if (data.found_one_count > 0 && this.userData.dashboard_visit == '0') {
					this.fetchAllFoundOne();
				}

			})
		}
	}

	getUserNewCount() {
		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr);
		if (userData) {
			this.dashboardService.get_users_new_count({ 'user_id': this.userId }).subscribe((data: any) => {
				if (data.records) {
					this.newLikes = data.records.likes;
					this.admirers = data.records.admirers;
					this.toggle = data.records.more_preference == "1" ? true : false;
				}
				this.get_users_Story();
				this.get_countries_data();
			})
		}
	}

	get_users_Story() {
		this.dashboardService.get_user_stories({ 'user_id': this.userId }).subscribe((data: any) => {
			this.showStory = true;
			if (data.status == "OK") {
				this.uesrStories = data.records;
			}
		})
	}


	get_countries_data() {
		this.dashboardService.get_countries_data().subscribe((data: any) => {
			if (data.status == "OK") {
				this.countiesArray = data.records;
				this.countiesArray.forEach(obj => {
					if (obj.name == 'Philippines') {
						this.Philippines = obj.states
					}
				})
			}
		})
	}

	get_dashboard_banner() {
		this.dashboardService.get_dashboard_banner().subscribe((data: any) => {
			if (data.status == "OK") {
				if (data.records) {
					this.dashboardBanner = data.records[0];
				}
				this.bannerVideo = data.video;
				this.stateBanner = data.state_banner;
				if (this.userData.dashboard_visit == '1') {
					this.OnloadPopup(this.bannerVideo);
				}
			}
		})
	}


	videoModal(video): void {
		if (video != undefined) {
			this.dialog.open(videoUserComponent, { data: { 'video': {
				path : video
			} } });
		}
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

	OnloadPopup(video) {
		this.dialog.open(WelcomeComponent, {
			data: { 'check': 'dashboard', video: video.video_path }
		});
	}

	filter(event, string) {
		// this.page = 1;
		// this.apply_filter = true;
		// if (string == 'apply_filter') {
		// 	var index = this.applyFilter.indexOf(event);
		// 	if (index == -1) {
		// 		this.applyFilter.push(event)
		// 	} else {
		// 		this.applyFilter.splice(index, 1);
		// 	}
		// 	event = ''
		// 	this.interest_id = '';
		// 	this.showRefreshButton = false;
		// 	this.interestFilter = null;
		// } else if (string == 'dating_Interest') {
		// 	this.showRefreshButton = true;
		// 	this.applyFilter = [];
		// 	this.new_to_me = '';
		// 	this.complete_profile = '';
		// 	this.common_values = '';
		// 	this.most_engagement = '';
		// 	this.recent_active = '';
		// 	this.interest_id = event
		// }

		// if (this.selectedCountry) {
		// 	this.showCountryBanner = true;
		// 	window.scrollTo(0, 0);
		// }
		// this.post_data = {
		// 	'user_name': this.user_name,
		// 	'state': Number(this.selectedState),
		// 	'country': Number(this.selectedCountry),
		// 	'interest_id': this.interest_id,
		// 	'filter': this.applyFilter,
		// 	'user_id': this.userId,
		// 	'tab': this.filterName,
		// 	'page': this.page
		// }

		// this.dashboardService.get_users_profile_data(this.post_data).subscribe((data: any) => {
		// 	this.spinner.hide();
		// 	if (data.status == 'OK' && data.records.data) {
		// 		this.userProfiles = data.records.data;
		// 		let el = document.getElementById('mobile-user-list');
		// 		el.scrollIntoView({ behavior: "smooth" });
		// 		if (data.records.countryData) {
		// 			this.countryData = data.records.countryData;
		// 			this.get_profiles_data = true;
		// 		}
		// 	} else {
		// 		this.userProfiles = [];
		// 	}
		// }, error => {
		// 	this.spinner.hide();
		// 	this.toastr.errorToastr(error.error, 'Oops!', {
		// 		position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
		// 	});
		// })
	}

	chooseCountry(country): void {
		this.phillips_state = 0;
		this.selectedCountry = country.target.value.split(':')[1].trim();
		this.countiesArray.forEach(obj => {
			if (obj.id === Number(this.selectedCountry)) {
				this.statesArray = obj.states;
			}
		})
	}


	chooseState(selectSate): void {
		this.selectedState = selectSate.target.value.split(':')[1].trim();
		this.statesArray.forEach(obj => {
			if (obj.id === Number(this.selectedState)) {
				this.select_state_id = obj.id
			}
		})
	}


	choosePhillips(selectSate): void {
		this.selected_country = 0;
		this.selected_state = 0;
		this.selectedCountry = 'Philippines';
		this.selectedState = selectSate.target.value;
		this.filter('', 'country_state')

	}


	onScrollDown() {
		this.page = this.page + 1;
		if (this.apply_filter == false) {
			this.optionObj = { 'user_id': this.userId, 'page': this.page }
			this.dashboardService.get_users_profile_data(this.optionObj).subscribe((data: any) => {
				this.spinner.hide();
				if (data.records) {
					if (data.records.data) {
						data.records.data.forEach(obj => {
							this.userProfiles.push(obj);
						})
					}
					this.get_profiles_data = true;
				}
			})
		} else {
			this.post_data['page'] = this.page
			this.dashboardService.get_users_profile_data(this.post_data).subscribe((data: any) => {
				this.spinner.hide();
				if (data.status == 'OK' && data.records.data) {
					if (data.records.data) {
						data.records.data.forEach(obj => {
							this.userProfiles.push(obj);
						})
					}
				}
			}, error => {
				this.spinner.hide();
			})
		}
	}

	openQuickView(index, user, string): void {
		this.headerService.selectUser(user);
		this.dataShareService.changeSelectedUser(user);
		if (string == 'simpleUsers') {
			this.checkUser = string
			let modalRef = this.dialog.open(QucikviewComponent, {
				data: { user: user, dataLength: this.userProfiles.length, page: this.page, index: index, filter: 'simpleUsers' }
			});
			modalRef.componentInstance.onDataChange.subscribe(updatedIndex => {
				modalRef.componentInstance.user = this.userProfiles[updatedIndex];
				modalRef.componentInstance.dataUpdated();
			});

			modalRef.componentInstance.onupdateInterest.subscribe(data => {
				this.updateDivInterest(data.index, data.value);
				modalRef.componentInstance.user = this.userProfiles[data.index];
			});

		} else if (string == 'centerStage') {
			this.checkUser = string
			let modalRef = this.dialog.open(QucikviewComponent, {
				data: { user: user, dataLength: this.centerStage.length, page: this.page, index: index, filter: 'centerSatge' }
			});
			modalRef.componentInstance.onDataChange.subscribe(updatedIndex => {
				modalRef.componentInstance.user = this.centerStage[updatedIndex];
				modalRef.componentInstance.dataUpdated();
			});

			modalRef.componentInstance.onupdateInterest.subscribe(data => {
				this.updateCenterInterest(data.index, data.value);
				modalRef.componentInstance.user = this.centerStage[data.index];
			});
		} else if (string == 'biggestadmirer') {
			this.checkUser = string
			let modalRef = this.dialog.open(QucikviewComponent, {
				data: { user: user, dataLength: this.biggestAdmirer.length, page: this.page, index: index, filter: 'biggestadmirer' }
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

		this.dashboardService.visit_user_profile({ 'user_id': this.userId, 'visited_user': user.id }).subscribe((data: any) => {

		})
	}


	showDiv(index, user) {
		if (this.lastIndex == index) {
			index = -1;
		}
		this.trueClient = user.interest;
		this.interest_user_id = user.id;
		this.index = index;
		this.lastIndex = this.index;
	}

	showCenterDiv(index, user) {
		if (this.lastCenterIndex == index) {
			index = -1;
		}
		this.trueCenter = user.interest
		this.interest_user_id = user.id
		this.indexCenter = index;
		this.lastCenterIndex = this.indexCenter;
	}

	updateCenterInterest(index, value) {
		//Remove current stage if element id is 4/block user.
		let id  = this.centerStage[index]['id'];
		if (value == '4') {
			this.centerStage.splice(index, 1);
			this.toastr.successToastr('User Blocked successfully.', 'Success',
				{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
				);
		} else {
			if (this.centerStage[index]['interest_user_id'] != null) {
				this.centerStage[index]['interest_user_id']['interest'] = value;
			} else {
				this.centerStage[index]['interest_user_id'] = {
					"id": null,
					"interest": value
				}
			}
		}
		this.indexCenter = -1;
		let formData = { 'interest': value, 'interest_user_id': id, 'user_id': this.userId };
		this.updateInterest(formData).then(() => { });
	}

	updateDivInterest(index, value) {
		//Remove current stage if element id is 4/block user.
		let id  = this.userProfiles[index]['id'];
		if (value == '4') {
			this.userProfiles.splice(index, 1);
			this.toastr.successToastr('User Blocked successfully.', 'Success',
				{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
				);
		} else {
			if (this.userProfiles[index]['interest_user_id'] != null) {
				this.userProfiles[index]['interest_user_id']['interest'] = value;
			} else {
				this.userProfiles[index]['interest_user_id'] = {
					"id": null,
					"interest": value
				}
			}
		}
		this.index = -1;
		let formData = { 'interest': value, 'interest_user_id': id, 'user_id': this.userId };
		this.updateInterest(formData).then(() => { });
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
		this.updateInterest(formData).then(() => { });
	}


	updateInterest(formData): Promise<any> {
		return new Promise((resolve, reject) => {
			this.dashboardService.update_interest(formData).subscribe((data: any) => {
				resolve(data);
			}, error => {
				reject(error);
			})
		});
	}

	ReloadData() {
		this.interest_id = '';
		this.interestFilter = null;
		this.page = 1;
		this.optionObj = {
			'user_id': this.userId,
			'page': this.page
		}
		this.viewProfilePage = null;
		$('body').removeClass('overflow-app');
		this._location.replaceState("/home/dashboard");
		this.ngOnInit()
	}

	goToDetailPage(user, id) {
		$('body').addClass('overflow-app');
		this.lastScrolled = window.scrollY;
		this.viewProfilePage = null;
		this._location.replaceState("/home/dashboard/userprofile;id="+user.id);
		setTimeout(()=>{
			this.viewProfilePage = user.id;
		},100);
		this.dashboardService.visit_user_profile({ 'user_id': this.userId, 'visited_user': user.id }).subscribe((data: any) => {
		})
	}

	closedPage(event) {
		$('body').removeClass('overflow-app');
		this.viewProfilePage = null;
		window.scrollTo(0, this.lastScrolled);
		this._location.replaceState("/home/dashboard");
	}

	apply_for_center_stage() {
		if(this.userData.gender =='1') {
			this.router.navigate(['home/centerstage/cupgm'])
		} else {
			this.router.navigate(['home/centerstage/cupgfi'])
		}
	}


	goToCenterStage() {
		var elems = document.querySelector(".active");
		if (elems !== null) {
			elems.classList.remove("active");
		}

		this.router.navigate(['home/dashboard/centerstage'])
	}

	refresh_filter(text) {
		this.apply_filter = false;
		if (text == 'user_name') {
			this.user_name = '';
		} else if (text == 'country_state') {
			this.showCountryBanner = false;
			this.selectedState = '';
			this.selectedCountry = '';
			this.selected_country = 0;
			this.selected_state = 0;
			this.statesArray = [];
		} else if (text == 'interest') {
			this.interest_id = '';
			this.interestFilter = null;
		} else if (text == 'apply_filter') {
			this.applyFilter = [];
			this.new_to_me = '';
			this.complete_profile = '';
			this.common_values = '';
			this.most_engagement = '';
			this.recent_active = '';
		}

		let post_data = {
			'user_name': this.user_name,
			'state': Number(this.selectedState),
			'country': Number(this.selectedCountry),
			'interest_id': this.interest_id,
			'filter': this.applyFilter,
			'user_id': this.userId,
			'tab': this.filterName
		}

		this.dashboardService.get_users_profile_data(post_data).subscribe((data: any) => {
			this.spinner.hide();
			if (data.status == 'OK' && data.records.data) {
				this.userProfiles = data.records.data;
			} else {
				this.userProfiles = [];
			}
		}, error => {
			this.spinner.hide();
		})
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

	showInterestOptions(data) {
		var showAdmin = this.showAdmir == 0 ? 1 : 0;
		this.showAdmir = showAdmin
		this.interest_user_id = data.id
	}

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
				setTimeout(()=> {
					// this.instinst.updateTop(450);
				}, 200)
			}
		})
	}

	filterMobile(string) {
		var elems = document.querySelector(".active-filter");
		if (elems !== null) {
			elems.classList.remove("active-filter");
		}

		if (string == 'is_online') {
			this.selectedFilterName = 'ONLINE NOW';
			var addActive = document.querySelector(".is_online");
			if (addActive !== null) {
				addActive.classList.add("active-filter");
			}
		} else if (string == 'its_mutual') {
			this.selectedFilterName = 'ITS MUTUAL';
			var addActive = document.querySelector(".its_mutual");
			if (addActive !== null) {
				addActive.classList.add("active-filter");
			}
		} else if (string == 'all_admirers') {
			this.selectedFilterName = 'ALL ADMIRERS';
			var addActive = document.querySelector(".all_admirers");
			if (addActive !== null) {
				addActive.classList.add("active-filter");
			}
		} else if (string == 'more_preferences') {
			this.selectedFilterName = 'MY PREFERENCES';

			var addActive = document.querySelector(".more_preferences");
			if (addActive !== null) {
				addActive.classList.add("active-filter");
			}
		}
		this.showMobileFilter = false;
		this.displayddl = false;
		this.filterName = string;
		this.filter('', 'tabs')
	}


	showFilterOnMobile() {
		// var elems = document.querySelector(".active-filter");
		// if (elems !== null) {
		// 	elems.classList.remove("active-filter");
		// }

		// var addActive = document.querySelector(".last-filter");
		// if (addActive !== null) {
		// 	addActive.classList.add("active-filter");
		// }

		this.showMobileFilter = !this.showMobileFilter;
		this.displayddl = this.showMobileFilter ? true : false;
		// if (this.displayddl == 'block') {
		// 	let el = document.getElementById('mobile-scl-filter');
		// 	el.scrollIntoView({ behavior: "smooth" });
		// }
	}



	ShowRight() {
		this.ShowRightOnMobile = !this.ShowRightOnMobile;
		this.displayRight = this.ShowRightOnMobile ? "block" : "none";
	}


	goToCountryDetailPage() {
		this.router.navigate(['home/dashboard/uservideo', { 'state': this.filters.state }])
	}


	selectedUser(user: User): void {
		this.headerService.selectUser(user);
		this.dataShareService.changeSelectedUser(user);
		this.router.navigate(['home/dashboard/user-chat', { chat: 'dashboard' }]);
	}

	openLink(link) {
		window.open(link, '_blank');
	}

	goToSetMorePreferencesPage() {
		this.router.navigate(['home/dashboard/morepreferences']);
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
		this.toastr.successToastr('Video greeting send successfully.', 'Success',
			{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
			);
		this.socketService.sendMessage(message);
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

	toggleFilter(e, string) {
		var preferenceValue = e == true ? '1' : '0';
		this.userService.set_More_Preferences({ 'preference': preferenceValue }).subscribe((data: any) => {
			this.filterMobile(string)
		}, error => {
			this.spinner.hide();
		})
	}

	goToChatPageViewAll() {
		localStorage.removeItem("selectId");
		this.router.navigate(['home/dashboard/user-chat'])
	}


	goToChatPage(item) {
		var message_time = this.formatAMPM(new Date())
		this.sendFirstMessage({
			fromUserId: this.userId,
			message: 'Hey',
			toUserId: item.id,
			message_time: message_time,
			type: 'simple',
			token: 'Bearer ' + localStorage.getItem('token')
		}, item);
	}

	sendFirstMessage(message: Message, item) {
		this.chatService.getMessages({ userId: this.userId, toUserId: item.id }).subscribe((response: MessagesResponse) => {
			this.spinner.hide();
			if (response.messages.length == 0) {
				try {
					this.socketService.sendMessage(message);
					this.headerService.selectUser(item);
					this.dataShareService.changeSelectedUser(item);
					this.router.navigate(['home/dashboard/user-chat', { chat: 'dashboard' }]);
				} catch (error) {

				}

			} else {
				this.headerService.selectUser(item);
				this.dataShareService.changeSelectedUser(item);
				this.router.navigate(['home/dashboard/user-chat', { chat: 'dashboard' }]);
			}
		});
	}


	ngOnDestroy() {
		this.subscription.unsubscribe();
		this.filterSubscription.unsubscribe();
		this.socketIntervalIns.unsubscribe();
		if(this.stickySideBarIns) {
			clearInterval(this.stickySideBarIns);
		}
		$('body').removeClass('overflow-app');
	}

	reFetch() {
		this.userProfiles = [];
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
			this.dashboardService.get_users_profile_data(this.filters).subscribe((data: any) => {
				this.loadingMore = false;
				if (data.status == 'OK' && data.records.data) {
					if(data.records.data.length  == 0 && this.filters.page === 1) {
						this.noDataFound = true;
					}
					
					if(data.records.data.length  <= 8 && this.filters.page === 1) {
						setTimeout(()=>{
							$([document.documentElement, document.body]).animate({
								scrollTop: $(".profiles-main").offset().top - 100
							}, 500);
						},200);
					}

					setTimeout(()=>{
						$(window).resize();
					},200)

					if (data.records.data) {
						data.records.data.forEach(obj => {
							this.userProfiles.push(obj);
						})
					}
					if (data.records.next_page_url != undefined) {
						this.nextPage = data.records.next_page_url
					} else {
						this.nextPage = '';
					}
				}

				if (data.records.countryData) {
					this.countryData = data.records.countryData;
				}
			}, error => {
				this.loadingMore = false;
				this.nextPage = '';
			})
		}, 600);
	}
}
