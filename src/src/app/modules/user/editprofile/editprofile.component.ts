import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

//Import library
import { Router, ActivatedRoute } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { Options } from 'ng5-slider';
import { MatStepper } from '@angular/material/stepper';


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



//Import Services
import { userService } from '../../../shared/services/user/user.service';
import { MessageService } from '../../../eventservice';
import { HeaderService } from '../../../shared/services/header/header.service';
import { footerService } from '../../../shared/services/footer/footer.service';
declare var require: any


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})

export class EditprofileComponent implements OnInit {
  @ViewChild('files', {static: false}) myInputVariable: ElementRef;
  @ViewChild('filesv', {static: false}) myInputVideo: ElementRef;
  @ViewChild('filesg', {static: false}) myInputGreeting: ElementRef;
  @ViewChild('stepper',{static : false}) private myStepper: MatStepper;

  interestForm    : FormGroup;
  uploadId        : FormGroup;
  formGroup       : FormGroup;
  bookingForm     : FormArray;
  userId          : any;
  userProfileData : any;
  dataindex       : any;
  errorMessage    : any;
  showProfileImage: any;
  hobbies         : any;
  selectedValue   : number;
  showCoverImage  : any;
  totalCount      : any;
  profile_completness: any;
  aboutMeCompleted: any;
  completed       : any;
  gallaryComplete : any;
  wordsArray      : any;
  timerInterval   : any;
  interest_text   : any;
  connectionArray : any;
  leisureArray    : any;
  growthArray     : any;
  prosperityArray : any;
  spiritualityArray : any;
  currentUser     : any;
  storeValue      : any;
  selectedOptionId: any;
  hidefluency     : any;
  fileToUpload    : any;
  selectedImage   : any;
  interest_id     : any;
  showSaveButton  : any;
  coverBanner     : any;
  userGender      : any;
  showImagesUrl   : any = [];
  exsitingAnswer  : any = [];
  userInterest    : any = [];
  checkVisiable   : any = [];
  sendData        : any = [];
  aboutMeData     : any = [];
  _albums         : any = [];
  previewUrl      : any = [];
  showVideo       : any = [];
  showStory       : any = [];
  checkInterestArray: any = [];
  id_masters      : any = [];
  id_proof        : any = [];
  checkArray      : any = [];
  catScore        : any = [];
  generalAnswers  : any = [];

  fileData        : File = null;
  choosefileData  : File = null;
  coverfileData   : File = null;
  videofileData   : File = null;
  fileUploadProgress: string = null;
  uploadedFilePath  : string = null;

  isLinear        =  true;
  submitted       = false;
  proofSubmitted  = false;
  learnMore       = false;
  showDiv         = false;
  hideLoader      = false;
  disbaleButton   = true;
  showMore        = false;
  imageCheck      = false;
  proofId         = false;
  imagePath       = '';
  twitter         = '';
  instagram       = '';
  facebook        = '';
  selectedProofId : any = 0;
  userStatus: any = [];
	defaultImage = require('../../../../assets/chat/image-loader.gif');
  options: Options = {
    floor : 1,
    ceil  : 5,
    step  : 1,
    showTicks : true,
    showSelectionBar : true,
    disabled : true,
  };

  constructor(
    private userService: userService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrManager,
    private messageService: MessageService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public headerService : HeaderService,
    private router: Router,
    private footerService: footerService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
      let currentUesr =  localStorage.getItem("loginUser");
      if(currentUesr == null){
        this.router.navigate(['home'])
        this.messageService.login('homePage');
      }else{
        let userData = JSON.parse(currentUesr)
        this.currentUser = userData
        console.log(this.currentUser);
        this.userId = userData.id
        this.selectedValue = 1;
        this.showCoverImage = {
          path : ''
        }

        this.interestForm = this.formBuilder.group({
          interest_name: [''],
          interest_text: ['', Validators.required],
          user_id:[this.userId]
        });
        this.profileCompletness();
      }

    this.formGroup = this.formBuilder.group({
      bookingForm: this.formBuilder.array([this.formBuilder.group({
        question: new FormControl(''),
        answer: new FormControl(''),
        question_id: new FormControl(''),
        is_visible : new FormControl(''),
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
    this.userService.get_user_profile_data({'user_id' :this.userId, 'loggedin_user' :this.userId}).subscribe((data: any) => {

      if(this.route.snapshot.paramMap.get('string')){
        localStorage.setItem("afterReloadSelectedTabs" , this.route.snapshot.paramMap.get('string'))
        this.changeTabs(this.route.snapshot.paramMap.get('string'))
      }

      if(localStorage.getItem("afterReloadSelectedTabs") != null){
        this.changeTabs(localStorage.getItem("afterReloadSelectedTabs"))
      }

      console.log(data.records);

      if(data.status == 'OK'){
        this.userProfileData = data.records;
        if(this.userProfileData.profileStatus != null){
          this.selectedValue = this.userProfileData.profileStatus;
        }
        this.showProfileImage = this.userProfileData.profile_img;
        this.gallaryComplete = this.userProfileData.gallaryComplete;
        this.userStatus = this.userProfileData.all_status;

        if(this.userProfileData.banner_img){
          this.showCoverImage = this.userProfileData.banner_img;
        }else{
          this.showCoverImage = {
            path : 'assets/profile/banner.png'
          }
        }
        this.catScore = this.userProfileData.loggedUserScore;

        this.catScore.forEach(item => {
         // console.log(item);
          if(item.name == "CONNECTION"){
            this.connectionArray = item;

          }else if(item.name == "LEISURE"){
            this.leisureArray = item;

          }else if(item.name == "GROWTH"){
            this.growthArray = item;

          }else if(item.name == "PROSPERITY"){
            this.prosperityArray = item;

          }else if(item.name == "SPIRITUALITY"){
            this.spiritualityArray = item;
          }
       })


        this.previewUrl = this.userProfileData.gallaryData.images;
        this.showImagesUrl = this.userProfileData.gallaryData.images;
        this.generalAnswers = this.userProfileData.generalAnswers;
        this.generalAnswers[12].options.shift();
        this.id_masters = this.userProfileData.id_masters;
        this.id_proof = this.userProfileData.id_proof[0];
        if(this.id_proof){
          this.selectedImage = this.id_proof.path;
          this.selectedProofId = this.userProfileData.id_proof[0].proof_id;
        }

        if(this.userProfileData.social_media_link != 'null'){
          this.facebook = this.userProfileData.social_media_link;
        }

        let obj = this.generalAnswers[10].options.find(obj => obj.option_id == this.generalAnswers[10].choosed_id);
        if(obj){
          this.selectedOptionId = obj.option;
        }

        let check = this.generalAnswers[11].options.find(obj => obj.option_id == this.generalAnswers[11].choosed_id);
        if(check){
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
          this.sendData.push({ 'question_id': item.question_id , 'answer' :item.choosed_id == undefined ? '0' : item.choosed_id, 'question_type':'1' })
        });

        this.bookingForm.removeAt(0);
      }
    }, error => {
      console.log(error);
      this.spinner.hide();
      this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
    })
  }

  ngOnDestroy() {
    // Will clear when component is destroyed e.g. route is navigated away from.
    clearInterval(this.timerInterval);
  }

 fetchAboutMeData() {
    //this.spinner.show();
    this.checkVisiable = [];
    this.userService.get_admin_added_aboutme({'user_id':this.userId, 'loggedin_user':this.userId}).subscribe((data: any) => {
     this.spinner.hide();
     this.aboutMeCompleted = data.adminAbout;
      this.fetchInterestData();

      if(data.status == 'OK'){
        this.aboutMeData = data.records.admin_data;
        this.exsitingAnswer = data.records.user_data != undefined ? data.records.user_data : [];
        console.log(this.exsitingAnswer)

        console.log(data.records)

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
          if(item.is_visible == '1'){
            this.checkVisiable.push(item);
          }
        });
      }
    }, error => {
      console.log(error);
      this.spinner.hide();
      this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
    })
  }


  fetchUserBanner(){
    this.userService.get_user_banner({'user_id': this.userId}).subscribe((data: any) => {
      this.spinner.hide();
      if(data.status == 'OK'){
         this.coverBanner = data.video[0]
      }
    }, error => {
      console.log(error);
      this.spinner.hide();
      //this.toastr.errorToastr(error.error, 'Oops!');
    })
  }

  fetchInterestData() {
    this.userService.get_admin_added_interest({'user_id':this.userId, 'loggedin_user':this.userId}).subscribe((data: any) => {
      console.log(data.records)
      this.hideLoader = true;
      if(data.records){
        this.userInterest = data.records
        this.completed = data.admin_interest;
        console.log(this.completed);
        // this.userInterest.forEach(item => {
        //   console.log(item);
        //   if(item.interest_id && item.user_id){
        //     this.checkInterestArray.push({'id' : item.interest_id});
        //   }
        // })
      }
    }, error => {
      console.log(error);
      this.spinner.hide();
      this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
    })
  }

  profileCompletness(){
    this.userService.get_user_profile_completness_data({'user_id':this.userId}).subscribe((data: any) => {
      this.spinner.hide();
      if(data.status == 'OK' && data.records){
        this.checkArray = data.records.next;
        this.profile_completness = this.checkArray[0];
        // let me = this;
        let count = 0;
        if(this.checkArray.length > 1){

          this.timerInterval = setInterval(() => {
            this.profile_completness =  this.checkArray[count];
            if(this.checkArray.length - 1 != count){
              count = Number(count) + 1;
            }else{
              count = 0
            }
          },7000);
        }
      }
    }, error => {
      console.log(error);
      this.spinner.hide();
      this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
    })
  }


  show(){
    this.learnMore = true;
  }

  hide(){
    this.learnMore = false;
  }

  viewVideoPhoto(){
    var elems = document.querySelectorAll(".active");
    elems[0].classList.remove('active')

    var element = document.getElementById("photoId");
    element.classList.add("active")
  }

  changeActiveTabs(string){
    console.log(string);
    var elems = document.querySelectorAll(".active");
    if(elems){
      elems[2].classList.remove('active')
    }

    if(string == 'overview'){
      var connection = document.getElementById("connection");
      if(connection){
         connection.classList.remove("active")
      }

      var leisure = document.getElementById("leisure");
      if(leisure){
       leisure.classList.remove("active")
      }

      var growth = document.getElementById("growth");
      if(growth){
       growth.classList.remove("active")
      }

      var prosperity = document.getElementById("prosperity");
      if(prosperity){
         prosperity.classList.remove("active")
      }

      var spirituality = document.getElementById("spirituality");
      if(spirituality){
         spirituality.classList.remove("active")
      }

      var element = document.getElementById("overview1");
      element.classList.add("active")
    }else if(string =='leisure'){
      var element = document.getElementById("leisu");
      element.classList.add("active")

    }else if(string =='connection'){
      var element = document.getElementById("conn");
      element.classList.add("active")

    }else if(string =='prosperity'){
      var element = document.getElementById("prosps");
      element.classList.add("active")

    }else if(string =='growth'){
      var element = document.getElementById("growt");
      element.classList.add("active")

    } else {
      var element = document.getElementById("spritl");
      element.classList.add("active")

    }
  }


  updateExistingInterest(data){
    if(data.interest_id){
      var index = this.checkInterestArray.map(x => {return x.id}).indexOf(data.interest_id);
      if(index != -1){
        this.checkInterestArray.splice(index, 1)
      }

      this.checkInterestArray.push({'id' : data.interest_id});
    }

    var formData = {
      'interest_text':data.text,
      'user_id':this.userId,
      'interest_id': data.interest_id
    }
    this.disbaleButton = false;
    this.spinner.show();
    this.userService.add_New_interest(formData).subscribe((data: any) => {
      this.spinner.hide();
      if(data.status == 'OK'){
        this.toastr.successToastr('Record updated successfully.', 'Success',
            { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        );
      }
      setTimeout(()=>{
        this.disbaleButton = true;
      },4500)
    }, error => {
      this.disbaleButton = true;
      console.log(error);
      this.spinner.hide();
      this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
    })
  }

  openVideoModal(video): void {
    const dialogRef = this.dialog.open(videoUserComponent, {data: {'video': video}
  });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  chooseInterestIcon(index): void {
    const dialogRef = this.dialog.open(IconComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(index >= 0){
          console.log('result');
          this.userInterest[index].interest_logo = result;
          console.log(this.userInterest);
        }else{
          this.hobbies = result.logo_link;
          this.interest_text = result.interest_text;
          this.interest_id = result.id;
          this.interestForm.get('interest_name').setValue(result.interest_name);
          this.showAddIntesestForm();
        }
      }
      console.log('The dialog was closed');
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
      'interest_text':this.interestForm.value.interest_text,
      'user_id':this.userId,
      'interest_id': this.interest_id
    }

    this.spinner.show();
    this.userService.add_New_interest(formData).subscribe((data: any) => {
      this.userInterest.unshift({'interest_name':this.interestForm.value.interest_name, 'text':this.interestForm.value.interest_text, 'user_id':this.userId, 'logo_link': this.hobbies, 'interest_text' : this.interest_text, 'interest_id':data.interest_id})

      console.log(this.userInterest.length);
      console.log(this.completed);

      if(this.userInterest.length == 4 && this.completed != "complete"){
        this.update_profile_status(4);
      }

      this.showDiv = false;
      this.interestForm.reset();
      this.submitted = false;
      this.spinner.hide();
      this.toastr.successToastr('Interest added successfully.', 'Success',
            { enableHTML: true , toastTimeout :3000, position: 'top-center', animate :'slideFromTop', showCloseButton: true}
        );
    }, error => {
      console.log(error);
      this.spinner.hide();
      this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
    })
  }



  //Get values of the questions
  filterChanged(selectedValue , data , string){
    console.log(selectedValue)
    console.log(data);

    let obj = data.options.find(obj => obj.option_id == selectedValue);
    if(string == 'selectedOptionId'){
      this.selectedOptionId = obj.option;
    }else if(string == 'hidefluency'){
      this.hidefluency = obj.option;
    }


    if(data.question_id == 5 && data.choosed_option == 'No'){
      this.generalAnswers[2].choosed_option = 'Yes';
      this.sendData[3].answer = this.generalAnswers[3].options[0].option_id;
      this.sendData[4].answer = this.generalAnswers[4].options[0].option_id;
      this.sendData[5].answer = this.generalAnswers[5].options[0].option_id;
      this.sendData[6].answer = this.generalAnswers[6].options[0].option_id;
      this.sendData[7].answer = this.generalAnswers[7].choosed_id;
    }else if(data.question_id == 5 && data.choosed_option == 'Yes'){
      this.generalAnswers[2].choosed_option = 'No';
      this.sendData[3].answer = '0';
      this.sendData[4].answer = '0';
      this.sendData[5].answer = '0';
      this.sendData[6].answer = '0';
      this.sendData[7].answer = this.generalAnswers[7].choosed_id;
    }else if(obj.question_id == 14 && obj.option != 'No second language spoken'){
      this.generalAnswers[11].choosed_option = '';
      this.sendData[12].answer = this.generalAnswers[12].options[0].option_id;

    }else if(obj.question_id == 14 && obj.option == 'No second language spoken'){
      this.generalAnswers[11].choosed_option = 'No second language spoken';
      this.sendData[12].answer= '0';
    }


    var index = this.sendData.map(x => {return x.question_id;}).indexOf(data.question_id);
    if(index != -1){
      this.sendData.splice(index, 1);
    }

    this.sendData.push({ 'question_id': data.question_id , 'answer' :selectedValue , 'question_type':'1'})
    var firstRun = this.sendData.sort(function(a, b) {
      return (a.question_id - b.question_id);
    });

    this.sendData = firstRun
  }


  //Update gerenal questions
  updateGeneralQuestions(){
    var data = { 'user_id': this.userId, 'answer': this.sendData}
    this.spinner.show();
    this.userService.update_Questions(data).subscribe((data: any) => {
      this.spinner.hide();
        this.toastr.successToastr('Record updated successfully.', 'Success',
            { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        );
    }, error => {
      console.log(error);
      this.spinner.hide();
      this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
    })
  }

  //show and hide the interest form
  showAddIntesestForm(){
    if(this.showDiv == false){
      this.showDiv = true;
    }
  }

  randomThingsCheckbox(data){
    var action = data.is_visible == '1' ? '0' : '1';
    var formdata = {
      'question_id':data.question_id,
      'user_id': this.userId,
      'answer': data.answer,
      'is_visible':action
    }

    var index = this.checkVisiable.map(x => {return x.question_id;}).indexOf(data.question_id);
    if(index == -1){
      this.checkVisiable.push(formdata)
    }else{
      this.checkVisiable.splice(index, 1);
    }
  }

  //Update random things
  updateRandomThings(item, index){
    console.log(index);
    this.disbaleButton = false;
    let postData = {
      'answer':item.value.answer,
      'question_id': item.value.question_id,
      'user_id': this.userId,
      'is_visible' :'1',
      'action' :'insert'
    }
    this.spinner.show();
    this.userService.update_about_me_data(postData).subscribe((data: any) => {
      this.spinner.hide();
      if(data.status == 'OK'){
        var indexId = this.checkVisiable.map(x => {return x.question_id;}).indexOf(postData.question_id);
        if(indexId == -1){
          this.checkVisiable.push(postData);
        }

        this.toastr.successToastr('Record updated successfully.', 'Success',
          { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        );

        console.log(this.aboutMeCompleted)
        console.log(this.checkVisiable.length)
        this.showSaveButton = false;
        if(this.aboutMeCompleted == '' && this.checkVisiable.length == 4){
          this.update_profile_status(5);
        }
      }
      setTimeout(()=>{
        this.disbaleButton = true;
      },4500)

      let frmArray = this.formGroup.get('bookingForm') as FormArray;
      frmArray.clear();

      setTimeout(()=>{
        this.fetchAboutMeData();
       },300)
    }, error => {
      console.log(error);
      this.spinner.hide();
      this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
    })
  }


  uploadGalleryImage(fileInput: any) {
      this.fileData = <File>fileInput.target.files[0];
      var reader = new FileReader();
      if (fileInput.target.files && fileInput.target.files.length > 0) {
        let file = fileInput.target.files[0];

        var mimeType = this.fileData.type;
        if(mimeType.split('/')[1] == 'gif' || mimeType.split('/')[1] == 'svg+xml'){
          this.toastr.errorToastr("Allowed Image extensions: jpeg, jpg, png.", 'Oops!',   {
            position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
          });
          return;
        }

        if (mimeType.match(/image\/*/) == null) {
          this.toastr.errorToastr("Allowed Image extensions: jpeg, jpg, png.", 'Oops!',   {
            position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
          });
          return;
        }

        let img = new Image();
        img.src = window.URL.createObjectURL( file );
        reader.readAsDataURL(file);
        reader.onload = () => {
          setTimeout(() => {
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            window.URL.revokeObjectURL( img.src );
            if ( width < 240 && height < 240 ) {
              this.toastr.errorToastr("Image dimension should be greater than or equal to 240X240.", 'Oops!',   {
                position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
              });
              this.myInputVariable.nativeElement.value = "";
              //form.reset();
            } else {
              const dialogRef = this.dialog.open(CropbannerComponent, {
                data: {image: fileInput, string:'gallery', width : width, height : height}
              });
              dialogRef.afterClosed().subscribe(result => {
                this.myInputVariable.nativeElement.value = "";
                if(result){

                  const formData = new FormData();
                  formData.append('image', result);
                  formData.append('type', 'gallary_img');
                  formData.append('user_id', this.userId);

                  this.spinner.show();
                  this.userService.change_gallery(formData).subscribe((data: any) => {
                    // this.myInputVariable.nativeElement.value = "";
                    // this.totalCount += 1;
                    this.previewUrl.unshift({'path':data.url,'id': data.id, 'is_valid': '0'});
                    this.showPopup('Image')

                    const album = {
                      src: data.url
                   };
                    this._albums.unshift(album);
                    // if(this.gallaryComplete != "complete" && this.showProfileImage && this.previewUrl.length == 3){
                    //   this.update_profile_status(2);
                    // }

                    this.spinner.hide();
                    // this.toastr.successToastr('Image added successfully.', 'Success',
                    //     { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
                    // );
                  }, error => {
                    console.log(error);
                    this.spinner.hide();
                    this.toastr.errorToastr(error.error, 'Oops!',   {
                      position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
                    });
                  })
                }
              })
            }
          }, 1500);
        };
      }
  }

  showPopup(text){

    const dialogRef = this.dialog.open(showMessageComponent, {
      data: {condition: text}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }


  preview(string) {
    // Show preview
      var mimeType = this.videofileData.type;
      if (mimeType.match(/video\/*/) == null) {
        this.toastr.errorToastr("Only videos are allowed.", 'Oops!',   {
          position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
        });
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(this.videofileData);
      reader.onload = (_event) => {
        const formData = new FormData();
        formData.append('file', this.videofileData);
        if(string == 'video'){
          formData.append('type', 'gallary_video');
        }else{
          formData.append('type', 'story');
        }
        formData.append('user_id', this.userId);

        this.spinner.show();
        this.userService.change_video(formData).subscribe((data: any) => {
          this.spinner.hide();
          // this.totalCount += 1;
          this.myInputVideo.nativeElement.value = "";
          this.showPopup('Video');
          if(string == 'video'){
            this.showVideo = [];
            // this.update_profile_status(3);
            this.showVideo.unshift({'path':reader.result, 'id': data.id, 'is_valid': '0'});
            // this.toastr.successToastr('Video added successfully.', 'Success',
            //   { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
            // );
          }else{
            this.showStory = [];
            this.showStory.unshift({'path':reader.result, 'id': data.id , 'is_valid': '0'});
            // this.toastr.successToastr('Story added successfully.', 'Success',
            //   { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
            // );
          }
        }, error => {
          console.log(error);
          this.spinner.hide();
          this.toastr.errorToastr(error.error, 'Oops!',   {
            position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
          });
        })
      }
  }

  update_profile_status(id){
    this.spinner.show();
    this.userService.complete_profile({'profile_completeness_id':id , 'user_id':this.userId}).subscribe((data: any) => {
      this.spinner.hide();
      if(data.status == 'OK'){
        this.headerService.updateProfilePercantage(true);
        this.profileCompletness();
        // this.toastr.successToastr('profile updated successfully.', 'Success!');
      }
    }, error => {
      console.log(error);
      this.spinner.hide();
      this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
    })
  }

  changeStatus(item){
    this.spinner.show();
    this.userService.update_status({'status':item , 'user_id':this.userId}).subscribe((data: any) => {
      this.spinner.hide();
      console.log(data);
      if(data.status == 'OK'){
        this.toastr.successToastr('Status updated successfully.', 'Success',
              { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
          );
       // this.currentUser.profile_status = item;
        //localStorage.setItem("loginUser", JSON.stringify(this.currentUser));
      }
    }, error => {
      console.log(error);
      this.spinner.hide();
      this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
    })
  }

  deletePofileImage(string){
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {name: 'deleteImage', string :string}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.spinner.show();
        this.userService.remove_user_profile_image({'user_id':this.userId}).subscribe((data: any) => {
          this.spinner.hide();
          if(data.status == 'OK'){
              this.showProfileImage = '';
              this.headerService.changeProfileImage('');
              this.profileCompletness();
              this.headerService.updateProfilePercantage(true);
              this.toastr.successToastr('Profile Image deleted successfully.', 'Success',
                { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
              );
          }
        }, error => {
          console.log(error);
          this.spinner.hide();
          this.toastr.errorToastr(error.error, 'Oops!',   {
            position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
          });
        })
      }
    })
  }


  deleteImage(index, item, string){
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {name: 'deleteImage', string :string}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'delete'){
        this.spinner.show();
        this.userService.delete_image_video({'id':item.id , 'user_id':this.userId, 'type':string}).subscribe((data: any) => {
          this.spinner.hide();
          if(data.status == 'OK'){
            // this.totalCount -= 1;
            if(string == 'image'){
              //this.showImagesUrl.splice(index, 1);
              this.previewUrl.splice(index , 1);
              this._albums.splice(index , 1);
              console.log(this.previewUrl.length);
              if(this.previewUrl.length == 2){
                this.gallaryComplete = '';
                this.profileCompletness();
                this.headerService.updateProfilePercantage(true);
              }
              this.toastr.successToastr('Image deleted successfully.', 'Success',
                { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
              );
            }else{
              if(string == 'video'){
                this.showVideo.splice(index , 1);
                this.profileCompletness();
                this.headerService.updateProfilePercantage(true);
                this.toastr.successToastr('Video deleted successfully.', 'Success',
                  { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
                );
              }else{
                this.showStory.splice(index , 1);
                this.toastr.successToastr('Story deleted successfully.', 'Success',
                  { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
                );
              }
            }
          }
        }, error => {
          console.log(error);
          this.spinner.hide();
          this.toastr.errorToastr(error.error, 'Oops!',   {
            position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
          });
        })
      }
    });
  }

  changeProfileImage(fileInput: any){
    this.choosefileData = <File>fileInput.target.files[0];
    var  reader = new FileReader();
    if (fileInput.target.files && fileInput.target.files.length > 0) {
      let file = fileInput.target.files[0];

      var mimeType = this.choosefileData.type;

      if(mimeType.split('/')[1] == 'gif' || mimeType.split('/')[1] == 'svg+xml'){
        this.toastr.errorToastr("Allowed Image extensions: jpeg, jpg, png ", 'Oops!',   {
          position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
        });
        return;
      }

      if (mimeType.match(/image\/*/) == null) {
        this.toastr.errorToastr("Allowed Image extensions: jpeg, jpg, png.", 'Oops!',   {
          position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
        });
        return;
      }

      let img = new Image();
      img.src = window.URL.createObjectURL( file );
      reader.readAsDataURL(file);
      reader.onload = () => {
        setTimeout(() => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;
          window.URL.revokeObjectURL( img.src );
          if ( width < 220 && height < 220 ) {
            this.toastr.errorToastr("Image dimension should be greater than or equal to 225X225.", 'Oops!',   {
              position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
            });
          } else {
            const dialogRef = this.dialog.open(CropbannerComponent, {
              data: {image: fileInput, string:'profile', 'width' : width , 'height': height}
            });
            dialogRef.afterClosed().subscribe(result => {

              if(result){
                const formData = new FormData();
                formData.append('image', result);
                formData.append('type', 'profile_img');
                formData.append('user_id', this.userId);
                this.spinner.show();
                this.userService.change_gallery(formData).subscribe((data: any) => {
                  console.log(data);
                  this.showPopup('Image')
                 //let objectURL = URL.createObjectURL(result);
                //  this.showProfileImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                //   this.headerService.changeProfileImage(this.showProfileImage);
                  // if(this.showProfileImage && this.previewUrl.length == 3){
                  //   this.update_profile_status(2);
                  // }
                  this.spinner.hide();
                  // this.toastr.successToastr('Profile photo updated successfully.', 'Success',
                  //   { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
                  // );
                }, error => {
                  console.log(error);
                  this.spinner.hide();
                  this.toastr.errorToastr(error.error, 'Oops!',   {
                    position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
                  });
                })
              }
            })
          }
        }, 1500);
      };
    }
  }


//Upload greeting and story
  uploadGreetingAndStory(fileInput: any, text: any){
    // if(text == 'story' && (this.currentUser.plan_type == 1 || this.currentUser.plan_type == '')){
    //   const dialogRef = this.dialog.open(PlanValidationPopup, {
    //     data: {name: 'story'}
    //   });

    //   dialogRef.afterClosed().subscribe(result => {
    //     console.log(result);
    //   })

    //   return
    // }
    this.videofileData = <File>fileInput.target.files[0];
    this.preview(text);
  }

  //open cover images
  openCoverModal(){
    const dialogRef = this.dialog.open(coverBannerComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.showCoverImage = {
          path : result
        }
      }
      console.log('The dialog was closed');
    });
  }

  //Open onboarding retake modal
  openRetakeModal(){
    const dialogRef = this.dialog.open(RetakeModalComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  goToProfile(string){
    // localStorage.removeItem("afterReloadSelectedTabs");
    localStorage.setItem("afterReloadSelectedTabs", string);
    this.router.navigate(['home/dashboard/userprofile', {'string': string }])
  }

  removeInterestFrom(){
    this.showDiv = false;
  }

  open(index: number): void {

    const dialogRef = this.dialog.open(OpenImageComponent, {data : {'images' :this._albums, 'index' : index}});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  
  }

  showMoreQuestion(){
    this.showMore = this.showMore == false ? true : false;
  }

  //Upload user ID/Proof
  uploadIdProof(){

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
      this.toastr.errorToastr('Please enter a valid link', 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
      return false;
    }

    //Append form data
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('type_id', this.selectedProofId);
    formData.append('user_id', this.userId);
    formData.append('social_media_link', this.facebook);

    this.spinner.show();
    this.userService.id_proof_upload(formData).subscribe((data: any) => {
      this.toastr.successToastr('Proof updated successfully.', 'Success',
      { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
    );
      this.spinner.hide();
    }, error => {
      console.log(error);
      this.spinner.hide();
      this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
    })
  }

  selectProofOption(event){
    this.selectedProofId = event;
  }

  // Choose proof image
  handleFileInput(files){
    if (files.target.files && files.target.files[0]) {
      var reader = new FileReader();
      this.imagePath = files.target.files[0]
      reader.readAsDataURL(files.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
          var imageType = files.target.files[0]
          var mimeType = imageType.type;

         if(mimeType.split('/')[1] == 'gif' || mimeType.split('/')[1] == 'svg+xml'){
           this.toastr.errorToastr("Allowed Image extensions: jpeg, jpg, png ", 'Oops!',   {
             position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
           });
           return;
         }

         if (mimeType.match(/image\/*/) == null) {
           this.toastr.errorToastr("Allowed Image extensions: jpeg, jpg, png.", 'Oops!',   {
             position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
           });
           return;
         }

        this.fileToUpload = files.target.files[0];
        this.selectedImage = reader.result; //add source to image
      }
    }
  }

  changeTabs(string){
    console.log(string);
    var elems = document.querySelectorAll(".active");
    if(elems && string != 'retake'){
      elems[0].classList.remove('active')
    }

    if(string == 'gallary'){
      var gallay = document.querySelectorAll(".active.in");
      if(gallay[0]){
        gallay[0].classList.remove("active" , "in")
      }

      var element = document.getElementById("photoId");
      element.classList.add("active")

      var photo = document.getElementById("photo");
      photo.classList.add("active", "in")

    }else if(string == 'interest'){
      var interest = document.querySelectorAll(".active.in");
      if(interest[0]){
        interest[0].classList.remove("active" , "in")
      }

      var element = document.getElementById("interest-id");
      element.classList.add("active")

      var interests = document.getElementById("interests");
      interests.classList.add("active", "in")

    }else if(string == 'about'){
      var about = document.querySelectorAll(".active.in");
      if(about[1]){
        about[1].classList.remove("active" , "in")
      }

      if(about[0]){
        about[0].classList.remove("active" , "in")
      }

      var element = document.getElementById("profile-Id");
      if(element){
      element.classList.add("active")
      }

      var interests = document.getElementById("home");
      if(element){
        interests.classList.add("active", "in")
      }
      let el = document.getElementById('random-things');
      el.scrollIntoView({behavior:"smooth"});

    }else if(string == 'profile'){
      var profile = document.querySelectorAll(".active.in");
      if(profile[0]){
        profile[0].classList.remove("active" , "in")
      }

      var element = document.getElementById("profile-Id");
      if(element){
      element.classList.add("active")
      }

      var interests = document.getElementById("home");
      if(element){
        interests.classList.add("active", "in")
      }

    }else if(string == 'beliefs'){
      var beliefs = document.querySelectorAll(".active.in");
      if(beliefs[0]){
        beliefs[0].classList.remove("active" , "in")
      }

      var element = document.getElementById("beliefs-Id");
      if(element){
        element.classList.add("active")
      }

      var interests = document.getElementById("valuesbeliefs");
      if(element){
        interests.classList.add("active", "in")
      }
    }else if(string == 'uploadproof'){

      var uploadproof = document.querySelectorAll(".active.in");
      if(uploadproof[0]){
        uploadproof[0].classList.remove("active" , "in")
      }


      var element = document.getElementById("upload-proof");
      if(element){
        element.classList.add("active")
      }

      var interests = document.getElementById("uploadproof");
      if(element){
        interests.classList.add("active", "in")
      }
    }else if(string == 'retake'){
      this.openRetakeModal();
    }
    this.router.navigate(['home/dashboard/editprofile', {}]);
  }

  //Remove single interest
  removeInterest(item , index, string){
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {name: 'deleteImage', string :string}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'delete'){
        this.spinner.show();
        this.userService.delete_user_interest({'id':item.interest_id, 'user_id':this.userId}).subscribe((data: any) => {
          this.spinner.hide();
          if(data.status == 'OK'){
            this.userInterest.splice(index , 1)
            if(this.userInterest.length == 3){
              this.completed = '';
              this.profileCompletness();
              this.headerService.updateProfilePercantage(true);
            }

            this.toastr.successToastr('Interest deleted successfully.', 'Success',
            { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
          );
          }
        }, error => {
          console.log(error);
          this.spinner.hide();
          this.toastr.errorToastr(error.error, 'Oops!',   {
            position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
          });
        })
      }
    });
  }

  activeTabs(string){
    localStorage.setItem("afterReloadSelectedTabs", string);
  }

  goToNext(){
    this.showSaveButton = false;
    this.myStepper.next();
  }

  goToPrev(){
    this.showSaveButton = false;
    this.myStepper.previous();
  }

  onChangeText(event){
    this.showSaveButton = event.target.value ? true : false;
  }

  deleteAboutMe(item, index){
    console.log(item);
    if(item){
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        data: {name: 'deleteImage', string :'random thing'}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if(result == 'delete'){
          this.spinner.show();
          this.userService.delete_about_me_question({'question_id':item.question_id, 'user_id':this.userId}).subscribe((data: any) => {
            this.spinner.hide();
            this.showSaveButton = false;
            if(data.status == 'OK'){
              // this.bookingForm.at(index).patchValue({answer: ''});
              // this.bookingForm.at(index).patchValue({is_visible: ''});
              this.exsitingAnswer.splice(index , 1);
              var indexId = this.checkVisiable.map(x => {return x.question_id;}).indexOf(item.question_id);
              this.checkVisiable.splice(indexId , 1)

               if(this.checkVisiable.length == 3){
                 this.completed = '';
                 this.profileCompletness();
                 this.headerService.updateProfilePercantage(true);
               }

               let frmArray = this.formGroup.get('bookingForm') as FormArray;
               frmArray.clear();

               setTimeout(()=>{
                 this.fetchAboutMeData();
               },300)
              this.toastr.successToastr('Random thing deleted successfully.', 'Success',
              { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
            );
            }
          }, error => {
            console.log(error);
            this.spinner.hide();
            this.toastr.errorToastr(error.error, 'Oops!',   {
              position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
            });
          })
        }
      });
    }
  }

  updateAnswer(){
    console.log(this.exsitingAnswer);

    var postData = {
      'data' : this.exsitingAnswer,
      'user_id' : this.userId,
      'action': 'update'
    }
    console.log(postData);

    this.spinner.show();
    this.userService.update_about_me_data(postData).subscribe((data: any) => {
      this.spinner.hide();
      console.log(data);
      if(data.status == 'OK'){
        this.toastr.successToastr('Record updated successfully.', 'Success',
          { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        );
      }
    }, error => {
      console.log(error);
      this.spinner.hide();
      this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
    })
  }

  openValidationPopup(text){
      const dialogRef = this.dialog.open(PlanValidationPopup, {
        data: {name: text}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
      })
    }
}
