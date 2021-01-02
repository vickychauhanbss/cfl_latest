import { Component, OnInit } from '@angular/core';
import { footerService } from '../../../../shared/services/footer/footer.service';
import { MessageService } from '../../../../eventservice';
import { HeaderService } from '../../../../shared/services/header/header.service';

@Component({
	selector: 'app-IMIRA',
	templateUrl: './IMIRA.component.html',
	styleUrls: ['./IMIRA.component.css']
})
export class IMIRAComponent implements OnInit {

	constructor(private footerService: footerService, private messageService: MessageService,
		private headerService: HeaderService
	) {
	}

	ngOnInit() {
		window.scrollTo(0, 0);
		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr);

		if (userData) {
			this.footerService.hidefooter(true);
			this.headerService.loggedIn(true);
			this.messageService.login('showHeaderSubscription');
		} else {
			this.footerService.hidefooter(false);
			this.headerService.loggedIn(false);
			this.messageService.login('showHeaderFooter');
		}
	}
}