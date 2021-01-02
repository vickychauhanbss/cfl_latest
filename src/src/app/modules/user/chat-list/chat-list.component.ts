import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/* Importing chat services */
import { ChatService } from '../../../shared/services/chat/chat.service';
import { SocketService } from '../../../shared/services/socket/socket.service';
import { DataShareService } from '../../../shared/services/utils/data-share.service';

/* importing Chat interfaces */
import { User } from './../../../interfaces/user';
import { ChatListResponse } from './../../../interfaces/chat-list-response';
import { footerService } from '../../../shared/services/footer/footer.service';
import { MessageService } from '../../../eventservice';
import { HeaderService } from '../../../shared/services/header/header.service';
import { Message } from './../../../interfaces/message';
import { latestMessage } from '../../../interfaces/latest-message';



@Component({
	selector: 'app-chat-list',
	templateUrl: './chat-list.component.html',
	styleUrls: ['./chat-list.component.css']
})

export class ChatListComponent implements OnInit {
	loading = true;
	userId: string = null;
	selectedUserId: any;
	chatListUsers: User[] = [];
	public overlayDisplay = false;
	filteredData: any = [];
	originalArray: any = [];
	filterApply = false;

	size = 22;
	sheetSize: 16 | 20 | 32 | 64 = 64;
	sheetRows = 57;
	sheetColumns = 57;
	backgroundUrl = 'https://unpkg.com/emoji-datasource-${set}@5.0.1/img/${set}/sheets-256/${sheetSize}.png';
	htmlString = '';
	sheet = 'apple';
	chatListEventSubscriber : any;

	constructor(
		private chatService: ChatService,
		private socketService: SocketService,
		private router: Router,
		private dataShareService: DataShareService,
		private footerService: footerService,
		private messageService: MessageService,
		public headerService: HeaderService,
		private route: ActivatedRoute,

	) {
		this.headerService.chatlistreload.subscribe((bit) => {
			this.ngOnInit();
		})

		this.headerService.selectSingleUser.subscribe((bit) => {
			localStorage.setItem('selectId', bit.id);
		})

	}

	ngOnInit() {
		console.log('working');
		this.messageService.login('showHeaderSubscription');
		this.footerService.hidefooter(true);
		this.loading = true;
		//this.userId = this.dataShareService.getUserId();
		let currentUesr =  localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr)
		this.userId = userData.id;
		console.log(this.userId)
		this.socketService.getChatList(this.userId).subscribe((chatListResponse: ChatListResponse) => {
			console.log(chatListResponse)
			this.renderChatList(chatListResponse);
		});

		this.updateListMessages();
	}

	backgroundImageFn = (set: any, sheetSize: number) =>
		this.backgroundUrl.replace(/\$\{set\}/g, set).replace(/\$\{sheetSize\}/g, String(sheetSize))

	//Render chat list
	renderChatList(chatListResponse: ChatListResponse): void {
		this.chatListUsers = chatListResponse.chatList;
		this.loading = false;
		if (chatListResponse.chatList) {
			chatListResponse.chatList.forEach(user => {
				var countMessage = chatListResponse.unread.find(x => x.fromUserId === user.id);
				var countVideo = chatListResponse.unreadVideo.find(x => x.fromUserId === user.id);
				var messageCount = countMessage == undefined ? 0 : countMessage.unread_msg_counts;
				var videoCount = countVideo == undefined ? 0 : countVideo.unread_msg_counts;
				user['unread'] = messageCount + videoCount;
			})
		}
		this.originalArray = this.chatListUsers
	}


	//Message receive real time by socket
	updateListMessages(): void {
		this.chatListEventSubscriber =  this.socketService.chatListUpdated().subscribe((socketResponse: ChatListResponse) => {
			socketResponse.chatList.forEach(user => {
				var countMessage = socketResponse.unread.find(x => x.fromUserId === user.id);
				var countVideo = socketResponse.unreadVideo.find(x => x.fromUserId === user.id);
				var messageCount = countMessage == undefined ? 0 : countMessage.unread_msg_counts;
				var videoCount = countVideo == undefined ? 0 : countVideo.unread_msg_counts;
				user['unread'] = messageCount + videoCount;
			})
			this.chatListUsers = socketResponse.chatList
		});
	}

	isUserSelected(userId: string): boolean {
		//  console.log(localStorage.getItem('selectId'));
		if (localStorage.getItem('selectId') != null) {
			var id = localStorage.getItem('selectId')
			this.selectedUserId = Number(id);
		}

		if (!this.selectedUserId) {
			return false;
		}
		return this.selectedUserId === userId ? true : false;
	}

	selectedUser(user: User): void {
		localStorage.removeItem("selectId");
		this.selectedUserId = user.id;
		this.dataShareService.changeSelectedUser(user);
	}

	selectedUserMobile(user: User): void {

		[].forEach.call(document.querySelectorAll('.mobile-show'), function (el) {
			el.style.display = 'none';
		});

		[].forEach.call(document.querySelectorAll('.show-mobile-converstion'), function (el) {
			el.style.display = 'inline';
		});

		localStorage.removeItem("selectId");
		this.selectedUserId = user.id;
		this.dataShareService.changeSelectedUser(user);
	}

	onSearchChange(searchValue: string): void {
		this.filterApply = true
		this.chatListUsers = this.originalArray.filter((item) => {
			return item.first_name.toLowerCase().includes(searchValue.toLowerCase());
		});
	}

	ngOnDestroy() {
		//Un Subscribe the chatList event on page destroy for better performance
		this.chatListEventSubscriber.unsubscribe();
	}
}
