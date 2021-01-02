import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dashboardService } from '../../../shared/services/dashboard/dashboard.service';
import { HeaderService } from '../../../shared/services/header/header.service';


export interface DialogData {
  check: string;
  video: any
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  checkPage: any;
  videoUrl: any;
  showNextPopup:boolean = false;
  postData: any;
  private subscription;

  constructor(
    public dialogRef: MatDialogRef<WelcomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dashboardService : dashboardService,
    public headerService : HeaderService,

  ) {
    this.checkPage = data.check;
    let video = data.video == '' ? 'assets/home-img/client-video-old.mp4' :  data.video;
    this.videoUrl = video;

    this.subscription = this.headerService.closePopup.subscribe((bit)=>{
      console.log(bit);
      this.dialogRef.close();
    })
  }

  ngOnInit() {
    let currentUesr =  localStorage.getItem("loginUser");
    let userData = JSON.parse(currentUesr);

    if(this.checkPage == 'userprofile'){
      this.postData = {
        'page': 'profile_visit',
        'user_id' :userData.id
      }
    }else{
      this.postData = {
        'page': 'dashboard_visit',
        'user_id' :userData.id
      }
    }

    this.dashboardService.page_visit_user(this.postData).subscribe((data: any) => {
      if(this.checkPage == 'userprofile'){
        userData.profile_visit = '0';
      }else{
        userData.dashboard_visit = '0';
      }
      localStorage.setItem("loginUser", JSON.stringify(userData));
      console.log(data);
    }, error => {
      console.log(error)
    })
  }

  dismissModal(next){
    if(next){
      this.showNextPopup = true
    }else{
      this.dialogRef.close();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
