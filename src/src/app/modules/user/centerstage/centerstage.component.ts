import { Component, OnInit } from '@angular/core';

// Import Libraries
import { Router } from "@angular/router";
import { Options } from 'ng5-slider';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialog } from '@angular/material/dialog';

//Import Interface
import { User } from './../../../interfaces/user';
import { ChatListResponse } from './../../../interfaces/chat-list-response';
import { latestMessage } from '../../../interfaces/latest-message';
import { Message } from './../../../interfaces/message';
import { MessagesResponse } from './../../../interfaces/messages-response';


//Import services
import { MessageService } from '../../../eventservice';
import { footerService } from '../../../shared/services/footer/footer.service';
import { centerStageService } from '../../../shared/services/centerstage/centerstage.service';
import { dashboardService } from '../../../shared/services/dashboard/dashboard.service';
import { HeaderService } from '../../../shared/services/header/header.service';
import { userService } from '../../../shared/services/user/user.service';
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

declare var require: any


@Component({
	selector: 'app-centerstage',
	templateUrl: './centerstage.component.html',
	styleUrls: ['./centerstage.component.css'],
	host: {
		'(document:click)': 'onClick($event)',
	},
})
export class CenterstageComponent implements OnInit {
	lastIndex: any;
	userId: any;
	index: any;
	showChecked: any;
	showRefreshButton: any;
	selectedCountry: any;
	interest_user_id: any;
	coverBanner: any;
	dashboardBanner: any;
	selectedState: any;
	showCountryBanner: any;
	profileStatus: any;
	state_modal: any;
	page: number;
	interest_id: any;
	checkFilter: any;
	filterParams: any;
	interestFilter: any;
	new_to_me: any;
	complete_profile: any;
	common_values: any;
	most_engagement: any;
	recent_active: any;
	user_name: any;
	selected_country: any;
	selected_state: any;
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
	applyFilter: any = [];
	messageArray: any = []
	chatListUsers: User[] = [];
	isLinear = true;
	learnMore = false;
	apply_filter = false;
	show_no_data = false;
	displayddl = 'none';
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
	socketIntervalIns : any; 
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
		private userService: userService,
	) {
		window.scrollTo(0, 0)
		this.page = 1;
		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr)
		if (userData) {
			this.userId = userData.id;
			this.userData = userData;
		}

		this.fetchUserBanner();
		this.socket_userId = this.dataShareService.getUserId();
		this.getChatList();
	}

	backgroundImageFn = (set: any, sheetSize: number) =>
		this.backgroundUrl.replace(/\$\{set\}/g, set).replace(/\$\{sheetSize\}/g, String(sheetSize))

	ngOnInit() {
		this.loading = true;
		this.selectedState = '';
		this.selectedCountry = '';
		this.interest_id = '';
		this.displayRight = 'none';
		this.selected_country = 0;
		this.selected_state = 0;
		this.showCountryBanner = false;
		this.showRefreshButton = false;
		this.checkFilter = '';
		this.messageService.login('showHeaderSubscription');
		this.footerService.hidefooter(true);
		if (this.page == 1) {
			this.spinner.show();
		}
		this.centerstageservice.get_center_stage_profiles({ 'user_id': this.userId, 'page': this.page }).subscribe((data: any) => {
			console.log(data)
			this.get_biggest_admirer();
			this.spinner.hide();
			this.show_no_data = true;
			if (data.status == 'OK' && data.records.data) {
				if (this.page == 1) {
					this.centerStageUsers = data.records.data;
				} else {
					if (data.records.data) {
						data.records.data.forEach(obj => {
							this.centerStageUsers.push(obj);
						})
					}
				}
			}
			this.getUserNewCount();
			this.getUsersStory();
		}, error => {
			console.log(error);
			this.spinner.hide();
			this.toastr.errorToastr(error.error, 'Oops!', {
				position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
			});
		})


		// this.updateListMessages();
	}

	fetchUserBanner() {
		this.dashboardService.get_dashboard_banner().subscribe((data: any) => {
			console.log(data.video);
			this.spinner.hide();
			if (data.status == 'OK') {
				this.coverBanner = data.video;
			}
		}, error => {
			console.log(error);
			this.spinner.hide();
			//this.toastr.errorToastr(error.error, 'Oops!');
		})
	}


	get_biggest_admirer() {
		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr);
		if (userData) {
			this.spinner.show();
			this.dashboardService.get_biggest_admirer({ 'user_id': this.userId }).subscribe((data: any) => {
				console.log('-------', data);
				if (data && data.records) {
					this.biggestAdmirer = data.records.admirer;
					this.trueAdmir = data.records.admirer[0].interest;
					this.spinner.hide();
				} else {
					this.spinner.hide();
				}

			}, error => {
				this.spinner.hide();
				console.log(error);
				this.toastr.errorToastr(error.error, 'Oops!', {
					position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
				});
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
			console.log(this.chatListUsers);
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

	// //Message receive real time by socket
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
			console.log(data)
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

	//Fetch likes count
	getUserNewCount() {
		this.dashboardService.get_users_new_count({ 'user_id': this.userId }).subscribe((data: any) => {
			if (data.records) {
				this.newLikes = data.records.likes;
				this.admirers = data.records.admirers;
			}

			this.fetchCountriesData();
		}, error => {
			console.log(error);
			this.toastr.errorToastr(error.error, 'Oops!', {
				position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
			});
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
		}, error => {
			console.log(error);
			this.toastr.errorToastr(error.error, 'Oops!', {
				position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
			});
		})
	}

	//Fetch dashboard banner
	fetchDashboardBanner() {
		this.dashboardService.get_dashboard_banner().subscribe((data: any) => {
			console.log(data)
			if (data.records) {
				this.dashboardBanner = data.records[0];
			}

			this.stateBanner = data.state_banner;
		}, error => {
			console.log(error);
			this.toastr.errorToastr(error.error, 'Oops!', {
				position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
			});
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

	//Update user interest
	updateInterest(event, el, index) {
		event.preventDefault();
		if (this.centerStageUsers[index].user_interest && this.centerStageUsers[index].user_interest === el.value) {
			el.checked = false;
			this.centerStageUsers[index].user_interest = '';
		} else {
			this.centerStageUsers[index].user_interest = el.value
			el.checked = true;
		}
		this.lastIndex = -1;
		this.centerstageservice.update_interest({ 'interest': this.centerStageUsers[index].user_interest, 'interest_user_id': this.interest_user_id, 'user_id': this.userId }).subscribe((data: any) => {
			this.index = -1;
			// this.centerStageUsers[index].user_interest =  id;
			this.spinner.hide();
			if (el.value == 4) {
				this.centerStageUsers.splice(index, 1);
				this.toastr.successToastr('User Blocked successfully.', 'Success',
					{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
				);
			} else {
				this.toastr.successToastr('Record updated successfully.', 'Success',
					{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
				);
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
				this.toastr.successToastr('Record updated successfully.', 'Success',
					{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
				);
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

	//Centre stage filters
	filter(event, string) {
		this.page = 1;
		this.checkFilter = 'apply';
		this.apply_filter = true;
		if (string == 'apply_filter') {
			var index = this.applyFilter.indexOf(event);
			if (index == -1) {
				this.applyFilter.push(event)
			} else {
				this.applyFilter.splice(index, 1);
			}
			console.log(this.applyFilter)
			event = ''
			this.interest_id = ''
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
		}
		console.log(this.post_data)

		this.centerstageservice.get_users_profile_data(this.post_data).subscribe((data: any) => {
			this.spinner.hide();
			console.log(data);
			this.countryData = data.records.countryData;
			console.log(this.countryData);
			if (data.status == 'OK' && data.records.data) {
				this.centerStageUsers = data.records.data;
			} else {
				this.centerStageUsers = [];
			}
			this.show_no_data = true;
		}, error => {
			console.log(error);
			this.spinner.hide();
			this.toastr.errorToastr(error.error, 'Oops!', {
				position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
			});
		})
	}


	ReloadData() {
		this.checkFilter = '';
		this.interestFilter = null;
		this.page = 1;
		this.ngOnInit()
	}

	chooseCountry(country): void {
		this.state_modal = 0;
		this.selectedState = '';
		this.selectedCountry = country.target.value.split(':')[1].trim();
		console.log(this.selectedCountry);

		this.countiesArray.forEach(obj => {
			if (obj.id === Number(this.selectedCountry)) {
				this.statesArray = obj.states;
				console.log(this.statesArray);
			}
		})
	}

	chooseState(selectSate): void {
		this.selectedState = selectSate.target.value.split(':')[1].trim();

		this.statesArray.forEach(obj => {
			if (obj.id === Number(this.selectedState)) {
				console.log(obj);
				this.select_state_id = obj.id
			}
		})
	}

	videoModal(video): void {
		const dialogRef = this.dialog.open(videoUserComponent, {
			data: { 'video': video }
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}

	//Get more users
	onScrollDown() {
		console.log(this.checkFilter);
		console.log(this.apply_filter);
		this.page = this.page + 1;
		if (this.apply_filter == false) {
			console.log(this.page);
			this.ngOnInit()
		} else {
			this.post_data['page'] = this.page
			this.centerstageservice.get_users_profile_data(this.post_data).subscribe((data: any) => {
				console.log(data);
				this.spinner.hide();
				if (data.status == 'OK' && data.records.data) {
					data.records.data.forEach(obj => {
						this.centerStageUsers.push(obj);
					})
				}
			}, error => {
				console.log(error);
				this.spinner.hide();
				this.toastr.errorToastr(error.error, 'Oops!', {
					position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
				});
			})
		}
	}


	goToUserProfilePage(user) {
		this.dashboardService.visit_user_profile({ 'user_id': this.userId, 'visited_user': user.id }).subscribe((data: any) => {
			console.log(data);
		}, error => {
			console.log(error);
		})
		this.router.navigate(['home/dashboard/userprofile', { id: user.id }])
	}

	//Reset filters
	resetFilter(text) {
		this.apply_filter = false;
		this.show_no_data = false;
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
			'state': this.selectedState,
			'country': this.selectedCountry,
			'interest_id': this.interest_id,
			'filter': this.applyFilter,
			'user_id': this.userId,
		}
		console.log(post_data);

		this.centerstageservice.get_users_profile_data(post_data).subscribe((data: any) => {
			console.log(data);
			this.spinner.hide();
			if (data.status == 'OK' && data.records.data) {
				this.centerStageUsers = data.records.data;
			} else {
				this.centerStageUsers = [];
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
		this.displayddl = this.showMobileFilter ? "block" : "none";

		if(this.displayddl == 'block'){
			let el = document.getElementById('mobile-scl-filter');
			console.log(el)
			el.scrollIntoView({behavior:"smooth"});
		}
	}


	goToCountryDetailPage() {
		this.router.navigate(['home/dashboard/uservideo', { 'state': this.selectedState }])
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

	openLink(link) {
		window.open(link, '_blank');
	}

	openImage(user, index) {
		this._albums = []
		for (let i = 0; i < user.image.length; i++) {
			const src = user.image[i].path
			const album = {
				src: src
			};

			this._albums.push(album);
		}

		setTimeout(() => {
			const dialogRef = this.dialog.open(OpenImageComponent, {data : {'images' :this._albums, 'index' : index}});
			dialogRef.afterClosed().subscribe(result => {
			  console.log('The dialog was closed');
			  console.log(result);
			});
		}, 500)
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
		console.log(user);
		var message_time = this.formatAMPM(new Date())
		console.log(message_time);
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
		// console.log(selectedUser);


		var data = {
			first_name: selectedUser.user_name = selectedUser.user_name ? selectedUser.user_name : selectedUser.first_name,
			id: selectedUser.id,
			online: '',
			username: selectedUser.user_name = selectedUser.user_name ? selectedUser.user_name : selectedUser.first_name,
			path: ''
		}
		console.log(data)

		this.chatService.getMessages({ userId: this.userId, toUserId: selectedUser.id }).subscribe((response: MessagesResponse) => {
			this.spinner.hide();
			console.log(response.messages)
			if (response.messages.length == 0) {
				try {
					this.socketService.sendMessage(message);
					this.headerService.chatListReload(true);
					this.headerService.selectUser(data);
					this.dataShareService.changeSelectedUser(data);
					this.router.navigate(['home/dashboard/user-chat', { chat: 'dashboard' }]);
				} catch (error) {
					console.warn(error);
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
		console.log(message);
		try {
			this.toastr.successToastr('Video greeting send successfully.', 'Success',
				{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
			);
			this.socketService.sendMessage(message);
			this.headerService.chatListReload(true);
		} catch (error) {
			console.warn(error);
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
			console.log(data);
		}, error => {
			console.log(error);
		})
	}

	goToChatPageViewAll() {
		localStorage.removeItem("selectId");
		this.router.navigate(['home/dashboard/user-chat'])
	}




	openQuickView(index, user, string): void {
		this.headerService.selectUser(user);
		this.dataShareService.changeSelectedUser(user);
		if (string == 'biggestadmirer') {
			const dialogRef = this.dialog.open(QucikviewComponent, {
				data: { user: this.biggestAdmirer, page: this.page, index: index }
			});
			dialogRef.afterClosed().subscribe(result => {
			});
		}
	}


	showInterestOptions(data) {
		console.log(data);
		var showAdmin = this.showAdmir == 0 ? 1 : 0;
		this.showAdmir = showAdmin
		this.interest_user_id = data.id
		//  this.trueAdmir = data.interest
	}


	openTrustScorePopup(score) {
		const dialogRef = this.dialog.open(TrustScoreComponent, { data: { 'score': score } });
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			console.log(result);
		});
	}

	ngOnDestroy() {
		this.socketIntervalIns.unsubscribe();
	}
}