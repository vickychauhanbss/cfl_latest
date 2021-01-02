import { Component, OnInit, Inject } from '@angular/core';
import {Location} from '@angular/common';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { Options } from 'ng5-slider';
import { userService } from '../../../shared/services/user/user.service';
import { HeaderService } from '../../../shared/services/header/header.service';
//Import Api loader
import { NgxSpinnerService } from "ngx-spinner";
//Import notification toast
import { ToastrManager } from 'ng6-toastr-notifications';
import { MessageService } from '../../../eventservice';
//Video model
import { MatDialog } from '@angular/material/dialog';
import { videoUserComponent } from '../video-model-user/video-model.component';
import { UserlistComponent } from '../liked-user-list/liked-user-list.component';
import { Router, ActivatedRoute } from "@angular/router";
import { dashboardService } from '../../../shared/services/dashboard/dashboard.service';
import { footerService } from '../../../shared/services/footer/footer.service';
import { WelcomeComponent } from '../welcome/welcome.component';
import { ChooseGallaryComponent } from '../choose-gallary-chat/choose-gallary.component';
import { Message } from './../../../interfaces/message';
import { SocketService } from '../../../shared/services/socket/socket.service';
import { PlanValidationPopup } from '../plan-validation-popup/plan-validation-popup.component';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { DataShareService } from '../../../shared/services/utils/data-share.service';
import { MessagesResponse } from './../../../interfaces/messages-response';
import { ChatService } from '../../../shared/services/chat/chat.service';
import { FoundTheOneComponent } from '../fount-the-one/fount-the-one.component';
import { TrustScoreComponent } from '../trust-score-popup/trust-score-popup.component';
import { OpenImageComponent } from '../open-image/open-image.component';
declare var require: any


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class UserprofileComponent implements OnInit {
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [
    [80, 120]
  ];
  public doughnutChartType: ChartType = 'doughnut';
  userProfileData: any;
  userId         : any;
  showCoverImage : any;
  totalCount     : any;
  check_Id       : any;
  showInterest   : any;
  otherUser      : any;
  trueClient     : any;
  likedData      : any;
  connectionArray: any;
  leisureArray   : any;
  growthArray    : any;
  prosperityArray: any;
  showProfileImage = '';
  spiritualityArray : any;
  user_profile_user_id : any;
  showHideInterest : any;
  userGender: any;
  compareConnectionArray : any;
  compareLeisureArray: any;
  compareGrowthArray: any;
  compareProsperityArray: any;
  compareSpiritualityArray: any;
  foundTheOne: any

  currentUser    : any;
  aboutMeData    : any = [];
  userInterest   : any = [];
  previewUrl     : any = [];
  showVideo      : any = [];
  _albums        : any = [];
  generalAnswers : any = [];
  catScore       : any = [];
  loggedUserScore: any = [];
  showStory      : any = [];
  messageArray   : any = []
  show_no_data   = false
  isLinear       = true;
  showMore       = false;
  learnMore      = false;
  trustScore     : any;
  checked        = false;
  profileStatusLike : any;
  userStatus: any;
  profile_completeness: any;
  coverBanner: any;
  userData: any;
  found_the_one: any;
  gaugeType = "full";
  gaugeValue = 0;
  private subscription;
	defaultImage = require('../../../../assets/chat/image-loader.gif');


  interestOptions = [
    {id: '1', name: 'Maybe', image: 'assets/dashboard/maybe1.png'},
    {id: '2', name: 'Probably', image: 'assets/dashboard/probably1.png'},
    {id: '3', name: 'Absolutely', image: 'assets/dashboard/absolutely.png'},
    {id: '4', name: 'Not today', image: 'assets/dashboard/not_today.png'}
  ];
  thresholdConfig = {
    '0': {color: '#9d3aba'},
    '40': {color: '#9d3aba'},
    '75.5': {color: '#9d3aba'}
  };
  gaugeLabel = "Trust Score";
  // gaugeAppendText = "km/hr";
  options: Options = {
    floor: 1,
    ceil: 5,
    showTicks: true,
    showSelectionBar: true,
    disabled: true
  };
  constructor(
    private userService: userService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrManager,
    private messageService: MessageService,
    public dialog: MatDialog,
    private router :Router,
    private route: ActivatedRoute,
    public headerService: HeaderService,
    private dashboardService: dashboardService,
    private footerService: footerService,
    private socketService: SocketService,
    private dataShareService: DataShareService,
    private chatService: ChatService,
    private _location: Location



  ) {
    let currentUesr =  localStorage.getItem("loginUser");
    this.userData = JSON.parse(currentUesr)
    this.userData.plan_type = this.userData.plan_type == '' ?  1 : this.userData.plan_type;
    console.log(this.userData);
    if(this.userData){
      this.check_Id = this.userData.id
      this.showHideInterest = false;
      this.otherUser = false;
      this.currentUser = this.userData;
    }

    // if(currentUesr == null){
    //   this.router.navigate(['home'])
    //   this.messageService.login('homePage');
    // }else{
    //   let userData = JSON.parse(currentUesr)
    //   this.userId = userData.id
    // }

    if(this.route.snapshot.paramMap.get('id')){
      this.otherUser = true;
      this.userId = this.route.snapshot.paramMap.get('id');
    }else{
      let userData = JSON.parse(currentUesr)
      if(userData){
        this.userId = userData.id
      }
    }

    this.subscription = this.headerService.userData.subscribe((bit)=>{
      let userData = JSON.parse(currentUesr)
      this.userId = userData.id;
      this.otherUser = false;
      this.ngOnInit();
    })
    this.fetchUserBanner();

    this.showCoverImage = {
      path : ''
    }
  }

  onClick(event) {
   if(event.target.classList.value !== 'fa fa-star'){
     this.showHideInterest = false;
   }
  }



  OnloadPopup(video){
    const dialogRef = this.dialog.open(WelcomeComponent, {data: {'check': 'userprofile', video:video.video_path}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    // let currentUesr =  localStorage.getItem("loginUser");
    // let userData = JSON.parse(currentUesr);
    // console.log(userData)
    if(this.userData != null){
    // this.userId = userData.id
      this.aboutMeData = [];
      this._albums = [];
      this.messageService.login('showHeaderSubscription');
      this.footerService.hidefooter(true);
      this.spinner.show();

      /* Aditya code */
      this.userService.get_user_profile_review_log({'interst_user_id' :this.userId, 'user_id': this.check_Id,'event':'full_profile_view'}).subscribe((data: any) => {
        console.log('get_user_profile_review_log');
      }, error => {
        console.log(error);
        this.spinner.hide();
      })
      /* end aditya code */

      this.userService.get_user_profile_data({'user_id' :this.userId, 'loggedin_user': this.check_Id}).subscribe((data: any) => {
        this.spinner.hide();
        if(localStorage.getItem("afterReloadSelectedTabs") != null){
          this.change_tabs(localStorage.getItem("afterReloadSelectedTabs"))
        }
          if(data.status == 'OK'){
            this.userProfileData = data.records;
            console.log(this.userProfileData);
            this.showProfileImage = this.userProfileData.profile_img;
            console.log(this.showProfileImage);
            if(this.userProfileData.banner_img){
              this.showCoverImage = this.userProfileData.banner_img;
            }else{
              this.showCoverImage = {
                path : 'assets/profile/banner.png'
              }
            }

            this.previewUrl = this.userProfileData.gallaryData.images;
            this.showStory = this.userProfileData.gallaryData.story;
            var notify_me =  this.userProfileData.notify_me;
            this.checked = notify_me == '0' ? false : true;
            this.profileStatusLike = this.userProfileData.profileStatusLike;
            this.found_the_one = this.userProfileData.found_the_one;

            if(this.userProfileData.all_status){
              this.userStatus = this.userProfileData.all_status.find(x => x.id === this.userProfileData.profileStatus);
              console.log(this.userStatus)
            }

            for (let i = 0; i < this.previewUrl.length; i++) {
              const src = this.previewUrl[i].path
              // const caption = '❤ ' + this.previewUrl[i].liked;
              // const thumb = this.previewUrl[i].path
              const album = {
                src: src,
                // caption: caption,
                // thumb: thumb
              };

            this._albums.push(album);
            }

            console.log(this.userProfileData);

            this.profile_completeness = this.userProfileData.profile_completeness
            this.showVideo = this.userProfileData.gallaryData.videos;
            this.totalCount = this.userProfileData.gallaryImageCount + this.userProfileData.gallaryVideoCount;
            this.user_profile_user_id = this.userProfileData.userData.id;
            this.userGender = this.userProfileData.userData.gender;

            this.trueClient = this.userProfileData.interest;
            this.likedData = this.userProfileData.likes;
            this.generalAnswers = this.userProfileData.generalAnswers;
            if(!this.route.snapshot.paramMap.get('id')){
              console.log('---------------');
              this.userData.plan_type = this.userProfileData.userData.plan_type;
              this.headerService.updateUserPlan(this.userData.plan_type);
              localStorage.setItem("loginUser", JSON.stringify(this.userData));
            }



            if(this.userId == this.check_Id){
              this.catScore = this.userProfileData.loggedUserScore;
            }else{
              this.catScore = this.userProfileData.catScore;
              this.loggedUserScore = this.userProfileData.loggedUserScore;
              console.log(this.catScore)
              console.log(this.loggedUserScore)

            }

            this.catScore.forEach(item => {
              console.log(item);
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

            if(this.loggedUserScore.length > 0){
                this.loggedUserScore.forEach(item => {

              console.log(item);

                  if(item.name == "CONNECTION"){
                    this.compareConnectionArray = item;

                  }else if(item.name == "LEISURE"){
                    this.compareLeisureArray = item;

                  }else if(item.name == "GROWTH"){
                    this.compareGrowthArray = item;

                  }else if(item.name == "PROSPERITY"){
                    this.compareProsperityArray = item;

                  }else if(item.name == "SPIRITUALITY"){
                    this.compareSpiritualityArray = item;

                  }
              })
            }
            this.get_about_me_data();
            this.get_user_trust_score();
          }
        }, error => {
          console.log(error);
          this.spinner.hide();
          this.toastr.errorToastr(error.error, 'Oops!',   {
            position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
          });
        })
      }else{
        this.messageService.login('showHeaderFooter');
        this.router.navigate(['home']);
      }


      this.getMessages(this.check_Id);
  }



   // Get user conversation
	getMessages(toUserId: string) {
		this.chatService.getMessages({ userId: this.userId, toUserId: toUserId }).subscribe((response: MessagesResponse) => {
			this.spinner.hide();
      console.log(response.messages)
      this.messageArray = response.messages

		});
	}

  get_about_me_data() {
   // this.spinner.show();
    this.userService.get_admin_added_aboutme({'user_id':this.userId, 'loggedin_user':this.check_Id}).subscribe((data: any) => {
      console.log(data);
      this.spinner.hide();
      this.get_admin_added_interest();
      if(data.status == 'OK'){
          console.log(data.records.user_data);
       if(data.records.user_data != undefined){
        this.aboutMeData = data.records.user_data;

       }else{
        this.aboutMeData = [];
       }
        // data.records.user_data.forEach(obj => {
        //   if(obj.is_visible == '1'){
        //      this.aboutMeData.push(obj);
        //   }
        //  })
      }
    }, error => {
      console.log(error);
      this.spinner.hide();
      this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
    })
  }


  get_admin_added_interest() {
    this.userService.get_admin_added_interest({'user_id':this.userId, 'loggedin_user':this.check_Id}).subscribe((data: any) => {
     this.show_no_data = true;
      if(data.records){
        this.userInterest = data.records;
      }else {
        this.userInterest = [];
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
      console.log(data);
      this.spinner.hide();
      if(data.status == 'OK'){
         this.coverBanner = data.video[0];
         this.foundTheOne = data.found_the_one[0]
      }

      if(this.userData.profile_visit == '1'){
        this.OnloadPopup(this.coverBanner)
      }
    }, error => {
      console.log(error);
      this.spinner.hide();
      //this.toastr.errorToastr(error.error, 'Oops!');
    })
  }

  get_user_trust_score(){
    this.userService.get_user_trust_score({'user_id':this.userId}).subscribe((data: any) => {
      console.log('-------------',data);
      if(data.status == 'OK'){
        this.gaugeValue = data.score;
      }
     }, error => {
       console.log(error);
      //  this.toastr.errorToastr(error.error, 'Oops!',   {
      //    position: 'top-full-width',toastTimeout :8000, animate :'slideFromTop',showCloseButton: true
      //  });
     })
  }

  show(){
    this.learnMore = true;
      /* Aditya code */
      this.userService.get_user_profile_review_log({'interst_user_id' :this.userId, 'user_id': this.check_Id,'event':'readmore'}).subscribe((data: any) => {
        console.log('get_user_profile_review_log');
      }, error => {
        console.log(error);
        this.spinner.hide();
      })
  }

  hide(){
    this.learnMore = false;
  }

  changeClassGallery(){
    var elems = document.querySelectorAll(".active");
    elems[0].classList.remove('active')

    var element = document.getElementById("gallary-user-Id");
    element.classList.add("active")
  }

  changeClass(string){
    var elems = document.querySelectorAll(".active");
      elems[2].classList.remove('active')

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


  videoModal(video): void {
    const dialogRef = this.dialog.open(videoUserComponent, {data: {'video': video}
  });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  userListModal(data): void {
    const dialogRef = this.dialog.open(UserlistComponent, {data:data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.userId = result.id;
        this.ngOnInit();
      }
    });
  }

  goToAccountPage(string){
    localStorage.removeItem("afterReloadSelectedTabs");
    this.router.navigate(['home/dashboard/editprofile', {'string': string }])
  }

  openInterestOptions(){
    this.showHideInterest = this.showHideInterest == false ? true : false
  }


  update_Interest(event, el){
    event.preventDefault();
    if (this.trueClient && this.trueClient === el.value) {
      el.checked = false;
      this.trueClient = '';
    } else {
      this.trueClient = el.value
      el.checked = true;
    }

    this.spinner.show();
    this.dashboardService.update_interest({ 'interest':this.trueClient, 'interest_user_id':this.userId, 'user_id' :this.check_Id}).subscribe((data: any) => {
      // this.trueClient = this.trueClient;
      this.showHideInterest = false;
      this.spinner.hide();
      // this.toastr.successToastr('Record updated successfully.', 'Success',
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


  like_unlike_user(status, type, id){
    // this.spinner.show();
    this.userService.save_user_likes({'like_type': type, 'status': status , 'liked_user_id':this.userId, 'user_id' :this.check_Id, 'liked_item_id': id}).subscribe((data: any) => {
      this.spinner.hide();
      if(type == 'profile_like'){
        // if(status == 1){
        //   this.toastr.successToastr('Image liked Successfully.', 'Success',
        //     { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        // );
        // }else if(status == 0){
        //   this.toastr.successToastr('Image disliked Successfully.', 'Success',
        //     { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        //   );
        // }
        this.likedData = {'profile_like'  : status}
      }else if(type == "banner_img"){
        // if(status == 1){
        //   this.toastr.successToastr('Banner liked Successfully.', 'Success',
        //     { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        // );
        // }else if(status == 0){
        //   this.toastr.successToastr('Banner disliked Successfully.', 'Success',
        //     { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        //   );
        // }
        this.showCoverImage['liked']  = status;
      }else if(type == "gallary_img"){
        // if(status == 1){
        //   this.toastr.successToastr('Image liked Successfully.', 'Success',
        //     { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        // );
        // }else if(status == 0){
        //   this.toastr.successToastr('Image disliked Successfully.', 'Success',
        //     { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        //   );
        // }
        var index = this.previewUrl.map(x => {return x.id}).indexOf(id);
        this.previewUrl[index].liked = status;
      }else if(type == "gallary_video"){

        // if(status == 1){
        //   this.toastr.successToastr('Video liked Successfully.', 'Success',
        //     { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        // );
        // }else if(status == 0){
        //   this.toastr.successToastr('Video disliked Successfully.', 'Success',
        //     { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        //   );
        // }
        var index = this.showVideo.map(x => {return x.id}).indexOf(id);
        this.showVideo[index].liked = status;
      }else if(type == "interest") {
        console.log(status);
        // if(status == 1){
        //   this.toastr.successToastr('Interest liked Successfully.', 'Success',
        //     { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        // );
        // }else if(status == 0){
        //   this.toastr.successToastr('Interest disliked Successfully.', 'Success',
        //     { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        //   );
        // }
        var index = this.userInterest.map(x => {return x.id}).indexOf(id);
        this.userInterest[index].like = status;
      }else if(type == "about") {
        console.log(status);
        // if(status == 1){
        //   this.toastr.successToastr('Random things liked Successfully.', 'Success',
        //     { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        // );
        // }else if(status == 0){
        //   this.toastr.successToastr('Random things disliked Successfully.', 'Success',
        //     { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        //   );
        // }
        var index = this.aboutMeData.map(x => {return x.id}).indexOf(id);
        this.aboutMeData[index].liked = status;
      }else if(type == 'status'){

        // if(status == 1){
        //   this.toastr.successToastr('Status liked Successfully.', 'Success',
        //     { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        // );
        // }else if(status == 0){
        //   this.toastr.successToastr('Status disliked Successfully.', 'Success',
        //     { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        //   );
        // }
        this.profileStatusLike = status;
      }else if(type == 'story'){

        var index = this.showStory.map(x => {return x.id}).indexOf(id);
        this.showStory[index].liked = status;

      }
    }, error => {
      console.log(error);
      this.spinner.hide();
      this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
    })
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

  activeTabs(string){
    localStorage.setItem("afterReloadSelectedTabs", string);
     /* Aditya code */
     this.userService.get_user_profile_review_log({'interst_user_id' :this.userId, 'user_id': this.check_Id,'event':string+'_tab'}).subscribe((data: any) => {
      console.log('get_user_profile_review_log');
    }, error => {
      console.log(error);
      this.spinner.hide();
    })
    /* end aditya code */
  }


  change_tabs(string){

    var elems = document.querySelectorAll(".active");
    if(elems){
      elems[0].classList.remove('active')
    }

    var gallay = document.querySelectorAll(".active.in");
    gallay[0].classList.remove("active" , "in")

    if(string == 'profile'){

      var element = document.getElementById("profile-user-Id");
      element.classList.add("active")


      var profile = document.getElementById("home");
      if(element){
        profile.classList.add("active", "in")
      }

    }else if(string == 'gallary'){

      var element = document.getElementById("gallary-user-Id");
      element.classList.add("active")

       var photo = document.getElementById("photo");
      photo.classList.add("active", "in")


    }else if(string == 'beliefs'){
      // var gallay = document.querySelectorAll(".active.in");
      // if(gallay){
      //   gallay[0].classList.remove("active" , "in")
      // }

      var element = document.getElementById("beliefs-user-Id");
      if(element){
      element.classList.add("active")
      }

      var beliefs = document.getElementById("valuesbeliefs");
      if(element){
        beliefs.classList.add("active", "in")
      }

    }else if(string == 'interest'){

      var element = document.getElementById("interest-user-Id");
      if(element){
        element.classList.add("active")
      }

      var interests = document.getElementById("interests");
      if(interests){
        interests.classList.add("active", "in")
      }
    }
  }

  showOptions(event){

    var notifyStatus = event.checked == true ? '1' : '0';
    this.userService.notify_me_user({'notified_user' :this.userId, 'user_id': this.check_Id, notify : notifyStatus}).subscribe((data: any) => {
      console.log(data)
      if(data.status == 'OK'){
        if(notifyStatus == '1'){
          this.toastr.successToastr('Notify Request Successful! Now whenever '+this.userProfileData.userData.first_name +' '+ this.userProfileData.userData.last_name +' adds anything new to the profile, you will be notified.', 'Success',
          { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        );
        }else{
          this.toastr.successToastr('Notify request cancelled successfully.', 'Success',
          { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        );
        }
      }

    }, error => {
      console.log(error);
      this.spinner.hide();
    })
  }


   //Convert time into 12 hours
   formatAMPM(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
  }

  openVideoGreeting(){
      const dialogRef = this.dialog.open(ChooseGallaryComponent,{data: {condition: 'dashboard'}});
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        if(result){
          var message_time = this.formatAMPM(new Date())
          console.log(message_time);
          this.sendAndUpdateMessages({
            fromUserId: this.check_Id,
            message: (result.path).trim(),
            toUserId: this.userId,
            message_time : message_time,
            type : 'video',
            token: 'Bearer ' + localStorage.getItem('token')
          });
        }
        console.log('The dialog was closed');
      });
  }


  sendAndUpdateMessages(message: Message) {
    this.sendEmailAfterMail()
    this.toastr.successToastr('Video greeting send successfully.', 'Success',
        { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
    );
    console.log(message);
    try {
      this.socketService.sendMessage(message);
			this.headerService.chatListReload(true);
    } catch (error) {
      console.warn(error);
      alert(`Can't send your message`);
    }
  }


  sendEmailAfterMail() {
    var post_data = {
      'from_user' : this.check_Id,
      'to_user'  : this.userId,
      'type'  : 'video'
     }
    this.dashboardService.send_email_after_message(post_data).subscribe((data: any) => {
      console.log(data);
    }, error => {
      console.log(error);
    })
  }

  show_popup(string){
    const dialogRef = this.dialog.open(PlanValidationPopup, {
      data: {name: string}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })

    return
  }

  goToChatPage(){
    console.log(this.userProfileData.userData)
    var message_time = this.formatAMPM(new Date())
    console.log(message_time);
    this.sendFirstMessage({
      fromUserId: this.check_Id,
      message: 'Hey',
      toUserId: this.userId,
      message_time : message_time,
      type : 'simple',
      token: 'Bearer ' + localStorage.getItem('token')
    });
  }

  sendFirstMessage(message: Message) {
    if(this.messageArray.length == 0){
      try {
        this.socketService.sendMessage(message);
        this.headerService.chatListReload(true);
        this.headerService.selectUser(this.userProfileData.userData);
        this.dataShareService.changeSelectedUser(this.userProfileData.userData);
        this.router.navigate(['home/dashboard/user-chat',{chat:'dashboard'}]);
      } catch (error) {
        console.warn(error);
        alert(`Can't send your message`);
      }

    }else{
      this.headerService.selectUser(this.userProfileData.userData);
      this.dataShareService.changeSelectedUser(this.userProfileData.userData);
      this.router.navigate(['home/dashboard/user-chat',{chat:'dashboard'}]);
    }
  }

  foundOne(){
    const dialogRef = this.dialog.open(FoundTheOneComponent, {data : {'user_id' :this.userId, 'condition':'userprofile', 'name' : this.userProfileData.userData.first_name}});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result == true){
        this.found_the_one = 'yes';
      }
    });
  }

  openTrustScorePopup(score){
    console.log(score);
    const dialogRef = this.dialog.open(TrustScoreComponent, {data : {'score' :score}});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  backToDashboard(){
    window.history.back()
    // localStorage.setItem("checkback", 'true');
    // this.router.navigateByUrl('/home/dashboard', {skipLocationChange: true});
    // this._location.go('home/dashboard')
  }
}