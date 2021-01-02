import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

//Import library
import { Router, ActivatedRoute } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";;
import { Options } from 'ng5-slider';
import { MatStepper } from '@angular/material/stepper';
import { HttpEvent } from '@angular/common/http';


//Import components
import { videoUserComponent } from '../video-model-user/video-model.component';
import { IconComponent } from '../icon-modal/icon-modal.component';
import { coverBannerComponent } from '../cover-banner-modal/cover-banner-modal.component';
import { ConfirmationComponent } from '../../main/home/confirmation-model/confirmation-model.component';
import { CropbannerComponent } from '../crop-banner/crop-banner.component';
import { RetakeModalComponent } from '../retake-modal/retake-modal.component';
import { PlanValidationPopup } from '../plan-validation-popup/plan-validation-popup.component';
import { showMessageComponent } from '../show-message/show-message.component';
import { OpenImageComponent } from '../open-image/open-image.component';
import { UploadvideoprogressComponent } from '../uploadvideoprogress/uploadvideoprogress.component';



//Import Services
import { userService } from '../../../shared/services/user/user.service';
import { MessageService } from '../../../eventservice';
import { HeaderService } from '../../../shared/services/header/header.service';
import { footerService } from '../../../shared/services/footer/footer.service';
import { appConfig } from 'src/app/shared/services/app.config';
declare var require: any


@Component({
	selector: 'app-editprofile',
	templateUrl: './editprofile.component.html',
	styleUrls: ['./editprofile.component.css']
})

export class EditprofileComponent implements OnInit {
	@ViewChild('stepper', { static: false }) private myStepper: MatStepper;

	interestForm: FormGroup;
	uploadId: FormGroup;
	formGroup: FormGroup;
	bookingForm: FormArray;
	userProfileData: any;
	dataindex: any;
	errorMessage: any;
	showProfileImage: any;
	showProfileImageDimension: any;
	hobbies: any;
	selectedValue: number;
	showCoverImage: any;
	totalCount: any;
	profile_completness: any;
	aboutMeCompleted: any;
	completed: any;
	gallaryComplete: any;
	wordsArray: any;
	timerInterval: any;
	interest_text: any;
	connectionArray: any;
	leisureArray: any;
	growthArray: any;
	prosperityArray: any;
	spiritualityArray: any;
	currentUser: any;
	storeValue: any;
	selectedOptionId: any;
	hidefluency: any;
	fileToUpload: any;
	selectedImage: any;
	interest_id: any;
	showSaveButton: any;
	coverBanner: any;
	userGender: any;
	showImagesUrl: any = [];
	exsitingAnswer: any = [];
	userInterest: any = [];
	checkVisiable: any = [];
	sendData: any = [];
	aboutMeData: any = [];
	_albums: any = [];
	previewUrl: any = [];
	showVideo: any = [];
	showStory: any = [];
	checkInterestArray: any = [];
	id_masters: any = [];
	id_proof: any = [];
	checkArray: any = [];
	catScore: any = [];
	generalAnswers: any = [];

	fileData: File = null;
	choosefileData: File = null;
	coverfileData: File = null;
	videofileData: File = null;
	fileUploadProgress: string = null;
	uploadedFilePath: string = null;

	isLinear = true;
	submitted = false;
	proofSubmitted = false;
	learnMore = false;
	showDiv = false;
	hideLoader = false;
	disbaleButton = true;
	showMore = false;
	imageCheck = false;
	proofId = false;
	imagePath = '';
	twitter = '';
	instagram = '';
	facebook = '';
	selectedProofId: any = 0;
	userStatus: any = [];
	defaultImage = require('../../../../assets/chat/image-loader.gif');
	options: Options = {
		floor: 1,
		ceil: 5,
		step: 1,
		showTicks: true,
		showSelectionBar: true,
		disabled: true,
	};
	bucketUrl = appConfig.bucketUrl;
	activeTopTab : string = 'profile';
	valueBeliefTabs : string = '';
	constructor(
		private userService: userService,
		private spinner: NgxSpinnerService,
		private toastr: ToastrManager,
		private messageService: MessageService,
		public dialog: MatDialog,
		private formBuilder: FormBuilder,
		public headerService: HeaderService,
		private router: Router,
		private footerService: footerService,
		private route: ActivatedRoute,
		private sanitizer: DomSanitizer
	) {
		let currentUesr = localStorage.getItem("loginUser");
		if (currentUesr == null) {
			this.router.navigate(['home'])
			this.messageService.login('homePage');
		} else {
			this.currentUser = JSON.parse(currentUesr);
			this.selectedValue = 1;
			this.showCoverImage = {
				path: ''
			}

			this.interestForm = this.formBuilder.group({
				interest_name: [''],
				interest_text: ['', Validators.required],
				user_id: [this.currentUser.id]
			});
			this.profileCompletness();
		}

		this.formGroup = this.formBuilder.group({
			bookingForm: this.formBuilder.array([this.formBuilder.group({
				question: new FormControl(''),
				answer: new FormControl(''),
				question_id: new FormControl(''),
				is_visible: new FormControl(''),
			})])
		})

		this.bookingForm = this.formGroup.get('bookingForm') as FormArray;
	}

	formData() {
		return (this.formGroup.get('bookingForm') as FormArray).controls;
	}

	get f() { return this.interestForm.controls; }


	ngOnInit() {
		window.scrollTo(0, 0);
		this.messageService.login('showHeaderSubscription');
		this.footerService.hidefooter(true);
		this.spinner.show();
		this.userService.get_user_profile_data({ 'user_id': this.currentUser.id, 'loggedin_user': this.currentUser.id }).subscribe((data: any) => {

			if (this.route.snapshot.paramMap.get('string')) {
				localStorage.setItem("afterReloadSelectedTabs", this.route.snapshot.paramMap.get('string'))
				// this.changeTabs(this.route.snapshot.paramMap.get('string'))
				this.activeTopTab = this.route.snapshot.paramMap.get('string');
			}

			if (localStorage.getItem("afterReloadSelectedTabs") != null) {
				// this.changeTabs(localStorage.getItem("afterReloadSelectedTabs"))
				this.activeTopTab = localStorage.getItem("afterReloadSelectedTabs");
			}
			if (data.status == 'OK') {
				this.userProfileData = data.records;
				if (this.userProfileData.profileStatus != null) {
					this.selectedValue = this.userProfileData.profileStatus;
				}
				this.showProfileImage = this.userProfileData.profile_img;
				if(this.userProfileData.profile_img_dimension) {
					this.showProfileImageDimension = this.userProfileData.profile_img_dimension;
				}
				this.gallaryComplete = this.userProfileData.gallaryComplete;
				this.userStatus = this.userProfileData.all_status;

				if (this.userProfileData.banner_img) {
					this.showCoverImage = this.userProfileData.banner_img;
				}
				this.catScore = this.userProfileData.loggedUserScore;

				this.catScore.forEach(item => {
					if (item.name == "CONNECTION") {
						this.connectionArray = item;

					} else if (item.name == "LEISURE") {
						this.leisureArray = item;

					} else if (item.name == "GROWTH") {
						this.growthArray = item;

					} else if (item.name == "PROSPERITY") {
						this.prosperityArray = item;

					} else if (item.name == "SPIRITUALITY") {
						this.spiritualityArray = item;
					}
				})


				this.previewUrl = this.userProfileData.gallaryData.images;
				this.showImagesUrl = this.userProfileData.gallaryData.images;
				this.generalAnswers = this.userProfileData.generalAnswers;
				this.generalAnswers[12].options.shift();
				this.id_masters = this.userProfileData.id_masters;
				this.id_proof = this.userProfileData.id_proof[0];
				if (this.id_proof) {
					this.selectedImage = this.id_proof.path;
					this.selectedProofId = this.userProfileData.id_proof[0].proof_id;
				}

				if (this.userProfileData.social_media_link != 'null') {
					this.facebook = this.userProfileData.social_media_link;
				}

				let obj = this.generalAnswers[10].options.find(obj => obj.option_id == this.generalAnswers[10].choosed_id);
				if (obj) {
					this.selectedOptionId = obj.option;
				}

				let check = this.generalAnswers[11].options.find(obj => obj.option_id == this.generalAnswers[11].choosed_id);
				if (check) {
					this.hidefluency = check.option;
				}


				for (let i = 0; i < this.previewUrl.length; i++) {
					const src = this.previewUrl[i].path
					const album = {
						src: src
					};
					this._albums.push(album);
				}


				this.showVideo = this.userProfileData.gallaryData.videos;
				this.showStory = this.userProfileData.gallaryData.story;

				this.totalCount = this.userProfileData.gallaryImageCount + this.userProfileData.gallaryVideoCount;
				this.fetchAboutMeData();
				this.fetchUserBanner();

				this.userProfileData.generalAnswers.forEach(item => {
					this.sendData.push({ 'question_id': item.question_id, 'answer': item.choosed_id == undefined ? '0' : item.choosed_id, 'question_type': '1' })
				});

				this.bookingForm.removeAt(0);
			}
		}, error => {
			this.spinner.hide();
		})
	}

	ngOnDestroy() {
		// Will clear when component is destroyed e.g. route is navigated away from.
		clearInterval(this.timerInterval);
	}

	fetchAboutMeData() {
		//this.spinner.show();
		this.checkVisiable = [];
		this.userService.get_admin_added_aboutme({ 'user_id': this.currentUser.id, 'loggedin_user': this.currentUser.id }).subscribe((data: any) => {
			this.spinner.hide();
			this.aboutMeCompleted = data.adminAbout;
			this.fetchInterestData();

			if (data.status == 'OK') {
				this.aboutMeData = data.records.admin_data;
				this.exsitingAnswer = data.records.user_data != undefined ? data.records.user_data : [];
				this.aboutMeData.forEach(obj => {
					this.bookingForm.push(
						this.formBuilder.group({
							question: new FormControl(obj.question),
							answer: new FormControl(obj.answer),
							question_id: new FormControl(obj.question_id),
							is_visible: new FormControl(obj.is_visible)
						})
					);
				})

				this.exsitingAnswer.forEach(item => {
					if (item.is_visible == '1') {
						this.checkVisiable.push(item);
					}
				});
			}
		}, error => {
			this.spinner.hide();
		})
	}


	fetchUserBanner() {
		this.userService.get_user_banner({ 'user_id': this.currentUser.id }).subscribe((data: any) => {
			this.spinner.hide();
			if (data.status == 'OK') {
				this.coverBanner = data.video[0]
			}
		}, error => {
			this.spinner.hide();
		})
	}

	fetchInterestData() {
		this.userService.get_admin_added_interest({ 'user_id': this.currentUser.id, 'loggedin_user': this.currentUser.id }).subscribe((data: any) => {
			this.hideLoader = true;
			if (data.records) {
				this.userInterest = data.records
				this.completed = data.admin_interest;
			}
		}, error => {
			this.spinner.hide();
		})
	}

	profileCompletness() {
		this.userService.get_user_profile_completness_data({ 'user_id': this.currentUser.id }).subscribe((data: any) => {
			this.spinner.hide();
			if (data.status == 'OK' && data.records) {
				this.checkArray = data.records.next;
				this.profile_completness = this.checkArray[0];
				// let me = this;
				let count = 0;
				if (this.checkArray.length > 1) {

					this.timerInterval = setInterval(() => {
						this.profile_completness = this.checkArray[count];
						if (this.checkArray.length - 1 != count) {
							count = Number(count) + 1;
						} else {
							count = 0
						}
					}, 7000);
				}
			}
		}, error => {
			this.spinner.hide();
		})
	}


	show() {
		this.learnMore = true;
	}

	hide() {
		this.learnMore = false;
	}

	viewVideoPhoto() {
		var elems = document.querySelectorAll(".active");
		elems[0].classList.remove('active')

		var element = document.getElementById("photoId");
		element.classList.add("active")
	}

	updateExistingInterest(data) {
		if(data.text == '' || data.text == null) {
			this.toastr.errorToastr('The answer can not be empty. Please answer question before the update.', 'Oops!', {
				position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
			});
			return;
		}
		if (data.interest_id) {
			var index = this.checkInterestArray.map(x => { return x.id }).indexOf(data.interest_id);
			if (index != -1) {
				this.checkInterestArray.splice(index, 1)
			}

			this.checkInterestArray.push({ 'id': data.interest_id });
		}

		var formData = {
			'interest_text': data.text,
			'user_id': this.currentUser.id,
			'interest_id': data.interest_id
		}
		this.disbaleButton = false;
		this.spinner.show();
		this.userService.add_New_interest(formData).subscribe((data: any) => {
			this.spinner.hide();
			if (data.status == 'OK') {
				this.toastr.successToastr('Record updated successfully.', 'Success',
					{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
				);
			}
			setTimeout(() => {
				this.disbaleButton = true;
			}, 4500)
		}, error => {
			this.disbaleButton = true;
			this.spinner.hide();
		})
	}

	openVideoModal(video): void {
		this.dialog.open(videoUserComponent, {
			data: { 'video': video }
		});
	}


	chooseInterestIcon(index): void {
		const dialogRef = this.dialog.open(IconComponent, {
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				if (index >= 0) {
					this.userInterest[index].interest_logo = result;
				} else {
					this.hobbies = result.logo_link;
					this.interest_text = result.interest_text;
					this.interest_id = result.id;
					this.interestForm.get('interest_name').setValue(result.interest_name);
					this.showAddIntesestForm();
				}
			}
		});
	}


	//Add new interest
	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.interestForm.invalid) {
			return;
		}

		var formData = {
			'interest_text': this.interestForm.value.interest_text,
			'user_id': this.currentUser.id,
			'interest_id': this.interest_id
		}

		this.spinner.show();
		this.userService.add_New_interest(formData).subscribe((data: any) => {
			this.userInterest.unshift({ 'interest_name': this.interestForm.value.interest_name, 'text': this.interestForm.value.interest_text, 'user_id': this.currentUser.id, 'logo_link': this.hobbies, 'interest_text': this.interest_text, 'interest_id': data.interest_id })
			if (this.userInterest.length == 4 && this.completed != "complete") {
				this.update_profile_status(4);
			}
			this.showDiv = false;
			this.interestForm.reset();
			this.submitted = false;
			this.spinner.hide();
			this.toastr.successToastr('Interest added successfully.', 'Success',
				{ enableHTML: true, toastTimeout: 3000, position: 'top-center', animate: 'slideFromTop', showCloseButton: true }
			);
		}, error => {
			this.spinner.hide();
		})
	}



	//Get values of the questions
	filterChanged(selectedValue, data, string) {
		let obj = data.options.find(obj => obj.option_id == selectedValue);
		if (string == 'selectedOptionId') {
			this.selectedOptionId = obj.option;
		} else if (string == 'hidefluency') {
			this.hidefluency = obj.option;
		}


		if (data.question_id == 5 && data.choosed_option == 'No') {
			this.generalAnswers[2].choosed_option = 'Yes';
			this.sendData[3].answer = this.generalAnswers[3].options[0].option_id;
			this.sendData[4].answer = this.generalAnswers[4].options[0].option_id;
			this.sendData[5].answer = this.generalAnswers[5].options[0].option_id;
			this.sendData[6].answer = this.generalAnswers[6].options[0].option_id;
			this.sendData[7].answer = this.generalAnswers[7].choosed_id;
		} else if (data.question_id == 5 && data.choosed_option == 'Yes') {
			this.generalAnswers[2].choosed_option = 'No';
			this.sendData[3].answer = '0';
			this.sendData[4].answer = '0';
			this.sendData[5].answer = '0';
			this.sendData[6].answer = '0';
			this.sendData[7].answer = this.generalAnswers[7].choosed_id;
		} else if (obj.question_id == 14 && obj.option != 'No second language spoken') {
			this.generalAnswers[11].choosed_option = '';
			this.sendData[12].answer = this.generalAnswers[12].options[0].option_id;

		} else if (obj.question_id == 14 && obj.option == 'No second language spoken') {
			this.generalAnswers[11].choosed_option = 'No second language spoken';
			this.sendData[12].answer = '0';
		}


		var index = this.sendData.map(x => { return x.question_id; }).indexOf(data.question_id);
		if (index != -1) {
			this.sendData.splice(index, 1);
		}

		this.sendData.push({ 'question_id': data.question_id, 'answer': selectedValue, 'question_type': '1' })
		var firstRun = this.sendData.sort(function (a, b) {
			return (a.question_id - b.question_id);
		});

		this.sendData = firstRun
	}


	//Update gerenal questions
	updateGeneralQuestions() {
		var data = { 'user_id': this.currentUser.id, 'answer': this.sendData }
		this.spinner.show();
		this.userService.update_Questions(data).subscribe((data: any) => {
			this.spinner.hide();
			this.toastr.successToastr('Record updated successfully.', 'Success',
				{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
			);
		}, error => {
			this.spinner.hide();
		})
	}

	//show and hide the interest form
	showAddIntesestForm() {
		if (this.showDiv == false) {
			this.showDiv = true;
		}
	}

	randomThingsCheckbox(data) {
		var action = data.is_visible == '1' ? '0' : '1';
		var formdata = {
			'question_id': data.question_id,
			'user_id': this.currentUser.id,
			'answer': data.answer,
			'is_visible': action
		}

		var index = this.checkVisiable.map(x => { return x.question_id; }).indexOf(data.question_id);
		if (index == -1) {
			this.checkVisiable.push(formdata)
		} else {
			this.checkVisiable.splice(index, 1);
		}
	}

	//Update random things
	updateRandomThings(item, index) {
		this.disbaleButton = false;
		let postData = {
			'answer': item.value.answer,
			'question_id': item.value.question_id,
			'user_id': this.currentUser.id,
			'is_visible': '1',
			'action': 'insert'
		}
		this.spinner.show();
		this.userService.update_about_me_data(postData).subscribe((data: any) => {
			this.spinner.hide();
			if (data.status == 'OK') {
				var indexId = this.checkVisiable.map(x => { return x.question_id; }).indexOf(postData.question_id);
				if (indexId == -1) {
					this.checkVisiable.push(postData);
				}

				this.toastr.successToastr('Record updated successfully.', 'Success',
					{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
				);
				this.showSaveButton = false;
				if (this.aboutMeCompleted == '' && this.checkVisiable.length == 4) {
					this.update_profile_status(5);
				}
			}
			setTimeout(() => {
				this.disbaleButton = true;
			}, 4500)

			let frmArray = this.formGroup.get('bookingForm') as FormArray;
			frmArray.clear();

			setTimeout(() => {
				this.fetchAboutMeData();
			}, 300)
		}, error => {
			this.spinner.hide();
		})
	}


	uploadGalleryImage(fileInput: any) {
		let windowIns : any = window;
		var _URL = windowIns.URL || windowIns.webkitURL;
		var file, img;
		if ((file = <File>fileInput.target.files[0])) {
			var mimeType = file.type;
			if (mimeType.split('/')[1] == 'gif' || mimeType.split('/')[1] == 'svg+xml') {
				this.toastr.errorToastr("Allowed Image extensions: jpeg, jpg, png.", 'Oops!', {
					position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
				});
				return;
			}

			if (mimeType.match(/image\/*/) == null) {
				this.toastr.errorToastr("Allowed Image extensions: jpeg, jpg, png.", 'Oops!', {
					position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
				});
				return;
			}

			img = new Image();
			var objectUrl = _URL.createObjectURL(file);
			img.onload =  () => {
				if (img.width < 240 && img.height < 240) {
					this.toastr.errorToastr("Image dimension should be greater than or equal to 240X240.", 'Oops!', {
						position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
					});
				} else {
					const dialogRef = this.dialog.open(CropbannerComponent, {
						data: { image: fileInput, string: 'gallery', width: img.width, height: img.height }
					});
					dialogRef.afterClosed().subscribe(result => {
						if (result) {
							const formData = new FormData();
							formData.append('image', result);
							formData.append('type', 'gallary_img');
							formData.append('user_id', this.currentUser.id);
							const dialogRef = this.dialog.open(UploadvideoprogressComponent, {
								data: { percentage: 0 }
							});
							this.userService.change_gallery(formData).subscribe((data: any) => {
								if (data.type === 1) {
									const percentDone = Math.round(100 * data.loaded / data.total);
									dialogRef.componentInstance.data.percentage = percentDone;
								}
								if (data.type === 4) {
									dialogRef.close();
									this.previewUrl.unshift(data.body.inserted_data);
									this.showPopup('Image')
									const album = {
										src: data.body.url
									};
									this._albums.unshift(album);
									this.spinner.hide();
								}
							})
						}
					})
				}
				_URL.revokeObjectURL(objectUrl);
			};
			img.src = objectUrl;
		}
	}

	showPopup(text) {
		this.dialog.open(showMessageComponent, {
			data: { condition: text }
		});
	}


	preview(string) {
		// Show preview
		var mimeType = this.videofileData.type;
		if (mimeType.match(/video\/*/) == null) {
			this.toastr.errorToastr("Only videos are allowed.", 'Oops!', {
				position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
			});
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(this.videofileData);
		reader.onload = (_event) => {
			const formData = new FormData();
			formData.append('file', this.videofileData);
			if (string == 'video') {
				formData.append('type', 'gallary_video');
			} else {
				formData.append('type', 'story');
			}
			formData.append('user_id', this.currentUser.id);
			const dialogRef = this.dialog.open(UploadvideoprogressComponent, {
				data: { percentage: 0 }
			});
			const uploading = this.userService.change_video(formData).subscribe((data: any) => {
				if (data.type === 1) {
					const percentDone = Math.round(100 * data.loaded / data.total);
					dialogRef.componentInstance.data.percentage = percentDone;
				}
				if (data.type === 4) {
					dialogRef.close();
					this.showPopup('Video');
					if(data.body.status == 'error') {
						this.toastr.errorToastr(data.body.error, 'Oops!', {
							position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
						});
					} else {
						if (string == 'video') {
							this.showVideo = [];
							this.showVideo.unshift(data.body.inserted_data);
						} else {
							this.showStory = [];
							this.showStory.unshift(data.body.inserted_data);
						}
					}
				}
			})

			dialogRef.afterClosed().subscribe(result => {
				uploading.unsubscribe();
			});
		}
	}

	update_profile_status(id) {
		this.spinner.show();
		this.userService.complete_profile({ 'profile_completeness_id': id, 'user_id': this.currentUser.id }).subscribe((data: any) => {
			this.spinner.hide();
			if (data.status == 'OK') {
				this.headerService.updateProfilePercantage(true);
				this.profileCompletness();
			}
		}, error => {
			this.spinner.hide();
		})
	}

	changeStatus(item) {
		this.spinner.show();
		this.userService.update_status({ 'status': item, 'user_id': this.currentUser.id }).subscribe((data: any) => {
			this.spinner.hide();
			if (data.status == 'OK') {
				this.toastr.successToastr('Status updated successfully.', 'Success',
					{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
				);
			}
		}, error => {
			this.spinner.hide();
		})
	}

	deletePofileImage(string) {
		const dialogRef = this.dialog.open(ConfirmationComponent, {
			data: { name: 'deleteImage', string: string }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.spinner.show();
				this.userService.remove_user_profile_image({ 'user_id': this.currentUser.id }).subscribe((data: any) => {
					this.spinner.hide();
					if (data.status == 'OK') {
						this.showProfileImage = '';
						this.headerService.changeProfileImage('');
						this.profileCompletness();
						this.headerService.updateProfilePercantage(true);
						this.toastr.successToastr('Profile Image deleted successfully.', 'Success',
							{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
						);
					}
				}, error => {
					this.spinner.hide();
				})
			}
		})
	}


	deleteImage(index, item, string) {
		const dialogRef = this.dialog.open(ConfirmationComponent, {
			data: { name: 'deleteImage', string: string }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result == 'delete') {
				this.spinner.show();
				this.userService.delete_image_video({ 'id': item.id, 'user_id': this.currentUser.id, 'type': string }).subscribe((data: any) => {
					this.spinner.hide();
					if (data.status == 'OK') {
						if (string == 'image') {
							this.previewUrl.splice(index, 1);
							this._albums.splice(index, 1);
							if (this.previewUrl.length == 2) {
								this.gallaryComplete = '';
								this.profileCompletness();
								this.headerService.updateProfilePercantage(true);
							}
							this.toastr.successToastr('Image deleted successfully.', 'Success',
								{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
							);
						} else {
							if (string == 'video') {
								this.showVideo.splice(index, 1);
								this.profileCompletness();
								this.headerService.updateProfilePercantage(true);
								this.toastr.successToastr('Video deleted successfully.', 'Success',
									{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
								);
							} else {
								this.showStory.splice(index, 1);
								this.toastr.successToastr('Story deleted successfully.', 'Success',
									{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
								);
							}
						}
					}
				}, error => {
					this.spinner.hide();
				})
			}
		});
	}

	changeProfileImage(fileInput: any) {
		let windowIns : any = window;
		var _URL = windowIns.URL || windowIns.webkitURL;
		var file, img;
		if ((file = <File>fileInput.target.files[0])) {
			var mimeType = file.type;
			if (mimeType.split('/')[1] == 'gif' || mimeType.split('/')[1] == 'svg+xml') {
				this.toastr.errorToastr("Allowed Image extensions: jpeg, jpg, png.", 'Oops!', {
					position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
				});
				return;
			}

			if (mimeType.match(/image\/*/) == null) {
				this.toastr.errorToastr("Allowed Image extensions: jpeg, jpg, png.", 'Oops!', {
					position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
				});
				return;
			}

			img = new Image();
			var objectUrl = _URL.createObjectURL(file);
			img.onload =  () => {
				if (img.width < 225 && img.height < 225) {
					this.toastr.errorToastr("Image dimension should be greater than or equal to 225X225.", 'Oops!', {
						position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
					});
				} else {
					const dialogRef = this.dialog.open(CropbannerComponent, {
						data: { image: fileInput, string: 'profile', width: img.width, height: img.height }
					});
					dialogRef.afterClosed().subscribe(result => {
						if (result) {
							const formData = new FormData();
							formData.append('image', result, file.name);
							formData.append('type', 'profile_img');
							formData.append('user_id', this.currentUser.id);
							const dialogRef = this.dialog.open(UploadvideoprogressComponent, {
								data: { percentage: 0 }
							});
							this.userService.change_gallery(formData).subscribe((data: any) => {
								if (data.type === 1) {
									const percentDone = Math.round(100 * data.loaded / data.total);
									dialogRef.componentInstance.data.percentage = percentDone;
								}
								if (data.type === 4) {
									dialogRef.close();
									this.currentUser = JSON.parse(localStorage.getItem("loginUser"));
									this.currentUser.profile_img = data.body.inserted_data.path;
									this.currentUser.profile_img_dimension = data.body.inserted_data.path_dimension;
									localStorage.setItem('loginUser',JSON.stringify(this.currentUser));
									this.headerService.profileDataUpdated.emit({});
									this.showPopup('Image')
								}
							})
						}
					})
				}
				_URL.revokeObjectURL(objectUrl);
			};
			img.src = objectUrl;
		}
	}


	//Upload greeting and story
	uploadGreetingAndStory(fileInput: any, text: any) {
		this.videofileData = <File>fileInput.target.files[0];
		this.preview(text);
	}

	//open cover images
	openCoverModal() {
		const dialogRef = this.dialog.open(coverBannerComponent, {
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.showCoverImage = result;
			}
		});
	}

	//Open onboarding retake modal
	openRetakeModal() {
		this.dialog.open(RetakeModalComponent, {
		});
	}

	goToProfile(string) {
		// localStorage.removeItem("afterReloadSelectedTabs");
		localStorage.setItem("afterReloadSelectedTabs", string);
		this.router.navigate(['home/dashboard/userprofile', { 'string': string }])
	}

	removeInterestFrom() {
		this.showDiv = false;
	}

	open(index: number): void {
		this.dialog.open(OpenImageComponent, { data: { 'images': this._albums, 'index': index } });
	}

	showMoreQuestion() {
		this.showMore = this.showMore == false ? true : false;
	}

	//Upload user ID/Proof
	uploadIdProof() {

		//stop here if form is invalid
		if (this.selectedProofId != 0 && this.selectedImage == undefined) {
			this.imageCheck = true;
			return;
		}

		if (this.selectedProofId == 0 && this.selectedImage) {
			this.proofId = true;
			return;
		}

		//Regular expression for valid link
		var rexFb = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

		if (this.facebook && !rexFb.test(this.facebook)) {
			this.toastr.errorToastr('Please enter a valid link', 'Oops!', {
				position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
			});
			return false;
		}

		//Append form data
		const formData = new FormData();
		formData.append('file', this.fileToUpload);
		formData.append('type_id', this.selectedProofId);
		formData.append('user_id', this.currentUser.id);
		formData.append('social_media_link', this.facebook);

		this.spinner.show();
		this.userService.id_proof_upload(formData).subscribe((data: any) => {
			this.toastr.successToastr('Proof updated successfully.', 'Success',
				{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
			);
			this.spinner.hide();
		}, error => {
			this.spinner.hide();
		})
	}

	selectProofOption(event) {
		this.selectedProofId = event;
	}

	// Choose proof image
	handleFileInput(files) {
		if (files.target.files && files.target.files[0]) {
			var reader = new FileReader();
			this.imagePath = files.target.files[0]
			reader.readAsDataURL(files.target.files[0]); // read file as data url
			reader.onload = (event) => { // called once readAsDataURL is completed
				var imageType = files.target.files[0]
				var mimeType = imageType.type;

				if (mimeType.split('/')[1] == 'gif' || mimeType.split('/')[1] == 'svg+xml') {
					this.toastr.errorToastr("Allowed Image extensions: jpeg, jpg, png ", 'Oops!', {
						position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
					});
					return;
				}

				if (mimeType.match(/image\/*/) == null) {
					this.toastr.errorToastr("Allowed Image extensions: jpeg, jpg, png.", 'Oops!', {
						position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
					});
					return;
				}

				this.fileToUpload = files.target.files[0];
				this.selectedImage = reader.result; //add source to image
			}
		}
	}

	changeTabs(string) {
		
		if (string == 'retake') {
			this.openRetakeModal();
		}
		this.router.navigate(['home/dashboard/editprofile', {}]);
	}

	//Remove single interest
	removeInterest(item, index, string) {
		const dialogRef = this.dialog.open(ConfirmationComponent, {
			data: { name: 'deleteImage', string: string }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result == 'delete') {
				this.spinner.show();
				this.userService.delete_user_interest({ 'id': item.interest_id, 'user_id': this.currentUser.id }).subscribe((data: any) => {
					this.spinner.hide();
					if (data.status == 'OK') {
						this.userInterest.splice(index, 1)
						if (this.userInterest.length == 3) {
							this.completed = '';
							this.profileCompletness();
							this.headerService.updateProfilePercantage(true);
						}

						this.toastr.successToastr('Interest deleted successfully.', 'Success',
							{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
						);
					}
				}, error => {
					this.spinner.hide();
				})
			}
		});
	}

	activeTabs(string) {
		localStorage.setItem("afterReloadSelectedTabs", string);
		this.activeTopTab = string;
	}

	goToNext() {
		this.showSaveButton = false;
		this.myStepper.next();
	}

	goToPrev() {
		this.showSaveButton = false;
		this.myStepper.previous();
	}

	onChangeText(event) {
		this.showSaveButton = event.target.value ? true : false;
	}

	deleteAboutMe(item, index) {
		if (item) {
			const dialogRef = this.dialog.open(ConfirmationComponent, {
				data: { name: 'deleteImage', string: 'random thing' }
			});

			dialogRef.afterClosed().subscribe(result => {
				if (result == 'delete') {
					this.spinner.show();
					this.userService.delete_about_me_question({ 'question_id': item.question_id, 'user_id': this.currentUser.id }).subscribe((data: any) => {
						this.spinner.hide();
						this.showSaveButton = false;
						if (data.status == 'OK') {
							this.exsitingAnswer.splice(index, 1);
							var indexId = this.checkVisiable.map(x => { return x.question_id; }).indexOf(item.question_id);
							this.checkVisiable.splice(indexId, 1)

							if (this.checkVisiable.length == 3) {
								this.completed = '';
								this.profileCompletness();
								this.headerService.updateProfilePercantage(true);
							}

							let frmArray = this.formGroup.get('bookingForm') as FormArray;
							frmArray.clear();

							setTimeout(() => {
								this.fetchAboutMeData();
							}, 300)
							this.toastr.successToastr('Random thing deleted successfully.', 'Success',
								{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
							);
						}
					}, error => {
						this.spinner.hide();
					})
				}
			});
		}
	}

	updateAnswer() {
		let emptyAnswer = this.exsitingAnswer.find(x=>(x.answer == '' || x.answer == null));
		console.log('emptyAnswer',emptyAnswer);
		if(emptyAnswer != null && emptyAnswer != undefined) {
			this.toastr.errorToastr('The answer can not be empty. Please answer all questions before the update.', 'Oops!', {
				position: 'top-full-width', toastTimeout: 3000, animate: 'slideFromTop', showCloseButton: true
			});
			return;
		}
		var postData = {
			'data': this.exsitingAnswer,
			'user_id': this.currentUser.id,
			'action': 'update'
		}
		this.spinner.show();
		this.userService.update_about_me_data(postData).subscribe((data: any) => {
			this.spinner.hide();
			if (data.status == 'OK') {
				this.toastr.successToastr('Record updated successfully.', 'Success',
					{ enableHTML: true, toastTimeout: 3000, position: 'top-full-width', animate: 'slideFromTop', showCloseButton: true }
				);
			}
		}, error => {
			this.spinner.hide();
		})
	}

	openValidationPopup(text) {
		this.dialog.open(PlanValidationPopup, {
			data: { name: text }
		});
	}
}
