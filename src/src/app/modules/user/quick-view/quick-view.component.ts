import { Component, Inject, ViewChild, ElementRef, NgZone, EventEmitter } from '@angular/core';

//Import Libraries
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Options } from 'ng5-slider';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { trigger, style, animate, transition } from '@angular/animations';
import * as $ from 'jquery';


//Import interfaces
import { User } from './../../../interfaces/user';
import { MessagesResponse } from './../../../interfaces/messages-response';
import { Message } from './../../../interfaces/message';

//Import Services
import { FormService } from '../../../shared/services/form/form.service';
import { DataShareService } from '../../../shared/services/utils/data-share.service';
import { SocketService } from '../../../shared/services/socket/socket.service';
import { ChatService } from '../../../shared/services/chat/chat.service';
import { HeaderService } from '../../../shared/services/header/header.service';
import { dashboardService } from '../../../shared/services/dashboard/dashboard.service';
import { userService } from '../../../shared/services/user/user.service';
import { readUnraedMessage } from '../../../interfaces/readMessage';


//Import Components
import { ChooseGallaryComponent } from '../choose-gallary-chat/choose-gallary.component';
import { ChatConfimationComponent } from '../chat-confirmation/chat-confirmation.component';
import { videoUserComponent } from '../video-model-user/video-model.component';
import { PlanValidationPopup } from '../plan-validation-popup/plan-validation-popup.component';
import { OpenImageComponent } from '../open-image/open-image.component';


import Giphy from 'giphy-api';
declare var require: any


export interface DialogData {
	page: number;
	user: string;
	index: number;
	filter: any;
	filter_obj: any;
}

@Component({
	selector: 'app-quick-modal',
	templateUrl: './quick-view.component.html',
	styleUrls: ['./quick-view.component.css'],
	animations: [
		trigger(
			'enterUpper', [
			transition(':enter', [
				style({ transform: 'translateX(100%)', opacity: 0 }),
				animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
			]),
			transition(':leave', [
				style({ transform: 'translateX(0)', opacity: 1 }),
				animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
			])
		]
		)
	],
	host: {
		'(document:click)': 'onClick($event)',
	},
})


export class QucikviewComponent {
	@ViewChild('stepper', { static: false }) private myStepper: MatStepper;
	@ViewChild('files', { static: false }) myInputVariable: ElementRef;
	@ViewChild('scrollMe', { static: false }) private myScrollContainer: ElementRef;
	manualRefresh: EventEmitter<void> = new EventEmitter<void>();
	defaultImage = require('../../../../assets/chat/image-loader.gif');

	formGroup: FormGroup;
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	bookingForm: FormArray;
	userProfiles: any = [];
	userId: any;
	page: number;
	index: number;
	quickIndex: any;
	interest_user_id: any;
	trueClient: any;
	lastIndex: any;
	isFillterApply: any;
	filter_obj: any;
	public selectedUser: User = null;
	selectUserId: any;
	toUserId: any;
	blockedUesrId: any;
	showDiv: boolean = false;
	checkUserBlock: boolean = false;
	showEmoji: boolean = false;
	sendEmailType: any;

	plan_type: any;
	_albums: any = [];
	public messages: Message[] = [];
	public messageForm: FormGroup;
	public currentQuestion: number;
	profileImage: any;
	errorUpload: any;
	showError: boolean = false;
	showPopup: boolean = false;
	size = 22;
	sheetSize: 16 | 20 | 32 | 64 = 64;
	sheetRows = 57;
	sheetColumns = 57;
	backgroundUrl = 'https://unpkg.com/emoji-datasource-${set}@5.0.1/img/${set}/sheets-256/${sheetSize}.png';
	htmlString = '';
	sheet = 'apple';
	showDivData = false
	showGiphySearch = false;
	giphySearchTerm = 'clap';
	giphyResults = [];
	showSlider = false;
	private subscription;
	private getSelectedUser;


	interestRadio: any;
	interestOptions = [
		{ id: '1', name: 'Maybe', image: 'assets/dashboard/maybe1.png' },
		{ id: '2', name: 'Probably', image: 'assets/dashboard/probably1.png' },
		{ id: '3', name: 'Absolutely', image: 'assets/dashboard/absolutely.png' },
		{ id: '4', name: 'Not today', image: 'assets/dashboard/not_today.png' }
	];

	options: Options = {
		floor: 1,
		ceil: 5,
		showTicks: true,
		showSelectionBar: true,
		disabled: true,
	};


	constructor(
		private _formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<QucikviewComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		public dialog: MatDialog,
		private dashboardService: dashboardService,
		private spinner: NgxSpinnerService,
		private router: Router,
		private toastr: ToastrManager,
		public headerService: HeaderService,
		private dataShareService: DataShareService,
		private chatService: ChatService,
		private formService: FormService,
		private socketService: SocketService,
		public userservice: userService,
		private _ng: NgZone
	) {
		this.messageForm = this.formService.createMessageForm();
		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr)
		this.userId = userData.id;
		this.profileImage = userData.profile_img;
		this.plan_type = userData.plan_type;
		this.userProfiles = data.user;
		this.page = data.page;
		this.index = data.index;
		this.isFillterApply = data.filter;
		this.filter_obj = data.filter_obj

		this.formGroup = this._formBuilder.group({
			bookingForm: this._formBuilder.array([this._formBuilder.group({
				first_name: new FormControl(''),
				last_name: new FormControl(''),
				quickViewData: new FormControl(''),
				id: new FormControl(''),
				profileImage: new FormControl(''),
				interset: new FormControl(''),
				isOnline: new FormControl(''),
				category_score: new FormControl(''),
				id_proofs_badge: new FormControl(''),
				social_media_badge: new FormControl(''),
				center_stage_badge: new FormControl(''),
				profileStatus: new FormControl(''),
				gender : new FormControl('')

			})])
		})

		this.subscription = this.headerService.closePopup.subscribe((bit) => {
			console.log(bit);
			this.dialogRef.close();
		})
		this.searchGiphy();
	}


	formData() {
		return (this.formGroup.get('bookingForm') as FormArray).controls;
	}

	ngOnInit() {
		this.listenForMessages();
		// this.selectUserId = this.dataShareService.getUserId();
		let currentUesr =  localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr)
		this.selectUserId = userData.id;
		console.log(this.selectUserId);
		this.spinner.show();
		this.getSelectedUser = this.dataShareService.selectedUser.subscribe((selectedUser: User) => {
			if (selectedUser !== null) {
				this.selectedUser = selectedUser;
				console.log(this.selectedUser);

				this.getMessages(this.selectedUser.id);
				this.readUnreadMessages({
					type: 'all',
					fromUserId: this.userId,
					toUserId: this.selectedUser.id,
					messageID: '',
				})
			}
		});

		console.log(this.userProfiles);

		this.bookingForm = this.formGroup.get('bookingForm') as FormArray;
		this.userProfiles.forEach(obj => {
			this.bookingForm.push(
				this._formBuilder.group({
					first_name: new FormControl(obj.first_name),
					last_name: new FormControl(obj.last_name),
					quickViewData: new FormControl(obj.quickViewData.quesData),
					id: new FormControl(obj.id),
					profileImage: new FormControl(obj.profile_img),
					interset: new FormControl(obj.interest),
					isOnline: new FormControl(obj.is_online),
					category_score: new FormControl(obj.category_score),
					id_proofs_badge: new FormControl(obj.id_proofs_badge),
					social_media_badge: new FormControl(obj.social_media_badge),
					center_stage_badge: new FormControl(obj.center_stage_badge),
					profileStatus: new FormControl(obj.profileStatus),
					gender : new FormControl(obj.gender)

				})
			);
		})
		this.bookingForm.removeAt(0);


		setTimeout(() => {
			// console.log('Test');
			this.spinner.hide();
			this.manualRefresh.emit();
			this.showSlider = true

		}, 500);
	}

	listenForMessages(): void {
		this.socketService.receiveMessages().subscribe((socketResponse: any) => {
			console.log("socketResponse",socketResponse);
			var fromUserId = Number(socketResponse.fromUserId)
			if (this.selectedUser !== null && this.selectedUser.id === fromUserId && this.checkUserBlock == false) {
				this._ng.run(()=>{
					this.messages = [...this.messages, socketResponse];
					this.readUnreadMessages({
						type: 'single',
						fromUserId: this.userId,
						toUserId:  this.selectedUser.id,
						messageID: socketResponse.id
					})
				})
			}
		});
	}


	getMessages(toUserId: string) {
		this.toUserId = toUserId
		console.log(this.toUserId);
		console.log(this.selectUserId);
		this.chatService.getMessages({ userId: this.selectUserId, toUserId: toUserId }).subscribe((response: MessagesResponse) => {
			this.showDivData = true;
			this.messages = response.messages;
			this.blockedUesrId = response.blocked_by;
			this.checkUserBlock = response.blocked;
		}, error => {
			console.log(error);
			this.spinner.hide();
		});
	}

	sendMessage(event, tap) {
		this.showError = false;
		if (event.keyCode === 13 || tap == 'click') {
			const message = this.messageForm.controls['message'].value.trim();
			if (message === '' || message === undefined || message === null) {
				this.toastr.errorToastr("Message can't be empty.", 'Oops!', {
					position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
				});
			} else if (this.userId === '') {
				this.router.navigate(['/']);
			} else if (this.selectedUser.id === '') {
				alert(`Select a user to chat.`);
			} else {
				this.sendEmailType = 'simple';
				var message_time = this.formatAMPM(new Date())
				this.sendAndUpdateMessages({
					fromUserId: this.userId,
					message: (message).trim(),
					toUserId: this.selectedUser.id,
					message_time: message_time,
					type: 'simple',
					token: 'Bearer ' + localStorage.getItem('token')
				});
			}
		}
	}

	readUnreadMessages(read: readUnraedMessage) {
		this.socketService.readMessage(read);
	}


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

	sendAndUpdateMessages(message: Message) {
		console.log(message)
		this.showEmoji = false;
		try {
			this.sendEmailAfterMesssage();
			this.messageForm.disable();
			this.socketService.sendMessage(message);
			this.messages = [...this.messages, message];
			this.messageForm.reset();
			this.messageForm.enable();
		} catch (error) {
			console.warn(error);
			alert(`Can't send your message`);
		}
	}

	onClick(event) {
		if (event.target.id != 'check-open') {
			this.lastIndex = -1;
			this.quickIndex = -1;
		}
	}

	getUesr() {
		if (this.isFillterApply == false) {
			this.dashboardService.get_users_profile_data({ 'user_id': this.userId, page: this.page }).subscribe((data: any) => {
				this.spinner.hide();
				if (data.records) {
					data.records.data.forEach(obj => {
						this.bookingForm.push(
							this._formBuilder.group({
								first_name: new FormControl(obj.first_name),
								last_name: new FormControl(obj.last_name),
								quickViewData: new FormControl(obj.quickViewData.quesData),
								id: new FormControl(obj.id),
								profileImage: new FormControl(obj.profile_img),
								interset: new FormControl(obj.interest),
								isOnline: new FormControl(obj.is_online),
								category_score: new FormControl(obj.category_score),
								id_proofs_badge: new FormControl(obj.id_proofs_badge),
								social_media_badge: new FormControl(obj.social_media_badge),
								center_stage_badge: new FormControl(obj.center_stage_badge),
								profileStatus: new FormControl(obj.profileStatus),
								gender : new FormControl(obj.gender)

							})
						);
					})
				}
			}, error => {
				console.log(error);
				this.spinner.hide();
				//this.toastr.errorToastr(error.error, 'Oops!');
			})

		} else if (this.isFillterApply == true) {
			this.filter_obj['page'] = this.page

			this.dashboardService.get_users_profile_data(this.filter_obj).subscribe((data: any) => {
				console.log(data);
				this.spinner.hide();
				if (data.status == 'OK' && data.records.data) {
					data.records.data.forEach(obj => {
						this.bookingForm.push(
							this._formBuilder.group({
								first_name: new FormControl(obj.first_name),
								last_name: new FormControl(obj.last_name),
								quickViewData: new FormControl(obj.quickViewData.quesData),
								id: new FormControl(obj.id),
								profileImage: new FormControl(obj.profile_img),
								interset: new FormControl(obj.interest),
								isOnline: new FormControl(obj.is_online),
								category_score: new FormControl(obj.category_score),
								id_proofs_badge: new FormControl(obj.id_proofs_badge),
								social_media_badge: new FormControl(obj.social_media_badge),
								center_stage_badge: new FormControl(obj.center_stage_badge),
								profileStatus: new FormControl(obj.profileStatus),
								gender : new FormControl(obj.gender)

							})
						);
					})
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
	}

	goToNext(index) {
		this.messages = [];
		this.getMessages(this.bookingForm.controls[index + 1].value.id);
		if (index == this.bookingForm.controls.length - 2) {
			this.page = this.page + 1;
			this.getUesr()
		}
		this.myStepper.next();
	}

	goToPrev(index) {
		this.messages = [];
		this.getMessages(this.bookingForm.controls[index - 1].value.id);
		this.myStepper.previous();
	}


	dismissModal() {
		this.dialogRef.close();
	}

	goToDetailPage(item) {
		this.dialogRef.close();
		this.router.navigate(['home/dashboard/userprofile', { id: item.value.id }])
	}

	openInterestDiv(index, user) {
		if (this.lastIndex == index) {
			index = -1;
		}
		this.trueClient = user.value.interset
		this.interest_user_id = user.value.id
		this.quickIndex = index;
		this.lastIndex = this.quickIndex;
	}

	updateInterest(event, el, index) {
		event.preventDefault();
		if (this.bookingForm.controls[index].value.interset && this.bookingForm.controls[index].value.interset === el.value) {
			el.checked = false;
			this.bookingForm.controls[index].value.interset = '';
		} else {
			this.bookingForm.controls[index].value.interset = el.value
			el.checked = true;
		}

		this.spinner.show();
		this.lastIndex = -1;
		this.dashboardService.update_interest({ 'interest': this.bookingForm.controls[index].value.interset, 'interest_user_id': this.interest_user_id, 'user_id': this.userId }).subscribe((data: any) => {
			this.quickIndex = -1;
			let updateInterest = {
				index: index,
				id: el.value
			}
			this.headerService.changeInterest(updateInterest);
			if (el.value == 4) {
				this.bookingForm.removeAt(index);
			}
			console.log(data);
			this.spinner.hide();
		}, error => {
			console.log(error);
			this.spinner.hide();
			this.toastr.errorToastr(error.error, 'Oops!', {
				position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
			});
		})
	}


	fileProgress(fileInput: any) {
		this.showError = false;
		this.spinner.show();
		console.log(fileInput.target.files);
		if (fileInput.target.files && fileInput.target.files.length > 0) {
			var file = <File>fileInput.target.files[0];
			var mimeType = file.type;
			console.log(mimeType);
			if (mimeType.split('/')[0] == 'video') {
				var me = this;
				var mime = file.type;
				this.sendEmailType = 'video';

				//const fileReader: FileReader = new FileReader();

				var rd = new FileReader();
				rd.onload = (event: any) => {
					// this.imgURL = rd.result;

					console.log(event)
					if (event.target) {
						var result = event.target.result
						var blob = new Blob([result], { type: mime }),
							url = (URL || webkitURL).createObjectURL(blob),
							video = document.createElement("video");

						video.preload = "metadata";
						video.addEventListener("loadedmetadata", function () {
							console.log(video.duration)
							if (video.duration > 15) {
								me.spinner.hide();
								me.showError = true;
								me.errorUpload = "Please upload less then 15 second video.";

								// me.toastr.errorToastr("Please upload less then 15 second video", 'Oops!',   {
								//   position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
								// });
								return;
							}

							me.uploadImageVideo(file, mimeType)
							// ... continue from here ...
						});
						video.src = url;
					}
				};
				rd.readAsArrayBuffer(file);
			} else {
				this.sendEmailType = 'simple';
				console.log(mimeType.match(/image\/*/));
				if (mimeType.match(/image\/*/) == null && mimeType.match(/video\/*/) == null) {
					this.spinner.hide();
					this.showError = true;
					this.errorUpload = "Allowed Images and videos only.";
					// this.toastr.errorToastr("Allowed Images and videos only.", 'Oops!',   {
					// position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
					// });
					return;
				}
				this.uploadImageVideo(fileInput.target.files[0], mimeType)
			}
		}
	}


	uploadImageVideo(file, mimeType) {
		const formData = new FormData();
		formData.append('file', file);
		this.userservice.upload_images_video_chat(formData).subscribe((data: any) => {
			this.spinner.hide();
			this.myInputVariable.nativeElement.value = "";
			console.log(data);
			if (data.status == "error") {
				this.toastr.errorToastr(data.error, 'Oops!', {
					position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
				});
				return;
			}

			//this.show = false;
			var message_time = this.formatAMPM(new Date())
			this.sendAndUpdateMessages({
				fromUserId: this.userId,
				message: (data.url).trim(),
				toUserId: this.selectedUser.id,
				message_time: message_time,
				type: mimeType.split('/')[0],
				token: 'Bearer ' + localStorage.getItem('token')
			});
		}, error => {
			this.spinner.hide();
			this.myInputVariable.nativeElement.value = "";
			console.log(error);
			this.toastr.errorToastr(error.error, 'Oops!', {
				position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
			});
		})
	}


	sendEmailAfterMesssage() {
		var post_data = {
			'from_user': this.userId,
			'to_user': this.selectedUser.id,
			'type': this.sendEmailType
		}
		this.dashboardService.send_email_after_message(post_data).subscribe((data: any) => {
			console.log(data);
		}, error => {
			console.log(error);
		})
	}


	//Open user gallary to send images and videos
	opnGallary(): void {
		//this.show = false;
		this.showError = false;
		const dialogRef = this.dialog.open(ChooseGallaryComponent, { data: { condition: 'conversation' } });
		dialogRef.afterClosed().subscribe(result => {
			console.log(result)
			if (result) {
				let type = result.file_type == "image" ? 'image' : 'video';
				const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2)
				console.log(type);

				var message_time = this.formatAMPM(new Date())
				console.log(message_time);
				this.sendAndUpdateMessages({
					fromUserId: this.userId,
					message: (result.path).trim(),
					toUserId: this.selectedUser.id,
					message_time: message_time,
					type: type,
					token: 'Bearer ' + localStorage.getItem('token')
				});
			}
			console.log('The dialog was closed');
		});
	}


	//Clear chat history
	clearHistory() {
		const dialogRef = this.dialog.open(ChatConfimationComponent, { data: { name: 'clear' } });
		dialogRef.afterClosed().subscribe(result => {
			if (result == 'clear') {
				this.showDiv = false;
				this.messages = [];
				this.socketService.chatListUpdatedTrigger(this.userId);
				this.chatService.Clear_Chat({ userId: this.userId, toUserId: this.toUserId }).subscribe((response: MessagesResponse) => {
					console.log(response)
				});
			}
		})
	}

	//Block and unblock user
	blockUser(string) {
		if (string == 'block') {
			const dialogRef = this.dialog.open(ChatConfimationComponent, { data: { name: 'block' } });
			dialogRef.afterClosed().subscribe(result => {
				if (result == 'block') {
					this.showDiv = false;
					this.blockedUesrId = this.userId
					this.spinner.show();
					this.chatService.block_user_from_chat({ 'blocked_by': Number(this.userId), 'blocked_to': this.toUserId }).subscribe((response: MessagesResponse) => {
						this.spinner.hide();
						if (string == 'block') {
							this.checkUserBlock = true
						} else {
							this.checkUserBlock = false
						}
					});
				}
			})
		} else {
			this.spinner.show();
			this.chatService.unblock_user_from_chat({ 'blocked_by': Number(this.userId), 'blocked_to': this.toUserId }).subscribe((response: MessagesResponse) => {
				this.spinner.hide();
				console.log(response)
				this.showDiv = false;
				if (string == 'block') {
					this.checkUserBlock = true;
				} else {
					this.checkUserBlock = false;
				}
			});
		}
	}


	openVideoModal(video): void {
		const dialogRef = this.dialog.open(videoUserComponent, {
			data: { 'video': video }
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}

	open(data): void {
		this._albums = [];
		const album = {
			src: data.message
		};

		this._albums.push(album);
		const dialogRef = this.dialog.open(OpenImageComponent, {data : {'images' :this._albums, 'index' : 0}});
		dialogRef.afterClosed().subscribe(result => {
		console.log('The dialog was closed');
		console.log(result);
		});
	}

	backgroundImageFn = (set: string, sheetSize: number) =>
		this.backgroundUrl.replace(/\$\{set\}/g, set).replace(/\$\{sheetSize\}/g, String(sheetSize))


	addEmoji(event) {
		this.htmlString = event.emoji.native + this.htmlString;
		this.messageForm.patchValue({
			message: this.htmlString
		})
	}

	searchGiphy() {
		const giphy = Giphy();
		const searchTerm = this.giphySearchTerm;
		giphy.search(searchTerm)
			.then(res => {
				console.log(res);
				this.giphyResults = res.data;
			})
			.catch(console.error);
	}


	sendGif(title, url) {
		var message_time = this.formatAMPM(new Date())
		console.log(message_time);
		this.sendAndUpdateMessages({
			fromUserId: this.userId,
			message: (url).trim(),
			toUserId: this.selectedUser.id,
			message_time: message_time,
			type: 'image',
			token: 'Bearer ' + localStorage.getItem('token')
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
		this.getSelectedUser.unsubscribe();
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
}