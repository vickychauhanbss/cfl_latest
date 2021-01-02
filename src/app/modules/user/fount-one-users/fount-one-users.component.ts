import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dashboardService } from '../../../shared/services/dashboard/dashboard.service';
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
import { ToastrManager } from 'ng6-toastr-notifications';
import { HeaderService } from '../../../shared/services/header/header.service';
import * as $ from 'jquery';
import { OwlCarousel } from 'ngx-owl-carousel';

export interface DialogData {
	user_id: string;
	condition: string;
	userId: string
}

@Component({
	selector: 'app-found-one',
	templateUrl: './fount-one-users.component.html',
	styleUrls: ['./fount-one-users.component.css']
})
export class FoundConnectComponent implements OnInit {
	@ViewChild('owlElement', { static: false }) owlElement: OwlCarousel

	user_id: any;
	condition: any;
	name: any;
	foundUsers: any = [];
	demo: any;
	userId: any;
	private subscription;

	carouselOptions = {
		margin: 10,
		items: 1,
		autoplay: true,
		loop: false,
		dots: false,
		autoplayTimeout: 7000,
		// rewind: true,
		touchDrag: false,
		mouseDrag: false,
		responsive: {
			0: {
				items: 1,
				nav: true,
			},
			600: {
				items: 1,
				nav: true,
			},
		}
	};
	constructor(
		public dialogRef: MatDialogRef<FoundConnectComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		public dashboardService: dashboardService,
		private spinner: NgxSpinnerService,
		private toastr: ToastrManager,
		public headerService: HeaderService

	) {

		this.condition = data.condition;
		this.userId = data.userId;

		this.subscription = this.headerService.closePopup.subscribe((bit) => {
			this.dialogRef.close();
		})
	}

	ngOnInit() {
		this.spinner.show()
		this.dashboardService.all_found_one({ 'found_user': this.userId }).subscribe((data: any) => {
			this.spinner.hide()


			if (data.status == 'OK') {
				this.foundUsers = data.records;
				this.demo = data.records;
			}
		}, error => {
			this.spinner.hide()
		})
	}

	dismissModal() {
		this.dialogRef.close();
	}

	likeFoundUser(user, string) {
		this.dashboardService.like_found_one({ 'found_one_id': user.id }).subscribe((data: any) => {
			let removeIndex = this.demo.findIndex(el => el.id === user.id)
			let likedIndex = this.foundUsers.findIndex(el => el.id === user.id)
			this.foundUsers[likedIndex].like = 1;
			setTimeout(() => {
				this.owlElement.trigger('remove.owl.carousel', removeIndex);
				this.demo = this.demo.filter(el => el.id != user.id);
				this.owlElement.next([200])
				if (this.demo.length == 0) {
					this.dialogRef.close();
				}
			}, 500);

		})
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
