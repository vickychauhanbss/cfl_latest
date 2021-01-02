import { Component, OnInit } from '@angular/core';
import { homeService } from '../../../shared/services/home/home.service';
import { MessageService } from '../../../eventservice';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
import { Router, ActivatedRoute } from "@angular/router";
import { footerService } from '../../../shared/services/footer/footer.service';


@Component({
	selector: 'app-completetopics',
	templateUrl: './completetopics.component.html',
	styleUrls: ['./completetopics.component.css']
})
export class CompletetopicsComponent implements OnInit {
	faq_data: any;
	userId: any;
	question_id: any;
	constructor(
		public homeService: homeService,
		private messageService: MessageService,
		private toastr: ToastrManager,
		private spinner: NgxSpinnerService,
		private route: ActivatedRoute,
		private router: Router,
		private footerService: footerService
	) {
		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr);
		this.userId = userData.id
	}

	ngOnInit() {
		window.scrollTo(0, 0);
		this.messageService.login('showHeaderSubscription');
		this.footerService.hidefooter(true);
		this.spinner.show();
		this.homeService.get_help_and_support_data({ 'user_id': this.userId }).subscribe((data: any) => {
			this.spinner.hide();
			this.faq_data = data.data.faq_data;

		}, error => {
			this.spinner.hide();
		})


		if (this.route.snapshot.paramMap.get('cat_id')) {
			var elems = document.querySelector(".active");
			var question_id = this.route.snapshot.paramMap.get('question_id');
			this.question_id = parseInt(question_id)

			if (elems !== null) {
				elems.classList.remove("active");
			}

			var el = document.querySelector(".tab-pane.fade.in.active");
			if (elems !== null) {
				el.classList.remove("active");
			}

			if (this.route.snapshot.paramMap.get('cat_id') == '1') {
				var addActive = document.querySelector("#home-tab");
				var home = document.querySelector("#home");
				if (home !== null) {
					home.classList.add("active");
				}

				if (addActive !== null) {
					addActive.classList.add("active");
				}

			} else if (this.route.snapshot.paramMap.get('cat_id') == '2') {
				var addActive = document.querySelector("#subscription-tab");
				var subscription = document.querySelector("#subscription");

				if (subscription !== null) {
					subscription.classList.add("active");
				}
				if (addActive !== null) {
					addActive.classList.add("active");
				}

			} else if (this.route.snapshot.paramMap.get('cat_id') == '3') {
				var addActive = document.querySelector("#communication-tab");
				var communication = document.querySelector("#communication");

				if (communication !== null) {
					communication.classList.add("active");
				}

				if (addActive !== null) {
					addActive.classList.add("active");
				}

			} else if (this.route.snapshot.paramMap.get('cat_id') == '4') {
				var addActive = document.querySelector("#help-support-tab");
				var help_support = document.querySelector("#help-support");

				if (help_support !== null) {
					help_support.classList.add("active");
				}

				if (addActive !== null) {
					addActive.classList.add("active");
				}

			} else if (this.route.snapshot.paramMap.get('cat_id') == '5') {
				var addActive = document.querySelector("#searching-tab");
				var searching = document.querySelector("#searching");

				if (searching !== null) {
					searching.classList.add("active");
				}

				if (addActive !== null) {
					addActive.classList.add("active");
				}

			} else if (this.route.snapshot.paramMap.get('cat_id') == '6') {
				var addActive = document.querySelector("#technical-tab");
				var technical = document.querySelector("#technical");

				if (technical !== null) {
					technical.classList.add("active");
				}

				if (addActive !== null) {
					addActive.classList.add("active");
				}

			} else if (this.route.snapshot.paramMap.get('cat_id') == '7') {
				var addActive = document.querySelector("#contactus-tab");
				var contactus = document.querySelector("#contactus");

				if (contactus !== null) {
					contactus.classList.add("active");
				}

				if (addActive !== null) {
					addActive.classList.add("active");
				}
			}
			this.router.navigate(['home/complete-help-topics', {}]);
		}
	}

	submitFaqQuestions(id, count, index, string) {
		if (string == 'accountSettings') {
			this.faq_data[0].faqs[index].existing = count == 1 ? 1 : 0;

		} else if (string == 'billingSettings') {
			this.faq_data[1].faqs[index].existing = count == 1 ? 1 : 0;

		} else if (string == 'memberSettings') {
			this.faq_data[2].faqs[index].existing = count == 1 ? 1 : 0;

		} else if (string == 'photosSettings') {
			this.faq_data[3].faqs[index].existing = count == 1 ? 1 : 0;

		} else if (string == 'searchingSettings') {
			this.faq_data[4].faqs[index].existing = count == 1 ? 1 : 0;

		} else if (string == 'technicalSettings') {
			this.faq_data[5].faqs[index].existing = count == 1 ? 1 : 0;

		} else if (string == 'contactSettings') {
			this.faq_data[6].faqs[index].existing = count == 1 ? 1 : 0;

		}

		this.spinner.show();
		this.homeService.save_faq_questions({ 'faq_id': id, 'count': count, 'user_id': this.userId }).subscribe((data: any) => {
			this.spinner.hide();

			if (data.status == 'OK') {
				this.toastr.successToastr('Answer saved successfully.', 'Success',
					{ enableHTML: true, toastTimeout: 8000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
				);
			} else {
				this.toastr.errorToastr(data.error, 'Oops!', {
					position: 'top-full-width', toastTimeout: 8000, animate: 'slideFromTop', showCloseButton: true
				})
			}
		}, error => {
			this.spinner.hide();
		})
	}

	removeActiveTabClass() {
		var ele = document.querySelectorAll(".panel-title.activeButon");
		if (ele[0]) {
			ele[0].classList.remove("activeButon");
		}
	}
}
