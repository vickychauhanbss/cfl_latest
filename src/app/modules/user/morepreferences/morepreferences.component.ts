import { Component, OnInit } from '@angular/core';

//Import library
import { Options } from 'ng5-slider';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
import { Router } from "@angular/router";

//Import Services
import { dashboardService } from '../../../shared/services/dashboard/dashboard.service';
import { MessageService } from '../../../eventservice';

@Component({
	selector: 'app-morepreferences',
	templateUrl: './morepreferences.component.html',
	styleUrls: ['./morepreferences.component.css'],
})
export class MorepreferencesComponent implements OnInit {
	value: number = 0;
	userId: any;
	morePreferencesData = [];
	applyFilter: any = [];
	religionArray: any = [];
	ethnicityArray: any = [];
	fromValue = 0;
	toValue = 0;
	checkFilter: any;
	secondLangage: any;
	willingRelocate: any;
	isChange: any;
	options: Options = {
		floor: 0,
		ceil: 100,
		step: 50,
		showTicks: true
	};
	public fromAgeArray = [];
	public ToAgeArray = [];

	// public tallerArray = [{"label":"Yes", "id":"1"}, {"label":"No", "id":"2"}]
	public shorterArray = [{ "label": "shorter", "id": "1" }, { "label": "taller", "id": "2" }, { "label": "any", "id": "3" }]

	constructor(
		private toastr: ToastrManager,
		private spinner: NgxSpinnerService,
		private dashboardService: dashboardService,
		private messageService: MessageService,
		private router: Router
	) {

		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr);
		this.userId = userData.id;
		this.isChange = false;

		var foo = new Array(100);
		for (var i = 17; i < foo.length; i++) {
			let counts = i + 1
			this.fromAgeArray.push(counts);
			this.ToAgeArray = this.fromAgeArray
		}
	}

	ngOnInit() {
		window.scrollTo(0, 0);
		this.spinner.show();
		this.messageService.login('showHeaderSubscription');
		this.dashboardService.get_more_preferences_filter_data({ 'user_id': this.userId }).subscribe((data: any) => {
			this.spinner.hide();
			if (data.status == "OK") {
				this.morePreferencesData = data.records;
				this.checkFilter = data.filter
				let optionid = 0;
				this.fromValue = this.morePreferencesData[0].choosed_option.split('-')[0];
				this.toValue = this.morePreferencesData[0].choosed_option.split('-')[1];
				if (this.morePreferencesData[13].choosed_option) {
					this.secondLangage = parseInt(this.morePreferencesData[13].choosed_option);
				}

				if (this.morePreferencesData[17].choosed_option) {
					this.willingRelocate = parseInt(this.morePreferencesData[17].choosed_option);
				}

				if (this.morePreferencesData[1].choosed_option == undefined) {
					this.morePreferencesData[1].choosed_option = 'any'
				}

				this.morePreferencesData.forEach(item => {
					if (item.choosed_option) {
						optionid = item.choosed_option;
					} else {
						optionid = 0;
					}

					if (Array.isArray(item.choosed_option) == true) {
						item.options.forEach(itemselected => {
							item.choosed_option.forEach(info => {
								if (info == itemselected.option_id) {
									if (item.id == 11) {
										this.ethnicityArray.push(info);

									} else if (item.id == 12) {
										this.religionArray.push(info);

									}
									itemselected['checked'] = true;
								}
							})
						})
					}

					let preference = 0;
					if (item.id == 2) {
						preference = item.preference_value == undefined ? 0 : item.preference_value
						this.morePreferencesData[1].preference_value = preference;
					}
					this.applyFilter.push({ 'question_id': item.id, 'answer': optionid, 'preference': preference })
				})
			}
		}, error => {
			this.spinner.hide();
		})
	}

	//Get values of the questions
	filterChanged(optionid, data) {
		this.isChange = true;
		var index = this.applyFilter.map(x => { return x.question_id }).indexOf(data.id);
		if (index != -1) {
			this.applyFilter.splice(index, 1);
		}

		if (optionid === 'No preference' || optionid === 'Rather not tell') {
			optionid = '0'
		}

		this.applyFilter.push({ 'question_id': data.id, 'answer': parseInt(optionid), 'preference': 0 })
	}

	religionFxn(option, data) {
		this.isChange = true;
		if (option.checked === true) {
			this.religionArray.push(option.source.value)
		} else {
			var index = this.religionArray.map(x => { return x }).indexOf(option.source.value);
			this.religionArray.splice(index, 1)
		}
		this.applyFilter.find(x => x.question_id === data.id).answer = this.religionArray;
	}


	ethnicityFxn(option, data) {
		if (option.checked === true) {
			this.isChange = true;
			this.ethnicityArray.push(option.source.value)
		} else {
			var index = this.ethnicityArray.map(x => { return x }).indexOf(option.source.value);
			this.ethnicityArray.splice(index, 1)
		}
		this.applyFilter.find(x => x.question_id === data.id).answer = this.ethnicityArray;
	}

	changeHeight(data, preference) {
		this.isChange = true;
		if (data) {
			var index = this.applyFilter.map(x => { return x.question_id }).indexOf(2);
			if (index != -1) {
				this.applyFilter.splice(index, 1);
			}
			this.applyFilter.push({ 'question_id': 2, 'answer': data, 'preference': preference })
		} else {

			this.applyFilter.find(x => x.question_id === 2).preference = preference;
		}
	}


	changeAge(value, string) {
		this.isChange = true;
		if (string == 'from') {
			this.ToAgeArray = [];
			var foo = new Array(100);
			for (var i = Number(value); i < foo.length; i++) {
				let counts = i + 1
				this.ToAgeArray.push(counts);
			}

			this.fromValue = value;
			var index = this.applyFilter.map(x => { return x.question_id }).indexOf(1);
			if (index != -1) {
				this.applyFilter.splice(index, 1);
			}
			this.applyFilter.push({ 'question_id': 1, 'answer': value + '-' + this.toValue, 'preference': 0 })
		} else {
			this.toValue = value;
			var index = this.applyFilter.map(x => { return x.question_id }).indexOf(1);
			if (index != -1) {
				this.applyFilter.splice(index, 1);
			}
			this.applyFilter.push({ 'question_id': 1, 'answer': this.fromValue + '-' + value, 'preference': 0 })
		}
	}

	applyFilterFxn() {
		var filterData = {
			'user_id': this.userId,
			'data': this.applyFilter
		}
		this.spinner.show();
		this.dashboardService.save_more_preferences_filter(filterData).subscribe((data: any) => {
			this.spinner.hide();
			this.router.navigate(['home/dashboard'])

		}, error => {
			this.spinner.hide();
		})
	}

	resetFilters() {
		this.dashboardService.reset_filter({ 'user_id': this.userId }).subscribe((data: any) => {
			this.applyFilter = [];
			this.secondLangage = null;
			this.willingRelocate = null;
			this.ngOnInit();
		})
	}
}