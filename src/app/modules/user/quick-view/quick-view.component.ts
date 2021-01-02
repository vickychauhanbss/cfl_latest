import { Component, Inject, ViewChild, ElementRef, NgZone, EventEmitter, OnInit,AfterViewInit } from '@angular/core';

//Import Libraries
import { FormBuilder, FormGroup } from '@angular/forms';
import { Options } from 'ng5-slider';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { trigger, style, animate, transition, query, group } from '@angular/animations';
import * as $ from 'jquery';


//Import interfaces
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
declare var EmojiPicker;
import jquery from 'jquery';
export interface DialogData {
	user: any;
	page: number;
	dataLength: number;
	index: number;
	filter: any;
	filter_obj: any;
}

const left = [
	group([
		query(':enter', [style({ opacity:  0, position : 'absolute' })], {
			optional: true,
		}),
		query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
			optional: true,
		}),
	]),
];

const right = [
	group([
		query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
			optional: true,
		}),
		query(':leave', [style({ opacity:  0, position : 'absolute' })], {
			optional: true,
		}),
	])
];

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
		),
		trigger('animSlider', [
			transition(':increment', right),
			transition(':decrement', left),
		]),
	],
	host: {
		'(document:click)': 'onClick($event)',
	},
})

export class QucikviewComponent implements OnInit, AfterViewInit {
	counter: number = 0;
	dataLength = 0;
	user  : any;
	onDataChange = new EventEmitter();
	onupdateInterest = new EventEmitter();
	quickIndex : number  = -1;
	interestOptions = [
		{ id: '1', name: 'Maybe', image: 'assets/dashboard/maybe1.png' },
		{ id: '2', name: 'Probably', image: 'assets/dashboard/probably1.png' },
		{ id: '3', name: 'Absolutely', image: 'assets/dashboard/absolutely.png' },
		{ id: '4', name: 'Not today', image: 'assets/dashboard/not_today.png' }
	];
	currentUesr = JSON.parse(localStorage.getItem("loginUser"));
	blockedUesrId: any;
	showDiv: boolean = false;
	checkUserBlock: boolean = false;
	sendEmailType: any;
	public messages: Message[] = [];
	public messageForm: FormGroup;
	showEmoji: boolean = false;
	defaultImage = require('../../../../assets/chat/image-loader.gif');
	_albums: any = [];
	htmlString = '';
	giphySearchTerm = 'clap';
	giphyResults = [];
	@ViewChild('files', { static: false }) myInputVariable: ElementRef;
	showDivData = false;
	options: Options = {
		floor: 1,
		step: 1,
		ceil: 5,
		showTicks: true,
		showSelectionBar: true,
		disabled: true,
		animate: true
	};
	backgroundUrl = 'hhttps://unpkg.com/emoji-datasource-apple@5.0.1/img/apple/sheets-256/64.png';
	errorUpload: any;
	showError: boolean = false;
	sheetRows = 57;
	sheetColumns = 57;
	sheet = 'apple';
	size = 20;
	sheetSize: 20;
	manualRefresh: EventEmitter<void> = new EventEmitter<void>();
	constructor(
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
		
	}

	ngOnInit() {
		this.dataLength = this.data.dataLength;
		this.counter = this.data.index;
		this.user = this.data.user;
		this.dataUpdated();
	}

	ngAfterViewInit() {
		setTimeout(()=> {
			this.manualRefresh.emit();
		},200);
		window.scrollTo({ top :0 });
	}

	sendGif(title, url) {
		var message_time = this.formatAMPM(new Date())
		this.sendAndUpdateMessages({
			fromUserId: this.currentUesr.id,
			message: (url).trim(),
			toUserId: this.user.id,
			message_time: message_time,
			type: 'image',
			token: 'Bearer ' + localStorage.getItem('token')
		});
	}

	
	dataUpdated() {
		this.messageForm = this.formService.createMessageForm();
		this.listenForMessages();
		this.searchGiphy();
		this.getMessages(this.user.id);
		this.readUnreadMessages({
			type: 'all',
			fromUserId: this.currentUesr.id,
			toUserId: this.user.id,
			messageID: '',
		});
	}

	getMessages(toUserId: string) {
		this.messages = [];
		this.chatService.getMessages({ userId: this.currentUesr.id, toUserId: this.user.id }).subscribe((response: MessagesResponse) => {
			this.showDivData = true;
			this.messages = response.messages;
			this.blockedUesrId = response.blocked_by;
			this.checkUserBlock = response.blocked;
		});
	}

	onNext() {
		if (this.counter != this.dataLength - 1) {
			this.counter++;
		}
		this.onDataChange.emit(this.counter);
	}

	onPrevious() {
		if (this.counter > 0) {
			this.counter--;
		}
		this.onDataChange.emit(this.counter);
	}

	dismissModal() {
		this.dialogRef.close();
	}

	openInterestDiv(index) {
		this.quickIndex = index;
	}

	updateInterest(value) {
		this.onupdateInterest.emit({
			index : this.counter,
			value : value
		})
	}

	goToDetailPage(item) {
		this.dialogRef.close();
		this.router.navigate(['home/dashboard/userprofile', { id: item.id }])
	}

	onClick(event) {
		if (event.target.id != 'check-open') {
			this.quickIndex = -1;
		}
	}

	show_popup(string) {
		const ref = this.dialog.open(PlanValidationPopup, {
			data: { name: string }
		});
		ref.afterClosed().subscribe(res => {
			if(res =='closedOther') {
				this.dialogRef.close();
			}
		})
		// return
	}

	clearHistory() {
		const dialogRef = this.dialog.open(ChatConfimationComponent, { data: { name: 'clear' } });
		dialogRef.afterClosed().subscribe(result => {
			if (result == 'clear') {
				this.showDiv = false;
				this.messages = [];
				this.socketService.chatListUpdatedTrigger(this.currentUesr.id);
				this.chatService.Clear_Chat({ userId: this.currentUesr.id, toUserId: this.user.id }).subscribe((response: MessagesResponse) => {
				});
			}
		})
	}

	blockUser(string) {
		if (string == 'block') {
			const dialogRef = this.dialog.open(ChatConfimationComponent, { data: { name: 'block' } });
			dialogRef.afterClosed().subscribe(result => {
				if (result == 'block') {
					this.showDiv = false;
					this.blockedUesrId = this.currentUesr.id
					this.spinner.show();
					this.chatService.block_user_from_chat({ 'blocked_by': Number(this.currentUesr.id), 'blocked_to': this.user.id }).subscribe((response: MessagesResponse) => {
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
			this.chatService.unblock_user_from_chat({ 'blocked_by': Number(this.currentUesr.id), 'blocked_to': this.user.id }).subscribe((response: MessagesResponse) => {
				this.spinner.hide();
				this.showDiv = false;
				if (string == 'block') {
					this.checkUserBlock = true;
				} else {
					this.checkUserBlock = false;
				}
			});
		}
	}

	listenForMessages(): void {
		this.socketService.receiveMessages().subscribe((socketResponse: any) => {
			var fromUserId = Number(socketResponse.fromUserId)
			if (this.user !== null && this.user.id === fromUserId && this.checkUserBlock == false) {
				this._ng.run(()=>{
					this.messages = [...this.messages, socketResponse];
					this.readUnreadMessages({
						type: 'single',
						fromUserId: this.currentUesr.id,
						toUserId:  this.user.id,
						messageID: socketResponse.id
					})
				})
			}
		});
	}

	readUnreadMessages(read: readUnraedMessage) {
		this.socketService.readMessage(read);
	}

	sendMessage(event, tap) {
		// this.showError = false;
		if (event.keyCode === 13 || tap == 'click') {
			const message = this.messageForm.controls['message'].value.trim();
			if (message === '' || message === undefined || message === null) {
				this.toastr.errorToastr("Message can't be empty.", 'Oops!', {
					position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
				});
			} else if (this.currentUesr.id === '') {
				this.router.navigate(['/']);
			} else if (this.user.id === '') {
				alert(`Select a user to chat.`);
			} else {
				this.sendEmailType = 'simple';
				var message_time = this.formatAMPM(new Date())
				this.sendAndUpdateMessages({
					fromUserId: this.currentUesr.id,
					message: (message).trim(),
					toUserId: this.user.id,
					message_time: message_time,
					type: 'simple',
					token: 'Bearer ' + localStorage.getItem('token')
				});
			}
		}
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
		this.showEmoji = false;
		try {
			this.sendEmailAfterMesssage();
			this.messageForm.disable();
			this.socketService.sendMessage(message);
			this.messages = [...this.messages, message];
			this.messageForm.reset();
			this.messageForm.enable();
		} catch (error) {
			alert(`Can't send your message`);
		}
	}

	sendEmailAfterMesssage() {
		var post_data = {
			'from_user': this.currentUesr.id,
			'to_user': this.user.id,
			'type': this.sendEmailType
		}
		this.dashboardService.send_email_after_message(post_data).subscribe((data: any) => {})
	}

	open(data): void {
		this._albums = [];
		const album = {
			src: data.message
		};
		this._albums.push(album);
		this.dialog.open(OpenImageComponent, {data : {'images' :this._albums, 'index' : 0}});
	}

	openVideoModal(video): void {
		this.dialog.open(videoUserComponent, {
			data: { 'video': {
				path : video
			} }
		});
	}

	addEmoji(event) {
		if(event.emoji.native != null) {
			const message = this.messageForm.get('message').value+""+event.emoji.native;
			this.messageForm.patchValue({
				message: message
			})
		}
	}

	searchGiphy() {
		const giphy = Giphy();
		const searchTerm = this.giphySearchTerm;
		giphy.search(searchTerm)
			.then(res => {
				this.giphyResults = res.data;
			})
			.catch(console.error);
	}

	fileProgress(fileInput: any) {
		this.showError = false;
		this.spinner.show();
		if (fileInput.target.files && fileInput.target.files.length > 0) {
			var file = <File>fileInput.target.files[0];
			var mimeType = file.type;
			if (mimeType.split('/')[0] == 'video') {
				var me = this;
				var mime = file.type;
				this.sendEmailType = 'video';

				//const fileReader: FileReader = new FileReader();

				var rd = new FileReader();
				rd.onload = (event: any) => {
					if (event.target) {
						var result = event.target.result
						var blob = new Blob([result], { type: mime }),
							url = (URL || webkitURL).createObjectURL(blob),
							video = document.createElement("video");

						video.preload = "metadata";
						video.addEventListener("loadedmetadata", function () {
							if (video.duration > 15) {
								me.spinner.hide();
								me.showError = true;
								me.errorUpload = "Please upload less then 15 second video.";

								me.toastr.errorToastr("Please upload less then 15 second video", 'Oops!',   {
								  position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
								});
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
				if (mimeType.match(/image\/*/) == null && mimeType.match(/video\/*/) == null) {
					this.spinner.hide();
					this.showError = true;
					this.errorUpload = "Allowed Images and videos only.";
					this.toastr.errorToastr("Allowed Images and videos only.", 'Oops!',   {
					position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
					});
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
				if (data.status == "error") {
				this.toastr.errorToastr(data.error, 'Oops!', {
					position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
				});
				return;
			}

			//this.show = false;
			var message_time = this.formatAMPM(new Date())
			this.sendAndUpdateMessages({
				fromUserId: this.currentUesr.id,
				message: (data.url).trim(),
				toUserId: this.user.id,
				message_time: message_time,
				type: mimeType.split('/')[0],
				token: 'Bearer ' + localStorage.getItem('token')
			});
		}, error => {
			this.spinner.hide();
			this.myInputVariable.nativeElement.value = "";
		})
	}

	backgroundImageFn = (set: string, sheetSize: number) =>
		this.backgroundUrl.replace(/\$\{set\}/g, set).replace(/\$\{sheetSize\}/g, String(sheetSize))


		//Open user gallary to send images and videos
	opnGallary(): void {
		//this.show = false;
		this.showError = false;
		const dialogRef = this.dialog.open(ChooseGallaryComponent, { data: { condition: 'conversation' } });
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				let type = result.file_type == "image" ? 'image' : 'video';
				const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2)
				var message_time = this.formatAMPM(new Date())
				this.sendAndUpdateMessages({
					fromUserId: this.currentUesr.id,
					message: (result.path).trim(),
					toUserId: this.user.id,
					message_time: message_time,
					type: type,
					token: 'Bearer ' + localStorage.getItem('token')
				});
			}
		});
	}
}