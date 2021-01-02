import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';


/* Importing services starts*/
import { ChatService } from '../../../shared/services/chat/chat.service';
import { SocketService } from '../../../shared/services/socket/socket.service';
import { FormService } from '../../../shared/services/form/form.service';
import { DataShareService } from '../../../shared/services/utils/data-share.service';
/* Importing services ends*/

/* importing interfaces starts */
import { MessagesResponse } from './../../../interfaces/messages-response';
import { Message } from './../../../interfaces/message';
import { User } from './../../../interfaces/user';
import { readUnraedMessage } from '../../../interfaces/readMessage';


import { footerService } from '../../../shared/services/footer/footer.service';
import { MessageService } from '../../../eventservice';
/* importing interfaces ends */

import { ChooseGallaryComponent } from '../choose-gallary-chat/choose-gallary.component';
import { videoUserComponent } from '../video-model-user/video-model.component';
import { userService } from '../../../shared/services/user/user.service';

import { MatDialog } from '@angular/material/dialog';
import { trigger, style, animate, transition } from '@angular/animations';
import { ChatConfimationComponent } from '../chat-confirmation/chat-confirmation.component';
import { dashboardService } from '../../../shared/services/dashboard/dashboard.service';
import { OpenImageComponent } from '../open-image/open-image.component';



import { HeaderService } from '../../../shared/services/header/header.service';
import { NgxSpinnerService } from "ngx-spinner";
import Giphy from 'giphy-api';
declare var require: any




@Component({
	selector: 'app-conversation',
	templateUrl: './conversation.component.html',
	styleUrls: ['./conversation.component.css'],
	host: {
		'(document:click)': 'onClick($event)',
	},
	animations: [
		trigger(
			'enterAnimation', [
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
})
export class ConversationComponent implements OnInit {
	public messageLoading = true;
	public userId: string = null;
	public selectedUser: User = null;
	public messages: Message[] = [];
	public messageForm: FormGroup;
	public userImage: any;
	public userData: any;
	show: boolean = false;
	showDiv: boolean = false;
	filter: boolean = false;
	showEmoji: boolean = false;
	checkUserBlock: boolean = false;
	toUserId: any;
	fileData: File = null;
	type: any;
	originalArray: any = [];
	blockedUesrId: any;
	fetchGifs: any;
	message: any;
	selectedEmoji: any;
	sendEmailType : any;
	_albums: any = [];

	showGiphySearch = false;
	giphySearchTerm = 'clap';
	giphyResults = [];


	size = 22;
	sheetSize: 16 | 20 | 32 | 64 = 64;
	sheetRows = 57;
	sheetColumns = 57;
	backgroundUrl = 'https://unpkg.com/emoji-datasource-${set}@5.0.1/img/${set}/sheets-256/${sheetSize}.png';
	htmlString = '';
	sheet = 'apple';
	// size = 22;
	// sheetSize = 64;
	defaultImage = require('../../../../assets/chat/image-loader.gif');



	@ViewChild('messageThread', { static: false }) private messageContainer: ElementRef;
	@ViewChild('files', { static: false }) myInputVariable: ElementRef;
	@ViewChild('scrollMe', { static: false }) private myScrollContainer: ElementRef;
	messageListnerIns : any;

	constructor(
		private router: Router,
		private chatService: ChatService,
		private socketService: SocketService,
		private formService: FormService,
		private dataShareService: DataShareService,
		private footerService: footerService,
		private messageService: MessageService,
		private toastr: ToastrManager,
		public dialog: MatDialog,
		public userservice: userService,
		public headerService: HeaderService,
		private spinner: NgxSpinnerService,
		private route: ActivatedRoute,
		private dashboardService: dashboardService,


	) {
		this.messageForm = this.formService.createMessageForm();
		this.searchGiphy();
	}

	ngOnInit() {
		// var gmtDateTime = moment.utc("2015-10-24 20:00", "YYYY-MM-DD HH")
		// var local = gmtDateTime.local().format('YYYY-MMM-DD h:mm A');
		// console.log(local);
		this.messageService.login('showHeaderSubscription');
		this.footerService.hidefooter(true);
		this.listenForMessages();
		this.dataShareService.selectedUser.subscribe((selectedUser: User) => {
			let currentUesr =  localStorage.getItem("loginUser");
			let userData = JSON.parse(currentUesr)
			this.userId = userData.id;
			console.log(this.userId);
			if (selectedUser !== null) {
				this.selectedUser = selectedUser;
				this.getMessages(this.selectedUser.id);
				this.readUnreadMessages({
					type: 'all',
					fromUserId: this.userId,
					toUserId: this.selectedUser.id,
					messageID: '',
				})
			}
		});

		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr)
		this.userData = userData;


		if (this.route.snapshot.paramMap.get('chat')) {
			console.log(this.route.snapshot.paramMap.get('chat'));

			[].forEach.call(document.querySelectorAll('.mobile-show'), function (el) {
				el.style.display = 'none';
			});
			this.router.navigate(['home/dashboard/user-chat', {}]);
		}

		if (this.route.snapshot.paramMap.get('header')) {
			console.log(this.route.snapshot.paramMap.get('header'));

			[].forEach.call(document.querySelectorAll('.show-mobile-converstion'), function (el) {
				el.style.display = 'none';
			});
			this.router.navigate(['home/dashboard/user-chat', {}]);
		}

	}

	onClick(event) {
		
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
	toggleGiphySearch() {
		this.showGiphySearch = !this.showGiphySearch;
	}



	readUnreadMessages(read: readUnraedMessage) {
		this.socketService.readMessage(read);
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


	// Get user conversation
	getMessages(toUserId: string) {
		this.show = false;
		this.toUserId = toUserId
		this.messageLoading = true;
		this.spinner.show();
		this.chatService.getMessages({ userId: this.userId, toUserId: toUserId }).subscribe((response: MessagesResponse) => {
			console.log(response)
			this.spinner.hide();
			this.messages = response.messages;
			this.checkUserBlock = response.blocked;
			this.blockedUesrId = response.blocked_by;
			this.originalArray = response.messages;
			this.messageLoading = false;
		},(error) => {
			this.spinner.hide();
			console.log(error);
		});
	}


	//Message receive real time by socket
	listenForMessages(): void {
		this.messageListnerIns = this.socketService.receiveMessages().subscribe((socketResponse: any) => {
			var fromUserId = Number(socketResponse.fromUserId)
			if (this.selectedUser !== null && this.selectedUser.id === fromUserId && this.checkUserBlock == false) {
				this.messages = [...this.messages, socketResponse];
				this.readUnreadMessages({
					type: 'single',
					fromUserId: this.userId,
					toUserId:  this.selectedUser.id,
					messageID: socketResponse.id
				})
			}
		});
	}

	//Send message to selected user
	sendMessage(event, tap) {
		this.showEmoji = false;
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


	//Send and update user message
	sendAndUpdateMessages(message: Message) {
		this.showEmoji = false;
		try {
			this.sendEmailAfterMesssage()
			this.messageForm.disable();
			this.socketService.sendMessage(message);
			this.messages = [...this.messages, message];
			this.originalArray = [...this.originalArray, message];
			this.htmlString = '';
			this.messageForm.reset();
			this.messageForm.enable();
		} catch (error) {
			console.warn(error);
			alert(`Can't send your message`);
		}
	}

	//Scroll down 
	scrollMessageContainer(): void {
		console.log(this.messageContainer);
		if (this.messageContainer !== undefined) {
			console.log(this.messageContainer.nativeElement.scrollHeight);
			try {
				setTimeout(() => {
					this.messageContainer.nativeElement.scrollTop = 150;
				}, 100)
			} catch (error) {
				console.warn(error);
			}
		}
	}

	alignMessage(userId: string): boolean {
		//return this.userId === userId ? false : true;
		return this.userId === userId.toString() ? true : false;
	}

	//Open user gallary to send images and videos
	opnGallary(): void {
		this.showEmoji = false;
		this.show = false;
		this.sendEmailType = 'simple';
		const dialogRef = this.dialog.open(ChooseGallaryComponent, { data: { condition: 'conversation' } });
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				let type = result.file_type == "image" ? 'image' : 'video';
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

	fileProgress(fileInput: any) {
		this.spinner.show();
		this.showEmoji = false;
		console.log(fileInput.target.files);
		if (fileInput.target.files && fileInput.target.files.length > 0) {
			var file = <File>fileInput.target.files[0];
			var mimeType = file.type;
			console.log(mimeType);
			if (mimeType.split('/')[0] == 'video') {
				this.sendEmailType = 'video';
				var me = this;
				var mime = file.type;
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
								me.toastr.errorToastr("Please upload less then 15 second video", 'Oops!', {
									position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
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
				console.log(mimeType.match(/image\/*/));
				if (mimeType.match(/image\/*/) == null && mimeType.match(/video\/*/) == null) {
					this.spinner.hide();
					this.toastr.errorToastr("Allowed Images and videos only.", 'Oops!', {
						position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
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
			console.log(data);
			if (data.status == "error") {
				this.toastr.errorToastr(data.error, 'Oops!', {
					position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
				});
				return;
			}

			this.show = false;
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
			'type':this.sendEmailType

		}
		this.dashboardService.send_email_after_message(post_data).subscribe((data: any) => {
			console.log(data);
		}, error => {
			console.log(error);
		})
	}


	//Clear chat history
	clearHistory() {
		const dialogRef = this.dialog.open(ChatConfimationComponent, { data: { name: 'clear' } });
		dialogRef.afterClosed().subscribe(result => {
			if (result == 'clear') {
				this.showDiv = false;

				this.chatService.Clear_Chat({ userId: this.userId, toUserId: this.toUserId }).subscribe((response: MessagesResponse) => {
					console.log(response)
					// setTimeout(() => {
					this.messages = []
					this.headerService.chatListReload(true);
					// }, 1000)
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
					this.blockedUesrId = this.userId;

					this.spinner.show();
					this.chatService.block_user_from_chat({ 'blocked_by': Number(this.userId), 'blocked_to': this.toUserId }).subscribe((response: MessagesResponse) => {
						this.spinner.hide();
						if (string == 'block') {
							this.checkUserBlock = true
						} else {
							this.checkUserBlock = false
						}
						console.log(this.blockedUesrId);
						console.log(this.userId);
						console.log(this.checkUserBlock);
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

				console.log(this.blockedUesrId);
				console.log(this.userId);
				console.log(this.checkUserBlock);
			});
		}
	}


	//Search filter
	onSearchChange(searchValue: string): void {
		console.log(searchValue);
		this.filter = true
		this.messages = this.originalArray.filter((item) => {
			return item.message.toLowerCase().includes(searchValue.toLowerCase());
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


	openVideoModal(video): void {
		const dialogRef = this.dialog.open(videoUserComponent, {
			data: { 'video': video }
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}

	backToList() {
		console.log('working');
		[].forEach.call(document.querySelectorAll('.show-mobile-converstion'), function (el) {
			el.style.display = 'none';
		});

		[].forEach.call(document.querySelectorAll('.mobile-show'), function (el) {
			el.style.display = 'inline';
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


	sendGif(title, url) {
		var message_time = this.formatAMPM(new Date())
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
		//Un Subscribe the chatList event on page destroy for better performance
		this.messageListnerIns.unsubscribe();
	}
}