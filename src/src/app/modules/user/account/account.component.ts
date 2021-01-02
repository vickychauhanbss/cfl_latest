import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrManager } from 'ng6-toastr-notifications';
import { userService } from '../../../shared/services/user/user.service';
import { MessageService } from '../../../eventservice';
import { footerService } from '../../../shared/services/footer/footer.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ChangePassword } from '../change-password-modal/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { dashboardService } from '../../../shared/services/dashboard/dashboard.service';
import { WarningPopupComponent } from '../warning-popup/warning-popup.component';
import { Router } from "@angular/router";
import { loginRegisterService } from '../../../shared/services/login-register-service/login-register.service';
import { HeaderService } from '../../../shared/services/header/header.service';
declare var require: any



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, AfterViewInit {
  enable    : false;
  enable1   : false;
  enable2   : false;
  userId    : any;
  accountInfo : FormGroup;
  paramsdata: any;
  submitted = false;
  deleteCheckbox = false;
  isDisabled = true;
  selectCheckbox = false;
  showThirdStep = false;
  online_now_off: any;
  visibility_off: any;
  email_preferences: any;
  blocked_users : any = [];
  deleteReasons: any = [];
  countiesArray: any = [];
  statesArray: any = [];
  membership: any;
  reason : any;
  not_delete = false;
  visibilty_off =  false;
  dob: any;
  userData: any;
	defaultImage = require('../../../../assets/chat/image-loader.gif');
  centerStage = {
    text  : '',
    video : ''
  };
  personal_data = {
    first_name : '',
    email      : '',
    height_options : '',
    country:''
  }

  public months = ["01" , "02" , "03" , "04" , "05" , "06" , "07" , "08" , "09" , "10" , "11" , "12"];
  public days = [];
  public years = [];

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrManager,
    private userService: userService,
    private messageService: MessageService,
    private footerService: footerService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dashboardService : dashboardService,
    private router: Router,
    private loginRegisterService: loginRegisterService,
    private headerService : HeaderService,
    private elementRef:ElementRef

  ) {
    let currentUesr =  localStorage.getItem("loginUser");
    this.userData = JSON.parse(currentUesr);
    this.userId = this.userData.id;
  }


  get f() { return this.accountInfo.controls; }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.accountInfo = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.maxLength(12)]],
      last_name: ['', [Validators.required, Validators.maxLength(12)]],
      height :[''],
      country :[''],
      state:[''],
      city:[''],
      address1:[''],
      address2:[''],
      phone:[''],
      user_id:[''],
      tab:[''],
      day:[''],
      month:[''],
      year:[''],
      dob:['']
    });

    this.messageService.login('showHeaderSubscription');
    this.footerService.hidefooter(true);
    this.spinner.show();
    this.userService.get_user_account_settings({'user_id':this.userId}).subscribe((data: any) => {
      this.spinner.hide();
      console.log(data.records);
       if(data.status == 'OK'){
         this.personal_data = data.records.personal_data;
         this.dob = data.records.personal_data.dob.split('-')

         this.accountInfo.patchValue({
            first_name: data.records.personal_data.first_name,
            last_name: data.records.personal_data.last_name,
            height: data.records.personal_data.height,
            user_id: this.userId,
            country : data.records.personal_data.country,
            state : data.records.personal_data.state,
            address1: data.records.personal_data.address1,
            address2: data.records.personal_data.address2,
            city: data.records.personal_data.city,
            phone: data.records.personal_data.phone,
            day: this.dob[2],
            month: this.dob[1],
            year: this.dob[0],
            tab: 'personal_details'
          });
         this.online_now_off = data.records.personal_data.online_now_off == '0' ? true : false;
         this.visibility_off = data.records.personal_data.visibility_off == '0' ? true : false;
         this.deleteReasons = data.records.delete_reasons;

         if(data.records.blocked_users){
          this.blocked_users = data.records.blocked_users;
         }
         this.centerStage = data.records.centerStage;
         this.email_preferences = data.records.email_preferences;
         this.membership = data.records.membership;
         console.log(this.membership);
         this.get_countries_data();
       }
     }, error => {
       this.spinner.hide();
       this.toastr.errorToastr(error.error, 'Oops!',   {
         position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
       });
     })


      var today = new Date();
      var yyyy = today.getFullYear()
      const currentYear = yyyy - 18;
      const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
      this.years = range(currentYear, currentYear - 50, -1)
      var month = today.getMonth() + 1;
      this.getDaysArray(yyyy, month)
  }


  ngAfterViewInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://app.kartra.com/resources/js/helpdesk_frame";
    this.elementRef.nativeElement.appendChild(s);
  }

  get_countries_data(){
    this.dashboardService.get_countries_data().subscribe((data: any) => {
      console.log(data)
      if(data.status == "OK"){
        this.countiesArray = data.records;
        this.statesArray = this.countiesArray.find(x => x.id === Number(this.personal_data.country));
        console.log(this.statesArray)
      }
     }, error => {
       console.log(error);
       this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
     })
  }

  getDaysArray = function(year, month) {
    var date = new Date(year, month - 1, 1);
    var result = [];
    while (date.getMonth() == month - 1) {
      var dates = (date.getDate() < 10 ? '0' : '') + date.getDate();
      result.push(dates);
      date.setDate(date.getDate() + 1);
    }
    this.days = result;
  }

  save_account_settings(string, block_user, index){
      if(string == 'blocked_users'){
        this.paramsdata = {
          'tab' : string,
          'blocked_user_id' :block_user.id,
          'user_id' : this.userId
        }
      }else if(string == 'email_preferences'){

        this.email_preferences.Instant_Notifications.value.forEach(obj => {
            if(obj.preference_value == true){
              obj.preference_value = 1;
            }
            else if(obj.preference_value == false){
              obj.preference_value = 0;
            }
        });

        this.email_preferences.Keep_it_currentKeep_it_REAL.value.forEach(obj => {
          if(obj.preference_value == true){
            obj.preference_value = 1;
          }
          else if(obj.preference_value == false){
            obj.preference_value = 0;
          }
      });

        this.email_preferences.Your_Daily_Dating_Update.value.forEach(obj => {
          if(obj.preference_value == true){
            obj.preference_value = 1;
          }
          else if(obj.preference_value == false){
            obj.preference_value = 0;
          }
      });

       this.paramsdata = {
          'tab' : string,
          'data' :this.email_preferences,
          'user_id' : this.userId
        }
      }
      console.log(this.paramsdata)
      this.spinner.show();
      this.userService.save_account_settings(this.paramsdata).subscribe((data: any) => {
        this.spinner.hide();
        console.log(data);

        if(data.status == 'OK'){
          if(string == 'blocked_users'){
            this.blocked_users.splice(index , 1);
            this.toastr.successToastr('User restore successfully.', 'Success',
                { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
            );
          }else if(string == 'email_preferences'){
            this.toastr.successToastr('Email preferences updated successfully.', 'Success',
              { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
            );
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


  updateVisibleAndOnline(string){
    var data = {}
    if(string == 'visible'){
      data = {
        'online_now' : this.online_now_off == true ? '0' : '1',
        'visibility': this.visibility_off == true ? '0' : '1',
        'user_id': this.userId,
        'tab':'visibility'
       }
    }else{
      data = this.accountInfo.value
    }
    console.log(data);

    this.spinner.show();
    this.userService.save_account_settings(data).subscribe((data: any) => {
      this.spinner.hide();
       if(data.status == 'OK'){
        this.toastr.successToastr('Account settings updated successfully.', 'Success',
            { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        );
       }else{
        this.toastr.errorToastr(data.msg, 'Oops!',
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


  updateAccountInfo(string){
    this.submitted = true;
    //stop here if form is invalid
    if (this.accountInfo.invalid) {
        return;
    }
    this.personal_data.first_name = this.accountInfo.value.first_name;
    var today = new Date();
    var selectedDate = this.accountInfo.value.year +'/'+ this.accountInfo.value.month +'/'+this.accountInfo.value.day;
    console.log(selectedDate);
    var birthDate = new Date(selectedDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    console.log(age);

    if(age <= 17){
      this.toastr.errorToastr('Age should be greate then or equal to 18', 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
      return
    }

    this.accountInfo.patchValue({
      dob : this.accountInfo.value.month +'-'+ this.accountInfo.value.day+'-'+this.accountInfo.value.year
    })

    this.updateVisibleAndOnline(string)
  }

  openChangePasswordModal(text): void {
    const dialogRef = this.dialog.open(ChangePassword, {data: {'condition': text, 'reasonArray' : this.deleteReasons}});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  chooseCountry(country): void {
    console.log(country.target.value);
    this.statesArray = this.countiesArray.find(x => x.id === Number(country.target.value));
    this.accountInfo.patchValue({
      state : this.statesArray.states[0].id
    })
  }

  openNextTab(el: HTMLElement, tabs : HTMLElement) {
    console.log(el);

    var activeclass = document.querySelectorAll('#cancelmembership li');
    [].forEach.call(activeclass, function(el) {
      el.classList.remove("active");
    });

    let removeACtive = document.getElementById('step1')
    removeACtive.classList.remove("active");
    el.classList.add("active");
    tabs.classList.add("active");

  }

  openPopup(event: any, el: HTMLElement, tabs : HTMLElement){
    console.log(event)
    this.selectCheckbox = event
    if(event == true){
      const dialogRef = this.dialog.open(WarningPopupComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        console.log('The dialog was closed');

        if(result == true){
          var postdata = {
            'reason' : this.reason,
            'tab' : 'cancel_membership',
            'not_delete' : '0',
            'cancel' : '1',
            'user_id' : this.userId,
            'cancel_chk' : 1
          }
          console.log(postdata)
          this.userService.save_account_settings(postdata).subscribe((data: any) => {
            console.log(data)
            this.spinner.hide();
             if(data.status == 'OK'){
               this.showThirdStep = true;
                let removeACtive = document.getElementById('step2')
                removeACtive.classList.remove("active");
                el.classList.add("active");
                var activeclass = document.querySelectorAll('#cancelmembership li');
                [].forEach.call(activeclass, function(el) {
                  el.classList.remove("active");
                });

                tabs.classList.add("active");
                setTimeout(() => {
                  this.loginRegisterService.logout();
                  this.router.navigate(['home']);
                }, 3000);
             }
           }, error => {
             console.log(error);
           })
        }
      });
    }
  }

  goToPaymentPage(){
    var postdata = {
      'reason' : this.reason,
      'tab' : 'cancel_membership',
      'not_delete' : this.not_delete == false ? 0 : 1,
      'visibility_off' : this.visibilty_off ==  false ? 0: 1,
      'cancel' : 0,
      'user_id' : this.userId,
      'cancel_chk' : 0
    }
    this.userService.save_account_settings(postdata).subscribe((data: any) => {
      console.log(data)
      this.router.navigate(['home/successcentral/dcds'])
    }, error => {
       console.log(error);
    })
  }

  cancelAccount(el: HTMLElement, tabs : HTMLElement){
    var postdata = {
      'reason' : this.reason,
      'tab' : 'cancel_membership',
      'not_delete' : '0',
      'cancel' : '1',
      'user_id' : this.userId,
      'cancel_chk' : 0
    }
    console.log(postdata)

    this.userService.save_account_settings(postdata).subscribe((data: any) => {
      console.log(data)
      this.spinner.hide();
       if(data.status == 'OK'){
        this.showThirdStep = true;

          let removeACtive = document.getElementById('step2')
          removeACtive.classList.remove("active");
          el.classList.add("active");

          var activeclass = document.querySelectorAll('#cancelmembership li');
          [].forEach.call(activeclass, function(el) {
            el.classList.remove("active");
          });

          tabs.classList.add("active");

          // this.userData.plan_type = 1;
          // localStorage.setItem("loginUser", JSON.stringify(this.userData));
          // this.headerService.updateUserPlan(1);
       }
     }, error => {
       console.log(error);
     })
  }

  goToPlanPage(){
    this.router.navigate(['home/centerstage/cupg'])
  }
}