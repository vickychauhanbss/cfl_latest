import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

//Import Services
import { HeaderService } from '../../shared/services/header/header.service';
import { loginService } from '../../shared/services/change-login/login.service';
import { MessageService } from '../../eventservice';
import { userService } from '../../shared/services/user/user.service';
import { DataShareService } from '../../shared/services/utils/data-share.service';
import { loginRegisterService } from '../../shared/services/login-register-service/login-register.service';

//import Libraries
import { Router } from "@angular/router";
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from '@angular/material/dialog';

//Import Components
import { PlanValidationPopup } from '../../modules/user/plan-validation-popup/plan-validation-popup.component';
import { loginComponent } from '../../modules/main/home/login-modal/login-modal.component';
import { StartnowModal } from '../../modules/main/home/start-now-modal/start-now.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  animal     : string;
  name       : string;
  userImage  : any;
  userId     : any;
  totalPer   : any;
  currentUser: any;
  message    : any;
  totalCount : any;
  mySubscription: any;
  loggedInHeaderView:any;
  userIdscoket: any;
  private subscriptionLogin;
  private subscriptionRegister;

  toggle: any;
  constructor(
    public dialog: MatDialog,
    public headerService : HeaderService,
    public loginService : loginService,
    public cdRef:ChangeDetectorRef,
    private messageService: MessageService,
    private router: Router,
    private userService: userService,
    public toastr: ToastrManager,
    private spinner: NgxSpinnerService,
    private dataShareService: DataShareService,
    private loginRegisterService: loginRegisterService,
  ) {
      this.totalPer = 0;
      this.headerService.showHeader.subscribe((bit)=>{
        this.loggedInHeaderView = bit;
        this.cdRef.detectChanges();
      })


      this.subscriptionLogin = this.loginService.redirectPage.subscribe((bit)=>{
        this.loginModal();
        // this.cdRef.detectChanges();
      })

      this.subscriptionRegister = this.loginService.redirectRegister.subscribe((bit)=>{
        this.start_now_modal();
        // this.cdRef.detectChanges();
      })


      this.headerService.profileImage.subscribe((bit)=>{
        if(bit){
          this.userImage = bit;
        }else{
          this.userImage = '';
        }
      })

      this.headerService.parcantage.subscribe((bit)=>{
        if(bit == true){
          this.fetchProfileCompletnessData();
        }
      })

      this.headerService.readnotifications.subscribe((bit)=>{
        if(bit == true){
          this.fetchNotificationCount();
        }
      })

      this.headerService.updatePlan.subscribe((bit)=>{
        if(bit){
          this.currentUser.plan_type = bit
        }
      })


      this.loginRegisterService.onLogin.subscribe(user=> {
        this.ngOnInit();
      })
    }

  ngOnInit() {
    this.userIdscoket = this.dataShareService.getUserId();
    let currentUesr =  localStorage.getItem("loginUser");
    let userData = JSON.parse(currentUesr);
    // this.messageService.login('hideHeaderFooter');
    if(userData){
      this.userId = userData.id
      this.currentUser = userData
      this.userImage = userData.profile_img;
        this.userService.check_user_token().subscribe((data: any) => {
          console.log(data)
            this.fetchProfileCompletnessData();
            this.fetchNotificationCount();
        },(error)=>{
          console.log(error)
          // if(error.status == 400){
            this.messageService.login('showHeaderFooter');
            localStorage.removeItem("loginUser");
            localStorage.removeItem("token");
            this.router.navigate(['home']);
          // }
        })
      }
  }

  fetchProfileCompletnessData(){
    if(this.userId){
      this.userService.get_user_profile_completness_data({'user_id':this.userId}).subscribe((data: any) => {
        console.log(data);
        if(data.status == 'OK' && data.records){
          this.totalPer = data.records.current;
        }
      }, error => {
        console.log(error);
      })
    }
  }

  fetchNotificationCount(){
    if(this.userId){
      this.userService.check_user_notification_count({'user_id':this.userId}).subscribe((data: any) => {
        console.log(data);
        this.totalCount = data.total;
        this.toggle = data.more_preference == "1" ? true : false;
      }, error => {
        console.log(error);
      })
    }
  }

  ngAfterViewInit() {
    this.loggedInHeaderView = this.loggedInHeaderView
    console.log(this.loggedInHeaderView);
  }

  scroll(string){
    let el = document.getElementById('collapsibleNavbar')
    el.classList.remove("in");
    if(string == 'about'){
      let el = document.getElementById('about');
      if(el){
        el.scrollIntoView({behavior:"smooth"});
      }else{
        this.router.navigate(['home', {'isOtherPage': string }])
      }
    }else{
      let el = document.getElementById('community');
      if(el){
        el.scrollIntoView({behavior:"smooth"});
      }else{
        this.router.navigate(['home', {'isOtherPage': string }])
      }
    }
  }

  loginModal(): void {
    let el = document.getElementById('collapsibleNavbar')
    el.classList.remove("in");
    const dialogRef = this.dialog.open(loginComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  start_now_modal(): void {
    const dialogRef = this.dialog.open(StartnowModal, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout(){
    localStorage.removeItem('userprofiles')
    localStorage.removeItem('page')
    this.spinner.show();
    this.userService.logout_user({'user_id':JSON.parse(localStorage.getItem("loginUser")).id}).subscribe((data: any) => {
        this.spinner.hide();
      if(data.status == 'OK'){
        this.loginRegisterService.logout();
        this.router.navigate(['home'])
      }
    }, error => {
        this.spinner.hide();
      console.log(error);
    })
  }

  goToAccountPage(){
    localStorage.removeItem('userprofiles')
    localStorage.removeItem('page')
    localStorage.removeItem("afterReloadSelectedTabs");
    this.router.navigate(['home/dashboard/userprofile'])
  }

  goToChatPage(){
    console.log('---------');
    localStorage.removeItem('userprofiles')
    localStorage.removeItem('page')
    localStorage.removeItem("selectId");
    this.router.navigate(['home/dashboard/user-chat', {'header':'header'}])
  }

  goToHelpAndSupportPage(){
    localStorage.removeItem('userprofiles')
    localStorage.removeItem('page')
    localStorage.removeItem("afterReloadSelectedTabs");
    this.router.navigate(['home/help-support'])
  }

  goToAccountSettingPage(){
    localStorage.removeItem('userprofiles')
    localStorage.removeItem('page')
    localStorage.removeItem("afterReloadSelectedTabs");
    this.router.navigate(['home/dashboard/my-account'])
  }

  goToNotificationPage(){
    localStorage.removeItem('userprofiles')
    localStorage.removeItem('page')
    localStorage.removeItem("afterReloadSelectedTabs");
    var elems = document.querySelector(".active");
      if(elems !==null){
       elems.classList.remove("active");
      }
    this.router.navigate(['home/dashboard/notification'])
  }

  reloadPage(){
    localStorage.removeItem('blog')
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/']);
    return false
  }


  goToDashboard(){
    localStorage.removeItem('userprofiles')
    localStorage.removeItem('page')
    localStorage.removeItem("afterReloadSelectedTabs");
    var elems = document.querySelector(".active");
    var el = document.querySelector(".blur-user");

    if(el !== null){
      el.classList.remove("blur-user");
    }

    if(elems !==null){
       elems.classList.remove("active");
    }

    if(this.router.url == '/home/dashboard'){
      this.headerService.reloaddashboard(true);
    }else{
      this.router.navigate(['home/dashboard'])
    }
  }

  headerFilter(e, string) {
    localStorage.removeItem('userprofiles')
    localStorage.removeItem('page')
    if(string != 'more_preferences'){
      var elems = document.querySelector(".active");
      if(elems !==null){
       elems.classList.remove("active");
      }
     e.target.className = "nav-link active";
     if(string == 'set_Preferences'){
        this.router.navigate(['home/dashboard/morepreferences'])
      }else{
        this.router.navigate(['home/dashboard'])
        setTimeout(()=>{
          this.headerService.loginFilter(string);
        },500)
      }

    }else{
      var preferenceValue = e == true ? '1' : '0';
      // this.spinner.show();
      this.userService.set_More_Preferences({'preference':preferenceValue}).subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['home/dashboard'])
        setTimeout(()=>{
          this.headerService.loginFilter(string);
        },500)
          this.spinner.hide();
      }, error => {
          this.spinner.hide();
        console.log(error);
      })
    }
  }

  goToProfilePage(){
    localStorage.removeItem('userprofiles')
    localStorage.removeItem('page')
    localStorage.removeItem("afterReloadSelectedTabs");
    var elems = document.querySelector(".active");
      if(elems !==null){
      elems.classList.remove("active");
      }

    var removeActive = document.querySelector(".show-hide.tab-pane.fade.active");
      console.log(removeActive);
      if(removeActive !==null){
        removeActive.classList.remove("active");
      }

    var el = document.querySelector(".profile-tab");
      if(removeActive !==null){
        el.classList.add("active");
      }

    var addActive = document.querySelector(".home-cont");
      if(addActive !==null){
        addActive.classList.add("active");
      }

    this.headerService.changeLoginUserdata('currentUser');
    this.router.navigate(['home/dashboard/userprofile'])

  }


  showValidationPopup(string){
    const dialogRef = this.dialog.open(PlanValidationPopup, {
      data: {name: string}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
    return
   }

   goToMemberShipPage(){

    if(this.currentUser.plan_type == 1 || this.currentUser.plan_type == ''){
      this.router.navigate(['home/trustplus/ap']);
    }else if(this.currentUser.plan_type == 2){
      this.router.navigate(['home/centerstage/cupg']);
    }
    // this.router.navigate(['home/trustplus/ap'])
   }


   ngOnDestroy() {
    this.subscriptionLogin.unsubscribe();
    this.subscriptionRegister.unsubscribe();
	}
}
