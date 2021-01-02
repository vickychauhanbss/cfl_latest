import { Component, OnInit } from '@angular/core';
import { footerService } from '../../../../shared/services/footer/footer.service';
import { ActivatedRoute } from "@angular/router";
import { homeService } from '../../../../shared/services/home/home.service';
import { appConfig } from '../../../../shared/services/app.config';
import { HeaderService } from '../../../../shared/services/header/header.service';
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
declare var require: any

@Component({
	selector: 'app-crazy-filipina-detail',
	templateUrl: './crazy-filipina-detail.component.html',
	styleUrls: ['./crazy-filipina-detail.component.css']
})
export class CrazyFilipDetailsComponent implements OnInit {
	ImageUrl: any;
	blogData: any;
	defaultImage = require('../../../../../assets/chat/image-loader.gif');

	constructor(
		private footerService: footerService,
		private route: ActivatedRoute,
		private homeService: homeService,
		private headerService: HeaderService,
		private spinner: NgxSpinnerService
	) {
		this.ImageUrl = appConfig.imagesUrl
	}

	ngOnInit() {
		window.scrollTo(0, 0);
		this.headerService.loggedIn(false);
		this.footerService.hidefooter(false);
		this.spinner.show();
		this.homeService.get_single_blog({ 'id': this.route.snapshot.paramMap.get('id') }).subscribe((data: any) => {
			this.spinner.hide();
			this.blogData = data.data;
		}, error => {
			this.spinner.hide();
		})
	}
}