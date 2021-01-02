import { Component, OnInit, ElementRef, Renderer2, ViewChild, HostListener } from '@angular/core';
import { HeaderService } from '../../../shared/services/header/header.service';
import { dashboardService } from '../../../shared/services/dashboard/dashboard.service';
//Import notification toast
import { ToastrManager } from 'ng6-toastr-notifications';
import { footerService } from '../../../shared/services/footer/footer.service';


//Import Api loader
import { NgxSpinnerService } from "ngx-spinner";
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


// Get chat list
import { User } from './../../../interfaces/user';
import { ChatListResponse } from './../../../interfaces/chat-list-response';
import { ChatService } from '../../../shared/services/chat/chat.service';
import { SocketService } from '../../../shared/services/socket/socket.service';
import { DataShareService } from '../../../shared/services/utils/data-share.service';
import { latestMessage } from '../../../interfaces/latest-message';
import { Message } from './../../../interfaces/message';
import { MessagesResponse } from './../../../interfaces/messages-response';
import * as $ from 'jquery';
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
export class UserdashboardComponent implements OnInit {
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
	socketIntervalIns : any;

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
	) {

		let currentUesr = localStorage.getItem("loginUser");
		this.footerService.hidefooter(true);
		let userData = JSON.parse(currentUesr);
		if (userData) {
			this.userId = userData.id
			this.userData = userData
		}
		//this.countiesArray = Country;
		this.displayddl = 'none';
		this.displayRight = 'none';
		this.page = 1;
		this.showCountryBanner = false;
		this.hideLoader = false;
		if(localStorage.getItem('userprofiles') == null ){
			window.scrollTo(0, 0)
		}
		this.optionObj = {
			'user_id': this.userId,
			'page': this.page
		}

		this.filterSubscription = this.headerService.onlineFilter.subscribe((bit) => {
			this.page = 1;

			if (bit === 'onlinenow' || bit === 'its_mutual' || bit === 'all_admirers' || bit === 'more_preferences') {
				;
				this.serviceMessage = bit;
				this.headerService.loggedIn(true);
				this.filterName = bit == 'onlinenow' ? 'is_online' : bit == 'its_mutual' ? 'its_mutual' : bit == 'more_preferences' ? 'more_preferences' : 'all_admirers';
				this.filterMobile(this.filterName)
			}
		})

		this.headerService.updateInterest.subscribe((bit) => {
			if (this.checkUser == 'simpleUsers') {
				this.userProfiles[bit.index].interest = bit.id;
			} else if (this.checkUser == 'centerStage') {
				this.centerStage[bit.index].interest = bit.id;
			}
		})

		this.subscription = this.headerService.reloadDashboard.subscribe((bit) => {
			console.log(this.filterName);
			window.scrollTo(0, 0)
			this.filterName = '';
			console.log(bit);
			if (bit == true) {
				this.page = 1;
				this.optionObj = {
					'user_id': this.userId,
					'page': this.page
				}

				this.user_name = '';
				this.interestFilter = null;
				this.new_to_me = '';
				this.complete_profile = '';
				this.common_values = '';
				this.most_engagement = '';
				this.recent_active = ''
				this.userProfiles = [];
				this.centerStage = [];
				this.countiesArray = [];
				this.biggestAdmirer = [];
				this.selected_country = 0;
				this.selected_state = 0;
				this.phillips_state = 0;
				this.showCountryBanner = false;
				this.statesArray = [];
				this.ngOnInit();
			}
		})

		this.get_dashboard_banner();
		this.socket_userId = this.dataShareService.getUserId();

	}

	backgroundImageFn = (set: any, sheetSize: number) =>
		this.backgroundUrl.replace(/\$\{set\}/g, set).replace(/\$\{sheetSize\}/g, String(sheetSize))

	onClick(event) {
		if (event.target.classList.value != 'ng-tns-c4-0' && event.target.classList.value != 'mat-radio-label-content' && event.target.id != 'check-open') {
			console.log('--------')
			this.index = -1;
			this.lastIndex = -1;
			this.indexCenter = -1;
			this.lastCenterIndex = -1;
			this.showAdmir = 0;
		}
	}



	ngOnInit() {
		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr)
		if (userData) {
			this.loading = true;
			this.get_profiles_data = false;
			this.apply_filter = false;
			this.selectedState = '';
			this.selectedCountry = '';
			this.showRefreshButton = false;
			if (this.page == 1 && this.hideLoader == false) {
				if(localStorage.getItem('userprofiles') == null ){
					this.spinner.show();
				}
			}
			this.userService.check_user_token().subscribe((data: any) => {
				console.log(data)
				this.headerService.loggedIn(true);
				this.get_biggest_admirer();
				this.get_center_stage_profiles();
				this.getUserNewCount();
				if(localStorage.getItem('userprofiles') == null ){
					this.dashboardService.get_users_profile_data(this.optionObj).subscribe((data: any) => {
						console.log(data)
						this.spinner.hide();
						if (data.records) {
							// this.totalUser =  data.records.totalUser;
							// this.items = Array(data.records.totalUser).fill(0).map((x, i) => ({ id: (i + 1)}));
							// console.log(this.items)
							if (this.page == 1) {
								this.userProfiles = data.records.data;
							} else {
								if (data.records.data) {
									data.records.data.forEach(obj => {
										this.userProfiles.push(obj);
									})
								}
							}
							this.get_profiles_data = true;
						}
					}, error => {
						this.spinner.hide();
						if (error.status == 401) {
							this.messageService.login('showHeaderFooter');
							localStorage.removeItem("loginUser");
							//localStorage.removeItem('notificationToken');
							localStorage.removeItem("token");
							this.router.navigate(['home']);
						} else {
							this.toastr.errorToastr(error.error, 'Oops!', {
								position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
							});
						}
					})
				}else{
					this.spinner.hide();
					let profiles  = localStorage.getItem('userprofiles')
					this.userProfiles = JSON.parse(profiles)
					let page = localStorage.getItem('page')
					this.page = JSON.parse(page);
					let scrollId = localStorage.getItem('scrollId');
					setTimeout(()=>{
						let el = document.getElementById(scrollId);
						el.scrollIntoView({behavior: 'auto',
						block: 'center',
						inline: 'center'});
						localStorage.removeItem('userprofiles')
						localStorage.removeItem('page')
						localStorage.removeItem('scrollId')

					},1000)
				}
			}, (error) => {
				if (error.status == 401) {
					this.messageService.login('showHeaderFooter');
					localStorage.removeItem("loginUser");
					localStorage.removeItem("token");
					this.router.navigate(['home']);
				}
			})
		} else {
			this.messageService.login('showHeaderFooter');
			localStorage.removeItem("loginUser");
			localStorage.removeItem("token");
			this.router.navigate(['home']);
		}
		this.getChatList();
	}

	async getChatList() {
		//user connected to socket.
		//First time on load trigger the chatlistUpdated Event
		this.socketService.chatListUpdatedTrigger(this.userId);

		//Subscribe to the chatListUpdated Event
		this.socketIntervalIns = this.socketService.chatListUpdated().subscribe((chatListResponse: ChatListResponse) => {
			console.log("ChatListResponse",chatListResponse);
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

	//Message receive real time by socket
	// updateListMessages(): void {
	// 	this.socketService.userList().subscribe((socketResponse: latestMessage) => {
	// 		// console.log(this.selectedUser.id)
	// 		console.log('list---', socketResponse)
	// 		socketResponse.usersList.forEach(user => {
	// 			console.log(user);
	// 			var countMessage = socketResponse.unread.find(x => x.fromUserId === user.id);
	// 			var countVideo = socketResponse.unreadVideo.find(x => x.fromUserId === user.id);
	// 			var messageCount = countMessage == undefined ? 0 : countMessage.unread_msg_counts;
	// 			var videoCount = countVideo == undefined ? 0 : countVideo.unread_msg_counts;
	// 			user['unread'] = messageCount + videoCount;
	// 		})
	// 		this.unread = socketResponse.unread;
	// 		this.unreadVideo = socketResponse.unreadVideo;
	// 		this.chatListUsers = socketResponse.usersList;
	// 		console.log(this.chatListUsers);
	// 	});
	// }

	fetchAllFoundOne() {
		const dialogRef = this.dialog.open(FoundConnectComponent, { data: { 'condition': 'dashboard', userId: '' } });

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			if (result) {
			}
		});
	}



	get_center_stage_profiles() {
		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr);
		if (userData) {
			this.dashboardService.get_center_stage_profiles({ 'user_id': this.userId }).subscribe((data: any) => {
				console.log(data);
				if (data.records) {
					this.centerStage = data.records.center;
				} else {
					this.centerStage = [];
					this.showNotFound = true;
				}
			}, error => {
				console.log(error);
				this.toastr.errorToastr(error.error, 'Oops!', {
					position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
				});
			})
		}
	}


	get_biggest_admirer() {
		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr);
		if (userData) {
			this.dashboardService.get_biggest_admirer({ 'user_id': this.userId }).subscribe((data: any) => {
				console.log('-------', data);
				if (data && data.records) {
					this.biggestAdmirer = data.records.admirer;
					this.trueAdmir = data.records.admirer[0].interest;
				}
				console.log(this.userData);

				if (data.found_one_count > 0 && this.userData.dashboard_visit == '0') {
					this.fetchAllFoundOne();
				}

			}, error => {
				console.log(error);
				this.toastr.errorToastr(error.error, 'Oops!', {
					position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
				});
			})
		}
	}

	getUserNewCount() {
		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr);
		if (userData) {
			this.dashboardService.get_users_new_count({ 'user_id': this.userId }).subscribe((data: any) => {
				console.log(data);
				if (data.records) {
					this.newLikes = data.records.likes;
					this.admirers = data.records.admirers;
					this.toggle = data.records.more_preference == "1" ? true : false;
				}
				this.get_users_Story();
				this.get_countries_data();
			}, error => {
				console.log(error);
				this.toastr.errorToastr(error.error, 'Oops!', {
					position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
				});
			})
		}
	}

	get_users_Story() {
		this.dashboardService.get_user_stories({ 'user_id': this.userId }).subscribe((data: any) => {
			console.log(data);
			this.showStory = true;
			if (data.status == "OK") {
				this.uesrStories = data.records;
			}
		}, error => {
			console.log(error);
			this.toastr.errorToastr(error.error, 'Oops!', {
				position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
			});
		})
	}


	get_countries_data() {
		this.dashboardService.get_countries_data().subscribe((data: any) => {
			if (data.status == "OK") {
				this.countiesArray = data.records;
				this.countiesArray.forEach(obj => {
					if (obj.name === 'Philippines') {
						console.log(obj);
						this.Philippines = obj.states
					}
				})
			}
		}, error => {
			console.log(error);
			this.toastr.errorToastr(error.error, 'Oops!', {
				position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
			});
		})
	}

	get_dashboard_banner() {
		this.dashboardService.get_dashboard_banner().subscribe((data: any) => {
			console.log(data);
			if (data.status == "OK") {
				if (data.records) {
					this.dashboardBanner = data.records[0];
				}
				this.bannerVideo = data.video;
				this.stateBanner = data.state_banner;
				if (this.userData.dashboard_visit == '1') {
					this.OnloadPopup(this.bannerVideo)
				}
			}
		}, error => {
			console.log(error);
			// this.toastr.errorToastr(error.error, 'Oops!', {
			// 	position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
			// });
		})
	}


	videoModal(video): void {
		console.log(video);
		if (video != undefined) {
			const dialogRef = this.dialog.open(videoUserComponent, { data: { 'video': video } });
			dialogRef.afterClosed().subscribe(result => {
				console.log('The dialog was closed');
			});
		}
	}


	videoStories(video, index): void {
		console.log(video);

		if (video != undefined) {
			const dialogRef = this.dialog.open(videoUserComponent, {
				data: { 'video': video.user_store }
			});

			dialogRef.afterClosed().subscribe(result => {
				console.log('The dialog was closed');


				this.dashboardService.view_user_stories({ user_id: this.userId, story_id: video.story_id }).subscribe((data: any) => {
					console.log(data);
					if (data.status == "OK") {
						this.uesrStories.splice(index, 1);
					}
				}, error => {
					console.log(error);
				})
			});
		}
	}

	OnloadPopup(video) {
		const dialogRef = this.dialog.open(WelcomeComponent, {
			data: { 'check': 'dashboard', video: video.video_path }
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}

	filter(event, string) {
		this.page = 1;
		this.apply_filter = true;
		if (string == 'apply_filter') {
			var index = this.applyFilter.indexOf(event);
			if (index == -1) {
				this.applyFilter.push(event)
			} else {
				this.applyFilter.splice(index, 1);
			}
			event = ''
			this.interest_id = '';
			this.showRefreshButton = false;
			this.interestFilter = null;
		} else if (string == 'dating_Interest') {
			this.showRefreshButton = true;
			this.applyFilter = [];
			this.new_to_me = '';
			this.complete_profile = '';
			this.common_values = '';
			this.most_engagement = '';
			this.recent_active = '';
			this.interest_id = event
		}

		if (this.selectedCountry) {
			this.showCountryBanner = true;
			window.scrollTo(0, 0);
		}
		this.post_data = {
			'user_name': this.user_name,
			'state': Number(this.selectedState),
			'country': Number(this.selectedCountry),
			'interest_id': this.interest_id,
			'filter': this.applyFilter,
			'user_id': this.userId,
			'tab': this.filterName,
			'page': this.page
		}

		console.log(this.post_data);

		this.dashboardService.get_users_profile_data(this.post_data).subscribe((data: any) => {
			console.log(data);
			this.spinner.hide();
			if (data.status == 'OK' && data.records.data) {
				this.userProfiles = data.records.data;
				let el = document.getElementById('mobile-user-list');
					console.log(el);
					el.scrollIntoView({behavior:"smooth"});
				if (data.records.countryData) {
					this.countryData = data.records.countryData;
					console.log(this.countryData);
					this.get_profiles_data = true;
				}
			} else {
				this.userProfiles = [];
			}
		}, error => {
			console.log(error);
			this.spinner.hide();
			this.toastr.errorToastr(error.error, 'Oops!', {
				position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
			});
		})
	}

	chooseCountry(country): void {
		console.log(country.target.value);
		this.phillips_state = 0;
		this.selectedCountry = country.target.value.split(':')[1].trim();
		console.log(this.selectedCountry);
		this.countiesArray.forEach(obj => {
			if (obj.id === Number(this.selectedCountry)) {
				this.statesArray = obj.states;
			}
		})
	}


	chooseState(selectSate): void {
		console.log(selectSate.target.value);

		this.selectedState = selectSate.target.value.split(':')[1].trim();
		this.statesArray.forEach(obj => {
			if (obj.id === Number(this.selectedState)) {
				console.log(obj);
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
		console.log(this.page)
		console.log(this.apply_filter);

		if (this.apply_filter == false) {
			this.optionObj = { 'user_id': this.userId, 'page': this.page }
			// this.ngOnInit()
			// this.showLoader = true;
			this.dashboardService.get_users_profile_data(this.optionObj).subscribe((data: any) => {
				console.log(data);
				this.spinner.hide();
				// this.showLoader = false;
				if (data.records) {
					if (data.records.data) {
						data.records.data.forEach(obj => {
							this.userProfiles.push(obj);
						})
					}
					this.get_profiles_data = true;
				}
			}, error => {
				// this.showLoader = true;
				console.log(error);
			})
		} else {
			this.post_data['page'] = this.page
			console.log(this.post_data);
			// this.showLoader = true;
			this.dashboardService.get_users_profile_data(this.post_data).subscribe((data: any) => {
				console.log(data);
				this.spinner.hide();
				// this.showLoader = false;
				if (data.status == 'OK' && data.records.data) {
					if (data.records.data) {
						data.records.data.forEach(obj => {
							this.userProfiles.push(obj);
						})
					}
				}
			}, error => {
				// this.showLoader = true;
				console.log(error);
				this.spinner.hide();
				this.toastr.errorToastr(error.error, 'Oops!', {
					position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
				});
			})
		}
	}

	openQuickView(index, user, string): void {
		this.headerService.selectUser(user);
		this.dataShareService.changeSelectedUser(user);
		if (string == 'simpleUsers') {
			this.checkUser = string
			const dialogRef = this.dialog.open(QucikviewComponent, {
				data: { user: this.userProfiles, page: this.page, index: index, filter: this.apply_filter, filter_obj: this.post_data }
			});
			dialogRef.afterClosed().subscribe(result => {
			});

		} else if (string == 'centerStage') {
			this.checkUser = string
			const dialogRef = this.dialog.open(QucikviewComponent, {
				data: { user: this.centerStage, page: this.page, index: index, filter: 'centerSatge' }
			});
			dialogRef.afterClosed().subscribe(result => {
			});
		} else if (string == 'biggestadmirer') {
			this.checkUser = string
			const dialogRef = this.dialog.open(QucikviewComponent, {
				data: { user: this.biggestAdmirer, page: this.page, index: index }
			});
			dialogRef.afterClosed().subscribe(result => {
			});
			user = user[0]
		}

		this.dashboardService.visit_user_profile({ 'user_id': this.userId, 'visited_user': user.id }).subscribe((data: any) => {
			console.log(data);
		}, error => {
			console.log(error);
			this.toastr.errorToastr(error.error, 'Oops!', {
				position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
			});
		})
	}


	showDiv(index, user) {
		console.log(user.interest);
		if (this.lastIndex == index) {
			index = -1;
		}
		// this.interestRadio = user.interest;
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

	update_Interest(event, el, index, string) {
		event.preventDefault();

		if (string == 'user') {
			if (this.userProfiles[index].interest && this.userProfiles[index].interest === el.value) {
				el.checked = false;
				this.userProfiles[index].interest = '';
			} else {
				this.userProfiles[index].interest = el.value
				el.checked = true;
			}

			this.interestRadio = this.userProfiles[index].interest
		} else if (string == 'center') {
			if (this.centerStage[index].interest && this.centerStage[index].interest === el.value) {
				el.checked = false;
				this.centerStage[index].interest = '';
			} else {
				this.centerStage[index].interest = el.value
				el.checked = true;
			}
			this.interestRadio = this.centerStage[index].interest
		}

		this.spinner.show();
		this.lastIndex = -1;
		this.lastCenterIndex = -1;
		this.dashboardService.update_interest({ 'interest': this.interestRadio, 'interest_user_id': this.interest_user_id, 'user_id': this.userId }).subscribe((data: any) => {
			this.index = -1;
			this.indexCenter = -1;
			this.spinner.hide();

			if (el.value == 4) {
				if (string == 'user') {
					this.userProfiles.splice(index, 1);
				} else if (string == 'center') {
					this.centerStage.splice(index, 1);
				}
				this.toastr.successToastr('User Blocked successfully.', 'Success',
					{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
				);
			} else {
				//   this.toastr.successToastr('Record updated successfully.', 'Success',
				//     { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
				// );
			}
		}, error => {
			console.log(error);
			this.spinner.hide();
			this.toastr.errorToastr(error.error, 'Oops!', {
				position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
			});
		})
	}

	update_Interest_admir(event, el) {
		event.preventDefault();
		if (this.trueAdmir && this.trueAdmir === el.value) {
			el.checked = false;
			this.trueAdmir = '';
		} else {
			this.trueAdmir = el.value
			el.checked = true;
		}
		this.dashboardService.update_interest({ 'interest': el.value, 'interest_user_id': this.interest_user_id, 'user_id': this.userId }).subscribe((data: any) => {
			this.spinner.hide();

			if (el.value == 4) {
				this.biggestAdmirer.splice(0, 1);
				this.toastr.successToastr('User Blocked successfully.', 'Success',
					{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
				);
			} else {
				// this.toastr.successToastr('Record updated successfully.', 'Success',
				//   { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
				// );
			}
			this.showAdmir = 0;
			console.log(data);
		}, error => {
			console.log(error);
			this.spinner.hide();
			this.toastr.errorToastr(error.error, 'Oops!', {
				position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
			});
		})

	}

	ReloadData() {
		this.interest_id = '';
		this.interestFilter = null;
		this.page = 1;
		this.optionObj = {
			'user_id': this.userId,
			'page': this.page
		}
		this.ngOnInit()
	}

	goToDetailPage(user, id) {
		localStorage.setItem('userprofiles' , JSON.stringify(this.userProfiles))
		console.log(this.page);
		localStorage.setItem('page' , JSON.stringify(this.page))
		localStorage.setItem('scrollId' , JSON.stringify(id))
		this.userProfiles = [];
		// this.dashboardService.visit_user_profile({ 'user_id': this.userId, 'visited_user': user.id }).subscribe((data: any) => {
		// 	console.log(data);
		// }, error => {
		// 	console.log(error);
		// })
		this.router.navigate(['home/dashboard/userprofile', { id: user.id }])
	}

	apply_for_center_stage() {
		this.router.navigate(['home/centerstage/cupg'])
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
			console.log(data);
			this.spinner.hide();
			if (data.status == 'OK' && data.records.data) {
				this.userProfiles = data.records.data;
			} else {
				this.userProfiles = [];
			}
		}, error => {
			console.log(error);
			this.spinner.hide();
			this.toastr.errorToastr(error.error, 'Oops!', {
				position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
			});
		})
	}

	show_popup(string) {
		const dialogRef = this.dialog.open(PlanValidationPopup, {
			data: { name: string }
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log(result);
		})

		return
	}

	goToNotificationPage() {
		this.router.navigate(['home/dashboard/notification'])
	}

	showInterestOptions(data) {
		console.log(data);
		var showAdmin = this.showAdmir == 0 ? 1 : 0;
		this.showAdmir = showAdmin
		this.interest_user_id = data.id
		//  this.trueAdmir = data.interest
	}

	goToPhilipinePage() {
		const dialogRef = this.dialog.open(PhilipinesComponent, {
			data: { name: this.Philippines }
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log(result);
			if (result) {
				this.selected_country = 0;
				this.selected_state = 0;
				this.selectedCountry = 174;
				this.selectedState = result;
				this.filter('', 'country_state')
			}
		})

	}

	filterMobile(string) {
		console.log(string);

		var elems = document.querySelector(".active-filter");
		if (elems !== null) {
			elems.classList.remove("active-filter");
		}

		if (string == 'is_online') {
			this.selectedFilterName = 'ONLINE NOW';
			var addActive = document.querySelector(".is_online");
			console.log(addActive)
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
		this.displayddl = 'none';
		this.filterName = string;
		this.filter('', 'tabs')
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
		this.displayddl = this.showMobileFilter ? "block" : "none";
		console.log(this.displayddl);

		if(this.displayddl == 'block'){
			let el = document.getElementById('mobile-scl-filter');
			console.log(el)
			el.scrollIntoView({behavior:"smooth"});
		}
	}



	ShowRight() {
		this.ShowRightOnMobile = !this.ShowRightOnMobile;
		this.displayRight = this.ShowRightOnMobile ? "block" : "none";
	}


	goToCountryDetailPage() {
		this.router.navigate(['home/dashboard/uservideo', { 'state': this.selectedState }])
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
		console.log(user);
		const dialogRef = this.dialog.open(ChooseGallaryComponent, { data: { condition: 'dashboard' } });
		dialogRef.afterClosed().subscribe(result => {
			console.log(result)
			if (result) {
				var message_time = this.formatAMPM(new Date())
				console.log(message_time);
				this.sendAndUpdateMessages({
					fromUserId: this.userId,
					message: (result.path).trim(),
					toUserId: user.id,
					message_time: message_time,
					type: 'video',
					token: 'Bearer ' + localStorage.getItem('token')
				}, user.id);
			}
			console.log('The dialog was closed');
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
			console.log(data);
		}, error => {
			console.log(error);
		})
	}

	toggleFilter(e, string) {
		var preferenceValue = e == true ? '1' : '0';
		console.log(string);
		// this.spinner.show();
		this.userService.set_More_Preferences({ 'preference': preferenceValue }).subscribe((data: any) => {
			console.log(data);
			this.filterMobile(string)
		}, error => {
			this.spinner.hide();
			console.log(error);
		})
	}

	goToChatPageViewAll() {
		localStorage.removeItem("selectId");
		this.router.navigate(['home/dashboard/user-chat'])
	}


	goToChatPage(item) {
		console.log(item);
		var message_time = this.formatAMPM(new Date())
		console.log(message_time);
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
			console.log(response.messages)
			if (response.messages.length == 0) {
				try {
					this.socketService.sendMessage(message);
					this.headerService.selectUser(item);
					this.dataShareService.changeSelectedUser(item);
					this.router.navigate(['home/dashboard/user-chat', { chat: 'dashboard' }]);
				} catch (error) {
					console.warn(error);
					alert(`Can't send your message`);
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
	}
}
