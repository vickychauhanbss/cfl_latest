import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { environment } from '../../../../environments/environment';

/* importing interfaces starts */
import { Auth } from '../../../interfaces/auth';
import { ChatListResponse } from '../../../interfaces/chat-list-response';
import { MessageSocketEvent } from '../../../interfaces/message-socket-event';
import { Message } from '../../../interfaces/message';

import { latestMessage } from '../../../interfaces/latest-message';
import { ChatService } from '../../../shared/services/chat/chat.service';
import { readUnraedMessage } from '../../../interfaces/readMessage';


/* importing interfaces ends */

@Injectable({
	providedIn: 'root'
})
export class SocketService {

	private BASE_URL = environment.socketUrl;
	private socket;

	constructor(private chatService: ChatService) {
		this.socket = io(this.BASE_URL, {reconnect: true});
		this.socket.on('disconnect', () => {
			console.log("Docket Diconnected due to some issue.",this.socket.connected);
		});

		this.socket.on('connect', () => {
			if(localStorage.getItem("loginUser") != null) {
				let userInfo = JSON.parse(localStorage.getItem("loginUser"));
				this.joinChat(userInfo.id);
			}
		});
	}

	public joinChat(username) {
		if(this.isConnected) {
			this.socket.emit('join', username);
		} else {
			this.socket = io(this.BASE_URL);
			this.socket.emit('join', username);
		}
	}

	public isConnected() {
		if(!this.socket.connected) {
			this.socket = io(this.BASE_URL);
			if(localStorage.getItem("loginUser") != null) {
				let userInfo = JSON.parse(localStorage.getItem("loginUser"));
				this.joinChat(userInfo.id);
			}
		} 
		return this.socket.connected;
	}

	// logout(userId: { userId: string}): Observable<Auth> {
	// 	this.socket.emit('logout', userId);
	// 	return new Observable(observer => {
	// 		this.socket.on('logout-response', (data: Auth) => {
	// 			observer.next(data);
	// 		});
	// 	});
	// }

	/*
  * Method to receive chat-list-response event.
  */
	getChatList(userId: string = null): Observable<ChatListResponse> {
		if (userId !== null) {
			this.socket.emit('chat-list', { userId: userId });
		}
		return new Observable(observer => {
			this.socket.on('chat-list-response', (data: ChatListResponse) => {
				observer.next(data);
			});
		});
	}

	chatListUpdatedTrigger(userId : string) {
		if(this.socket.connected) {
			this.socket.emit('chat-list', { userId: userId });
		} else {
			this.socket.on('connect', () => {
				if(localStorage.getItem("loginUser") != null) {
					let userInfo = JSON.parse(localStorage.getItem("loginUser"));
					//Join Chat by using USER ID.
					this.joinChat(userInfo.id);
					this.socket.emit('chat-list', { userId: userId });
				}
			});
		}
	}

	chatListUpdated(): Observable<ChatListResponse> {
		return new Observable(observer => {
			this.socket.on('chat-list-response', (data: ChatListResponse) => {
				observer.next(data);
			});
		});
	}

	/*
* Method to emit the add-messages event.
*/
	sendMessage(message: MessageSocketEvent): void {
		this.socket.emit('add-message', message);
	}

	readMessage(read: readUnraedMessage): void {
		this.socket.emit('message-read', read);
	}

	readMessageRes(): Observable<any> {
		return new Observable(observer => {
			this.socket.on('message-read-response', (data) => {
				observer.next(data);
			});
		});
	}

	/*
* Method to receive add-message-response event.
*/
	receiveMessages(): Observable<Message> {
		return new Observable(observer => {
			this.socket.on('add-message-response', (data) => {
				observer.next(data);
			});
		});
	}


	userList(): Observable<latestMessage> {
		return new Observable(observer => {
			this.socket.on('unread-updated', (data) => {
				console.log(data);
				observer.next(data);
			});
		});
	}
}
