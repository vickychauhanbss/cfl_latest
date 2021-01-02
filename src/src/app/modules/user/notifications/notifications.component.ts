import { Component, OnInit } from '@angular/core';

//Import Libraries
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { ToastrManager } from 'ng6-toastr-notifications';

//Import services
import { HeaderService } from '../../../shared/services/header/header.service';
import { footerService } from '../../../shared/services/footer/footer.service';
import { userService } from '../../../shared/services/user/user.service';
import { videoUserComponent } from '../video-model-user/video-model.component';
import { MatDialog } from '@angular/material/dialog';
import { FoundTheOneComponent } from '../fount-the-one/fount-the-one.component';
import { FoundConnectComponent } from '../fount-one-users/fount-one-users.component';



@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})

export class NotificationsComponent implements OnInit {
  userId: any;
  notificationArray : any = [];
  userProfileUse : any;
  page: any;
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    public headerService : HeaderService,
    private userService : userService,
    private toastr: ToastrManager,
    private footerService: footerService,
    public dialog: MatDialog,

  ) {
    let currentUesr =  localStorage.getItem("loginUser");
    let userData = JSON.parse(currentUesr);
    if(userData){
      this.userId = userData.id;
      this.fetchUserBanner();
    }

  }

  ngOnInit() {
    if(this.userId){
      this.headerService.loggedIn(true);
      this.footerService.hidefooter(true);
      this.spinner.show();
      this.page = 1;
      this.userService.get_user_notification({'user_id':this.userId,'page':this.page}).subscribe((data: any) => {
        console.log(data)
        if(data.status == "OK" && data.records){
          this.notificationArray = data.records
        }else{
          this.notificationArray = [];
        }
        this.readNotificationFxn();
        this.spinner.hide();
      }, error => {
        console.log(error);
        this.spinner.hide();
        this.toastr.errorToastr(error.error, 'Oops!',   {
          position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
        });
      })
    }else{
      this.router.navigate(['/']);
    }
  }

  // Read notification fxn
  readNotificationFxn(){
    this.userService.read_notifiaction_by_user({'user_id':this.userId}).subscribe((data: any) => {
      this.headerService.readNotification(true);
    }, error => {
      console.log(error);
      this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
    })
  }


  fetchUserBanner(){
    this.userService.get_user_banner({'user_id': this.userId}).subscribe((data: any) => {
      if(data.status == 'OK'){
        this.userProfileUse = data.video[0]
     }
      this.spinner.hide();
    }, error => {
      console.log(error);
      this.spinner.hide();
      //this.toastr.errorToastr(error.error, 'Oops!');
    })
  }


  goToProfilepage(item){
    console.log(item);
    if(item.link == "How to create your profile"){
      const dialogRef = this.dialog.open(videoUserComponent, {data: {'video': this.userProfileUse.video_path}});
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
    }else if(item.link == "Found someone special"){
      const dialogRef = this.dialog.open(FoundTheOneComponent, {data : {'user_id' :item.user_id, 'condition':'notitfication', name:''}});

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result){
        }
      });

    }else if (item.link =='See the lucky couple'){
      console.log(item)
      const dialogRef = this.dialog.open(FoundConnectComponent, {data : {'condition':'notitfication', userId :item.found_the_one_id}});

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result){
        }
      });

    }else{
      localStorage.setItem("afterReloadSelectedTabs", item.page_name);
      this.router.navigate(['home/dashboard/userprofile', {'id': item.user_id }])
    }
  }

  onScrollDown(){
    this.page = this.page + 1
    this.userService.get_user_notification({'user_id':this.userId, 'page': this.page}).subscribe((data: any) => {
      console.log(data)
      if(data.status == "OK" && data.records){
        data.records.forEach(obj => {
          this.notificationArray.push(obj);
      })
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