import { Injectable, Output, EventEmitter } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class HeaderService {
	@Output() showHeader: EventEmitter<boolean> = new EventEmitter();
	@Output() onlineFilter: EventEmitter<boolean> = new EventEmitter();
	@Output() profileImage: EventEmitter<boolean> = new EventEmitter();
	@Output() userData: EventEmitter<boolean> = new EventEmitter();
	@Output() parcantage: EventEmitter<boolean> = new EventEmitter();
	@Output() notify: EventEmitter<boolean> = new EventEmitter();
	@Output() updateInterest: EventEmitter<any> = new EventEmitter();
	@Output() readnotifications: EventEmitter<any> = new EventEmitter();
	@Output() reloadDashboard: EventEmitter<any> = new EventEmitter();
	@Output() chatlistreload: EventEmitter<any> = new EventEmitter();
	@Output() selectSingleUser: EventEmitter<any> = new EventEmitter();
	@Output() updatePlan: EventEmitter<any> = new EventEmitter();
	@Output() closePopup: EventEmitter<any> = new EventEmitter();
	@Output() activeStartEnd: EventEmitter<any> = new EventEmitter();
	@Output() profileDataUpdated: EventEmitter<any> = new EventEmitter();
	constructor() { }
	loggedIn(bit) {
		this.showHeader.emit(bit);
		// false for SurveyMode
	}

	loginFilter(msg) {
		this.onlineFilter.emit(msg);
	}


	changeProfileImage(msg) {
		this.profileImage.emit(msg);
	}

	changeLoginUserdata(msg) {
		this.userData.emit(msg);
	}


	updateProfilePercantage(msg) {
		this.parcantage.emit(msg);
	}

	realTimeNotiy(msg) {
		this.notify.emit(msg);
	}

	changeInterest(msg) {
		this.updateInterest.emit(msg);
	}

	readNotification(msg) {
		this.readnotifications.emit(msg);
	}

	reloaddashboard(msg) {
		this.reloadDashboard.emit(msg);
	}

	chatListReload(msg) {
		this.chatlistreload.emit(msg);
	}

	selectUser(msg) {
		this.selectSingleUser.emit(msg);
	}

	updateUserPlan(msg) {
		this.updatePlan.emit(msg);
	}

	closePopupAfterLogout(msg) {
		this.closePopup.emit(msg);
	}


	startEndActivity(msg) {
		this.activeStartEnd.emit(msg);
	}
}