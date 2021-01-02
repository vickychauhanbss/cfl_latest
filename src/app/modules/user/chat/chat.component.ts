import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../eventservice';
import { footerService } from '../../../shared/services/footer/footer.service';


@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
	constructor(
		private messageService: MessageService,
		private footerService: footerService
	) { }

	ngOnInit() {
		this.messageService.login('showHeaderSubscription');
		this.footerService.hidefooter(true);
	}
}
