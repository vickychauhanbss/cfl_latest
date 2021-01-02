import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../eventservice';

import { footerService } from '../../../shared/services/footer/footer.service';
import { userService } from '../../../shared/services/user/user.service';
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: 'app-videopage',
	templateUrl: './videopage.component.html',
	styleUrls: ['./videopage.component.css']
})
export class VideopageComponent implements OnInit {
	divMessages: any;
	state: any;
	showDiv = false;
	name: any;
	constructor(
		private messageService: MessageService,
		private footerService: footerService,
		private userService: userService,
		private spinner: NgxSpinnerService,
		private route: ActivatedRoute,
	) { }

	ngOnInit() {
		this.messageService.login('showHeaderSubscription');
		this.footerService.hidefooter(true);
		if (this.route.snapshot.paramMap.get('state')) {
			this.state = this.route.snapshot.paramMap.get('state')
			this.spinner.show();
			this.userService.get_country_details_data({ 'state': this.route.snapshot.paramMap.get('state') }).subscribe((data: any) => {
				this.spinner.hide();
				if (data.status == "OK") {
					this.divMessages = data.data[0].description;
					this.name = data.data[0].name;

					this.showDiv = true;
				}


			}, error => {
				this.spinner.hide();
			})
		}
	}
}
