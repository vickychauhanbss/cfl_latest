import { Component, OnInit, NgZone, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, ElementRef, AfterViewInit } from '@angular/core';

//Import libraries
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Options } from 'ng5-slider';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
import { MatStepper } from '@angular/material/stepper';
import { Router, ActivatedRoute } from "@angular/router";
import { LocationStrategy } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

//Import sevices
import { HeaderService } from '../../../../shared/services/header/header.service';
import { userService } from '../../../../shared/services/user/user.service';
import { footerService } from '../../../../shared/services/footer/footer.service';
import { loginRegisterService } from '../../../../shared/services/login-register-service/login-register.service';
import { MessageService } from '../../../../eventservice';
import { onboardingService } from '../../../../shared/services/onboarding/onboarding.service';

// Import components
import { InstructionComponent } from '../instruction-model/instruction-model.component';
import { OnboardignModalComponent } from '../onboarding-modal/onboarding-modal.component';
import { ConfirmationComponent } from '../confirmation-model/confirmation-model.component';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-onboarding',
	templateUrl: './onboarding.component.html',
	styleUrls: ['./onboarding.component.css']
})

//Define the component
export class OnboardingComponent implements OnInit, AfterViewInit {
	formGroup: FormGroup;
	@ViewChild('stepper', { static: false }) private myStepper: MatStepper;
	firstFormGroup: FormGroup;
	firstForm2Group: FormGroup;
	firstForm3Group: FormGroup;
	firstForm4Group: FormGroup;
	firstForm5Group: FormGroup;
	firstForm6Group: FormGroup;
	firstForm7Group: FormGroup;
	firstForm8Group: FormGroup;
	firstForm9Group: FormGroup;
	lastFrom: FormGroup;
	form: any;
	existing: any;
	prevQuestionId: any;
	height: any;
	userId: any;
	bookingForm: FormArray;
	nextQuestions: any;
	animal: string;
	name: string;
	userName: any;
	questionAns: any;
	end: any;
	order: number;
	index: any;
	totalPer: any;
	totalActivities: number;
	doneActivities: number;
	orderIdPrev: any;
	currentId: any;
	formArrayLength: any;
	id: any;
	token: any;
	selectDate: any;
	selectMonth: any;
	selectYear: any;
	currentYear: any;
	selectedOptionId: any;
	hidefluency: any;
	saveData: any;
	states: any;
	stateId: any;
	hideQuestionFive: any;
	hideQuestiontwoFour: any;
	showDefualt: any;
	showDedualt2and3: any;
	storeValue: any;
	desciption: any;
	checkString: any;
	gotoParticularIndex: any;
	value: number = 10;
	isLinear = true;
	removeFirst = false;
	showTemplate = false;
	activedStep = 0;
	hidewhitescreen = false;
	less = false;
	submitted = false;
	showInstruction = false;
	onboardingVideoQuery :  any;
	steps = [];
	generalQuestion: any = [];
	sendData: any = [];
	checkGeranalQuestionSave: any = [];
	options: Options = {
		floor: 0,
		ceil: 100,
		step: 25,
		showTicks: true
	};
	public months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
	public days = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
	public years = [];

	public popoverTitle: string = 'Popover title';
	public popoverMessage: string = 'Popover description';
	public confirmClicked: boolean = false;
	public cancelClicked: boolean = false;
	isLoading : boolean = false;
	// Initialized to specific date (09.10.2018).
	public DateOfBirth: any = { month: '01', day: '01', year: '2000' }
	constructor(
		private _formBuilder: FormBuilder,
		private onboarding: onboardingService,
		private toastr: ToastrManager,
		private spinner: NgxSpinnerService,
		private cd: ChangeDetectorRef,
		private router: Router,
		private messageService: MessageService,
		private location: LocationStrategy,
		public dialog: MatDialog,
		private footerService: footerService,
		private route: ActivatedRoute,
		private loginRegisterService: loginRegisterService,
		private userService: userService,
		private HeaderService: HeaderService,
		private elementRef: ElementRef,
		private dom : DomSanitizer
	) {
		this.formGroup = this._formBuilder.group({
			bookingForm: this._formBuilder.array([this._formBuilder.group({
				options: new FormControl(''),
				question: new FormControl(''),
				option_order: new FormControl(''),
				answer: new FormControl('', [Validators.required]),
				id: new FormControl('', [Validators.required])
			})])
		})

		this.lastFrom = this._formBuilder.group({
			lastStep: ['', Validators.required]
		});		this.hidefluency = 'No second language spoken';
		this.showDefualt = false;
		this.showDedualt2and3 = false;
	}

	get f() { return this.lastFrom.controls; }

	percentage(partialValue, totalValue) {
		var roundValue = (100 * partialValue) / totalValue;
		if (roundValue > 95) {
			return 100;
		} else {
			return Math.round(roundValue);
		}
	}

	preventBackButton() {
		history.pushState(null, null, location.href);
		this.location.onPopState(() => {
			history.pushState(null, null, location.href);
		})
	}


	formData() {
		return (this.formGroup.get('bookingForm') as FormArray).controls;
	}

	ngOnInit() {
		this.order = 0;
		this.existing = 'no';
		var today = new Date();
		var yyyy = today.getFullYear()
		const currentYear = yyyy - 18;
		this.DateOfBirth.year = currentYear
		const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
		this.years = range(currentYear, currentYear - 50, -1)
		this.footerService.hidefooter('hide');
	}

	continuefxn() {
		this.existing = 'yes';
	}

	//Get first 20 question
	fetchGernalOnboardingQuestion() {
		var data = {
			'user_id': this.userId,
			'token': this.token
		}
		
		this.onboarding.General_Questions({ data }).subscribe((data: any) => {
			if (data.status == 'OK' && data.completed != 'yes') {
				this.totalActivities = 9;
				this.generalQuestion = data.records;
				this.onboardingVideoQuery = data.onboardingVideoInfo;

				if(this.matchRegex(data.onboardingVideoInfo.video_path)) {
					this.onboardingVideoQuery.matched = true;
					this.onboardingVideoQuery.video_path = this.dom.bypassSecurityTrustResourceUrl(data.onboardingVideoInfo.video_path.replace(/https:\/\/vimeo.com/i,'https://player.vimeo.com/video'));
				}

				this.existing = this.generalQuestion[0].existing;
				if (this.generalQuestion[4].existing == "yes") {
					this.generalQuestion[4].options.forEach(item => {
						if (item.option_id.toString() == this.generalQuestion[4].choosed_option) {
							if (item.option == 'No') {
								this.less = true;
							}
						}
					})
				}

				if (this.generalQuestion[18]) {
					if (this.generalQuestion[18].existing == "yes") {
						let country = this.generalQuestion[18].options.find(obj => obj.option_id == this.generalQuestion[18].country);
						this.stateId = this.generalQuestion[18].choosed_option;
						if (country) {
							this.states = country.states;
						}
					} else {
						this.states = this.generalQuestion[18].options[0].states;
						this.stateId = this.generalQuestion[18].options[0].states[0].option_id;
					}
				}

				let obj = this.generalQuestion[12].options.find(obj => obj.option_id == this.generalQuestion[12].choosed_option);
				if (obj) {
					this.selectedOptionId = obj.option;
				} else {
					this.selectedOptionId = 'English';
				}


				let check = this.generalQuestion[13].options.find(obj => obj.option_id == this.generalQuestion[13].choosed_option);
				if (check) {
					this.hidefluency = check.option;
				}

				if (this.generalQuestion[5].choosed_option == '0') {
					this.hideQuestionFive = '';
					this.showDefualt = false;
					this.showDedualt2and3 = true;
					this.hideQuestiontwoFour = 'hideQuestion2and4';
				} else if (this.generalQuestion[9].choosed_option == '0' || this.generalQuestion[9].existing == "no") {
					this.hideQuestiontwoFour = '';
					this.showDefualt = true;
					this.showDedualt2and3 = false;
					this.hideQuestionFive = 'hideQuestion5';
				}

				this.sendData = [];
				this.generalQuestion.forEach(item => {
					if (item.existing == 'yes') {
						this.checkGeranalQuestionSave.push(item);
					}

					if (this.generalQuestion[0].choosed_option) {
						let dateOfBirh = this.generalQuestion[0].choosed_option.split('/');
						this.selectDate = dateOfBirh[0]
						this.selectMonth = dateOfBirh[1]
						this.selectYear = dateOfBirh[2]

						this.DateOfBirth = {
							month: this.selectMonth,
							day: this.selectDate,
							year: this.selectYear
						}
						this.getDaysArray(this.selectYear, this.selectMonth)
					}

					this.totalPer = this.percentage(1, this.totalActivities);
					if (item.choosed_option) {
						this.questionAns = item.choosed_option;
					} else {
						this.questionAns = item.options[0].option == '' ? this.DateOfBirth : item.options[0].option_id;
					}
					this.sendData.push({ 'question_id': item.question_id, 'answer': this.questionAns, 'question_type': item.question_type })
				});

				if (this.checkGeranalQuestionSave.length == this.generalQuestion.length) {
					setTimeout(() => {
						if (this.myStepper !== undefined) {
							this.myStepper.selectedIndex = 10;
							this.gotoParticularIndex = 10;
							this.cd.detectChanges();
						}
					}, 200)

					this.fetchBwsQuestions(this.userId);
				} else {
					this.spinner.hide();
					// setTimeout(()=>{
					// if(this.myStepper !== undefined){
						// alert(this.checkGeranalQuestionSave.length);
					let lenght = this.checkGeranalQuestionSave.length / 2
					// alert(lenght);
					if (this.less == true) {
						lenght = lenght - 1
					}

					setTimeout(() => {
						this.showTemplate = true;
						this.gotoParticularIndex = lenght;
						this.cd.detectChanges();
					}, 200)
				}
			} else {
				let currentUesr = JSON.parse(localStorage.getItem("loginUser"));
				currentUesr.onboarding_complete = 1;
				localStorage.setItem('loginUser', JSON.parse(currentUesr));
				if (currentUesr.gender == '1') {
					this.router.navigate(['home/trustplus/apm']);
				} else {
					this.router.navigate(['home/trustplus/apfi']);
				}
			}
		}, error => {
			this.spinner.hide();
		})
	}



	ngAfterViewInit() {
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.src = "https://app.kartra.com/resources/js/analytics/8g8b5Xar";
		this.elementRef.nativeElement.appendChild(s);
		this.route.queryParams.subscribe(params => {
			let id = params['id'];
			this.id = id;

			// Verify and login user after email verification
			if (id) {
				this.loginRegisterService.Verfiy_user({ 'user_id': id }).subscribe((data: any) => {
					this.messageService.login('hideHeaderFooter');
					if (data.verified == '0') {
						this.token = data.userToken;
						localStorage.setItem("token", data.userToken);
						localStorage.setItem("loginUser", JSON.stringify(data.user));
						this.userName = data.user.first_name;
						this.userId = data.user.id;
						this.fetchGernalOnboardingQuestion()
						this.toastr.successToastr('Your email address is successfully verified.', 'Success',
							{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
						);
					} else {
						let currentUesr = localStorage.getItem("loginUser");
						let userData = JSON.parse(currentUesr);
						this.userName = userData.first_name;
						this.userId = userData.id
						this.fetchGernalOnboardingQuestion();
					}
					this.router.navigate(['home/onboarding'], {})
				})
			} else {
				// this.spinner.show();
				this.userService.check_user_token().subscribe((data: any) => {
					if (data.onboarding == "1") {
						if (data.gender == '1') {
							this.router.navigate(['home/trustplus/apm']);
						} else {
							this.router.navigate(['home/trustplus/apfi']);
						}
					} else {
						let currentUesr = localStorage.getItem("loginUser");
						let userData = JSON.parse(currentUesr);
						if (userData) {
							this.userName = userData.first_name;
							this.userId = userData.id
							this.fetchGernalOnboardingQuestion()
						} else {
							this.toastr.successToastr('You need to login first', 'Oops!', {
								position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
							});
							this.spinner.hide();
							this.router.navigate(['home'])
							this.messageService.login('homePage');
						}

						if (localStorage.getItem("showNotification") != null) {
							this.toastr.customToastr(
								"<span style='color:#fff; font-size: 18px; text-align: center; top:50px'>Welcome back " + this.userName + ",Please continue your onboarding process to help us find the best match for you</span>",
								null,
								{ enableHTML: true, toastTimeout: 3000, position: 'top-right' }
							);
							localStorage.removeItem("showNotification")
						}
					}
				}, (error) => {
					this.spinner.hide();
				})
			}
		});
	}

	get_next_questions(string) {
		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr);
		if (userData) {
			this.checkString = string;
			this.showInstruction = true;
			this.fetchBwsQuestions(this.userId)
		} else {
			this.router.navigate(['home'])
		}
	}

	go_to_back() {
		setTimeout(() => {
			this.index = this.index - 1;
		}, 1000)
		this.order = Number(this.order) - 1;
		this.myStepper.previous();
	}

	goToNext() {
		this.myStepper.next();
		this.isLoading = true;
		// this.spinner.show();
		this.onboarding.Get_Bws_Questions({ 'user_id': this.userId, 'order': 0 }).subscribe((data: any) => {
			this.isLoading = false;
			this.desciption = data.records[0].description;
			this.openInstrectionModal();
			this.cd.detectChanges();
		})
	}

	//Onboarding instruction popup
	openInstrectionModal() {
		let dialog = this.dialog.open(InstructionComponent, {
			data: { name: this.desciption }
		});

		dialog.afterClosed().subscribe(x=> {
			// localStorage.removeItem("showDesc");
		})
	}

	//Get Bws/vas question
	fetchBwsQuestions(userId) {
		this.spinner.show();
		this.onboarding.Get_Bws_Questions({ 'user_id': userId, 'order': this.order }).subscribe((data: any) => {
			this.hidewhitescreen = true;
			if (data.status == 'OK') {
				if (data.records) {
					this.desciption = data.records[0].description;
					if (this.showInstruction == true) {
						this.openInstrectionModal();
					}
					this.bookingForm = this.formGroup.get('bookingForm') as FormArray;
					data.records.forEach(obj => {
						this.bookingForm.push(
							this._formBuilder.group({
								options: new FormControl(obj.options),
								question: new FormControl(obj),
								answer: new FormControl(obj.answer),
								option_order: new FormControl(obj.question_order),
								id: obj.question_id
							})
						);
					})


					if (this.order == 0 && this.removeFirst == false) {
						this.bookingForm.removeAt(0);
					}
					if (this.checkString != 'template') {
						setTimeout(() => {
							if (data.records.slice(-1)[0].existing == 'yes') {
								this.order = data.records.slice(-1)[0].question_order;
								this.fetchBwsQuestions(this.userId)
							} else {
								//this.spinner.hide();
								let checkArray = []
								for (let elem of this.bookingForm.controls) {
									checkArray.push(elem)
									if (elem.value.question.existing == 'no') {
										if (localStorage.getItem("showDesc") != null) {
											this.desciption = elem.value.question.description;
											setTimeout(() => {
												this.openInstrectionModal();
												localStorage.removeItem("showDesc")
											}, 1000)
										}

										setTimeout(() => {
											if (this.less == true) {
												checkArray.length = checkArray.length - 1
											}
											// this.myStepper.selectedIndex = 10 + checkArray.length;
											this.gotoParticularIndex = 10 + checkArray.length;
										}, 400)

										setTimeout(() => {
											this.spinner.hide();
											this.showTemplate = true;
											this.cd.detectChanges();
										}, 400)
										return false;
									}
								}
							}
						}, 600)
					} else {
						setTimeout(() => {
							this.spinner.hide();
						}, 100)
					}
				} else {
					this.totalPer = 100;
					this.formArrayLength = this.bookingForm.controls.length - 1;
					this.index = this.formArrayLength;
					var selectedIndex = 12
					setTimeout(() => {
						if (this.less == true) {
							selectedIndex = 11
						}
						this.gotoParticularIndex = selectedIndex + this.formArrayLength;
						// this.myStepper.selectedIndex = 12 + this.formArrayLength;
					}, 300)
					this.spinner.hide();
					this.showTemplate = true;
					this.cd.detectChanges();
				}
			}
		}, error => {
			this.spinner.hide();
		})
	}

	//Get values of the questions
	filterChanged(selectedValue, data, string) {
		let obj = data.options.find(obj => obj.option_id == selectedValue);

		if (string == 'hideOption') {
			this.selectedOptionId = obj.option;
		} else if (string == 'hidefluency') {
			this.hidefluency = obj.option;
			if (obj.option == 'No second language spoken') {
				var index = this.sendData.map(x => { return x.question_id; }).indexOf(15);
				if (this.storeValue) {
					this.generalQuestion[14].options.unshift(this.storeValue);
				}
				this.sendData[index].answer = this.generalQuestion[14].options[0].option_id;
			} else {
				this.storeValue = this.generalQuestion[13].options[0];

				if (this.generalQuestion[14].options.length == 4) {
					this.generalQuestion[14].options.shift();
					var index = this.sendData.map(x => { return x.question_id; }).indexOf(15);
					this.sendData[index].answer = this.generalQuestion[14].options[0].option_id;
				}
			}
		} else if (string == "changeState") {
			this.stateId = selectedValue;
		} else if (string == 'hideQuestion5') {
			if (obj.option == 'No') {
				this.hideQuestionFive = '';
				this.showDefualt = false;
				this.showDedualt2and3 = true;
				this.hideQuestiontwoFour = 'hideQuestion2and4';
				var index = this.sendData.map(x => { return x.question_id; }).indexOf(10);
				this.sendData[index].answer = this.generalQuestion[9].options[0].option_id;
			} else {
				this.hideQuestiontwoFour = '';
				var index = this.sendData.map(x => { return x.question_id; }).indexOf(6);
				this.sendData[index].answer = this.generalQuestion[5].options[0].option_id;
				var indexNew = this.sendData.map(x => { return x.question_id; }).indexOf(7);
				this.sendData[indexNew].answer = this.generalQuestion[6].options[0].option_id;
				this.showDefualt = true;
				this.showDedualt2and3 = false;
				this.hideQuestionFive = 'hideQuestion5';
			}
		}

		var index = this.sendData.map(x => { return x.question_id; }).indexOf(data.question_id);
		if (index != -1) {
			this.sendData.splice(index, 1);
		}

		this.sendData.push({ 'question_id': data.question_id, 'answer': parseInt(selectedValue), 'question_type': data.question_type })
	}

	//Get values of the date of birth
	changeDob(number, string) {
		if (string == 'month') {
			this.getDaysArray(this.DateOfBirth.year, number)
			this.DateOfBirth.month = number;
		} else if (string == 'day') {
			this.DateOfBirth.day = number;
		} else {
			this.getDaysArray(number, this.DateOfBirth.month)
			this.DateOfBirth.year = number;
		}
	}

	getDaysArray = function (year, month) {
		var date = new Date(year, month - 1, 1);
		var result = [];
		while (date.getMonth() == month - 1) {
			result.push(date.getDate());
			date.setDate(date.getDate() + 1);
		}
		this.days = result;
	}

	goToNextGerenalQuestion(stepper: MatStepper, start, end) {
		this.end = end;
		var firstRun = this.sendData.sort(function (a, b) {
			return (a.question_id - b.question_id);
		});

		console.log('firstRun',firstRun);
		var sliced = firstRun.slice(start, end);
		console.log('sliced',sliced);

		if (start == 0 && end == 2) {
			this.sendData[0].answer = this.DateOfBirth.day + '/' + this.DateOfBirth.month + '/' + this.DateOfBirth.year
		} else if (end == 20) {
			sliced[0].answer = this.stateId
		} else if (this.showDedualt2and3 == true && end == 6) {
			sliced[1].answer = '0';
		} else if (this.showDedualt2and3 == true && end == 10) {
			sliced[0].answer = '0';
		} else if (this.showDefualt == true && end == 10) {
			sliced[1].answer = '0';
		}
		

		if (end == 6 && sliced[1].answer == '0') {
			end = 8
			sliced = firstRun.slice(start, end);
			sliced[2].answer = '0';
			sliced[3].answer = '0';
		}

		var data = { 'user_id': this.userId, 'answer': sliced }
		var today = new Date();
		var selectedDate = this.DateOfBirth.year + '/' + this.DateOfBirth.month + '/' + this.DateOfBirth.day;
		var birthDate = new Date(selectedDate);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		if (age <= 17) {
			this.toastr.errorToastr('Age should be greate then or equal to 18', 'Oops!', {
				position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
			});
		} else {
			let currentUesr = localStorage.getItem("loginUser");
			let userData = JSON.parse(currentUesr);
			if (userData) {
				this.isLoading = true;
				this.cd.markForCheck();
				this.onboarding.save_Questions(data).subscribe((data: any) => {
					if (end == 18) {
						this.totalPer = this.percentage(1, this.totalActivities);
						this.checkString = 'template';
						// this.showInstruction = true;
						this.order = 0;
						if (this.bookingForm != undefined) {
							this.bookingForm.clear();
						}
						this.fetchBwsQuestions(this.userId)
					}
					setTimeout(() => {
						this.isLoading= false;
						this.cd.markForCheck();
					}, 300)
					if (data.status == 'OK') {
						this.cd.markForCheck();
						setTimeout(() => {
							stepper.next();
						}, 300)
					}
				}, error => {
					this.isLoading = false;
				})

			} else {
				this.router.navigate(['home'])
			}
		}
	}

	nextStep(item, index, string) {
		this.index = index;
		if (item.question.question_check == 2) {
			this.saveData = {
				user_id: this.userId,
				question_id: item.question.question_id,
				answer: item.options[0].option_id,
				score: item.answer,
				question_type: item.question.question_type
			}
		} else {
			this.saveData = {
				user_id: this.userId,
				question_id: item.question.question_id,
				answer: item.answer,
				score: '',
				question_type: item.question.question_type,
				option_order: item.question.option_order
			}
		}

		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr);
		if (userData) {
			this.isLoading = true;
			this.cd.detectChanges();
			// this.spinner.show();
			this.onboarding.submit_Onboarding_Answers(this.saveData).subscribe((data: any) => {
				this.isLoading = false;
				this.cd.detectChanges();
				if (data.status == 'OK') {
					if (string == 'nextButton') {
						this.cd.detectChanges();
						setTimeout(() => {
							this.myStepper.next();
						}, 100)

						if (index == this.bookingForm.controls.length - 1) {
							this.formArrayLength = this.bookingForm.controls.length - 1;
							this.order = item.question.question_order;

							if (this.checkGeranalQuestionSave.length == 0) {
								this.checkGeranalQuestionSave.length = 12
							}

							this.totalPer = this.percentage(1 + this.order, this.totalActivities);
						}
					} else {

						const dialogRef = this.dialog.open(ConfirmationComponent, {
							data: { name: this.name, animal: this.animal }
						});

						dialogRef.afterClosed().subscribe(result => {
							if (result == 'logout') {
								this.userService.logout_user({ 'user_id': this.userId }).subscribe((data: any) => {
									this.messageService.login('showHeaderFooter');
									if (document.getElementById("toastr-container") != null) {
										document.getElementById("toastr-container").style.display = "none";
									}
									localStorage.removeItem("loginUser");
									localStorage.removeItem("token");
									this.router.navigate(['home'])
								})
							}
						});
					}
				} else {
					this.toastr.errorToastr(data.error, 'Oops!', {
						position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
					});
				}
			}, error => {
				this.isLoading = false;
			})
		} else {
			this.router.navigate(['home'])
		}
	}


	removeCurrent(index) {
		this.index = index;
		if (index > 0) {
			if (this.bookingForm.controls[index].value.question.question_order != this.bookingForm.controls[index - 1].value.question.question_order) {
				setTimeout(() => {
					this.order = this.bookingForm.controls[index - 1].value.question.question_order;
					this.order = Number(this.order) - 1;
					this.removeFirst = true;
					this.bookingForm.controls.splice(index, this.bookingForm.controls.length - 1);
					this.formArrayLength = this.bookingForm.controls.length;
					this.totalPer = this.percentage(this.order, this.totalActivities);
				}, 1000)
			}
		} else {
			this.removeFirst = true;
			this.totalPer = this.percentage(1, this.totalActivities);
		}
		this.goBack();
	}

	goBack() {
		this.myStepper.previous();
	}

	// Logout From Onboarding
	logout() {
		const dialogRef = this.dialog.open(ConfirmationComponent, {
			data: { name: this.name, animal: this.animal }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result == 'logout') {
				let currentUesr = localStorage.getItem("loginUser");
				let userData = JSON.parse(currentUesr);
				if (userData) {
					this.userService.logout_user({ 'user_id': this.userId }).subscribe((data: any) => {
						this.messageService.login('showHeaderFooter');
						localStorage.removeItem("loginUser");
						localStorage.removeItem("token");
						this.router.navigate(['home'])
					})
				} else {
					this.router.navigate(['home'])
				}
			}
		});
	}

	// Go to membership page after adding onboarding %
	goToSubscribe() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.lastFrom.invalid) {
			return;
		}

		let currentUesr = localStorage.getItem("loginUser");
		let userData = JSON.parse(currentUesr);
		if (userData) {
			this.spinner.show();
			this.userService.complete_profile({ 'profile_completeness_id': 1, 'user_id': this.userId }).subscribe((data: any) => {
				this.spinner.hide();
				if (data.status == 'OK') {
					userData.onboarding_complete = 1;
					localStorage.setItem('loginUser', JSON.stringify(userData));
					if (userData.gender == '1') {
						this.router.navigate(['home/trustplus/apm']);
					} else {
						this.router.navigate(['home/trustplus/apfi']);
					}
				}
				this.updateUserScore();
				this.retakeOnboarding();
				this.HeaderService.updateProfilePercantage(true);
				this.messageService.change.emit(true);
			}, error => {
				this.spinner.hide();
			})
		} else {
			this.router.navigate(['home'])
		}
	}

	//Update Trust Score Function
	updateUserScore() {
		this.userService.update_score({ 'user_id': this.userId }).subscribe((data: any) => { })
	}


	//Retake Onboarding Function
	retakeOnboarding() {
		this.userService.retake_onboarding({ retake: '0', 'user_id': this.userId }).subscribe((data: any) => {
		})
	}

	changeCounterState(selectedValue, data, string) {
		let obj = data.options.find(obj => obj.option_id == selectedValue);
		this.stateId = obj.states[0].option_id;
		this.states = obj.states;
	}

	radioChange(event) {
		if (event.value == 0) {
			this.dialog.open(OnboardignModalComponent);
		}
	}

	getOrderNumber(event, item) {
		item.question['option_order'] = event;
	}

	matchRegex(str) {
		return str.match(/^.*\b(vimeo.com|youtube)\b.*$/);
	}
}