import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../eventservice';
//import Router
import { Router } from "@angular/router";
import { homeService } from '../../../shared/services/home/home.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
import { footerService } from '../../../shared/services/footer/footer.service';

@Component({
	selector: 'app-helpsupport',
	templateUrl: './helpsupport.component.html',
	styleUrls: ['./helpsupport.component.css']
})
export class HelpsupportComponent implements OnInit {
	searchText: any;
	filteredItems: any = [];
	inputText = '';
	constructor(private messageService: MessageService, private router: Router, public homeService: homeService, private toastr: ToastrManager, private spinner: NgxSpinnerService, private footerService: footerService) { }

	ngOnInit() {
		window.scrollTo(0, 0);
		this.messageService.login('showHeaderSubscription');
		this.footerService.hidefooter(true);

	}

	gotoDetailPage(string) {
		if (string == 'Just-Joined') {
			this.router.navigate(['home/just-joined'])

		} else if (string == 'Safety-Guide') {
			this.router.navigate(['home/safety-guide'])

		} else if (string == 'Complete-Help-Topics') {
			this.router.navigate(['home/complete-help-topics'])

		}
	}

	searchFaqQuestions(text) {
		this.homeService.search_faq_questions({ 'text': text }).subscribe((data: any) => {
			this.inputText = text
			this.spinner.hide();
			if (data.records) {
				this.filteredItems = data.records;
			} else {
				this.filteredItems = [];
			}
		}, error => {
			this.spinner.hide();
		})
	}

	goToNextPage(item) {
		this.router.navigate(['home/complete-help-topics', { cat_id: item.category_id, question_id: item.id }])
	}
}
