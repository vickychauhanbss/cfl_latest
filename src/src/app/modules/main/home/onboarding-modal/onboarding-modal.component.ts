import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { userService } from '../../../../shared/services/user/user.service';
import { HeaderService } from '../../../../shared/services/header/header.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from "@angular/router";

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-onboarding-modal',
  templateUrl: './onboarding-modal.component.html',
  styleUrls: ['./onboarding-modal.component.css']
})


export class OnboardignModalComponent {
  userId: any;
  userData: any;
  constructor(
    public dialogRef: MatDialogRef<OnboardignModalComponent>,
    private userService: userService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private HeaderService: HeaderService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrManager,
    private router: Router,
  ) {
      let currentUesr =  localStorage.getItem("loginUser");
      this.userData = JSON.parse(currentUesr);
    }

  ngOnInit() {
  }

  goToSubscribe(){
    if(this.userData){
      this.spinner.show();
      this.userService.complete_profile({'profile_completeness_id':1 , 'user_id':this.userData.id}).subscribe((data: any) => {
        this.HeaderService.updateProfilePercantage(true);
        if(data.status == 'OK'){
            this.spinner.hide();
            this.dialogRef.close();
            this.router.navigate(['home/trustplus/ap'])
        }

        this.update_user_score();
        this.retake_onboarding();
      }, error => {
        console.log(error);
        this.spinner.hide();
        this.toastr.errorToastr(error.error, 'Oops!',   {
          position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
        });
      })
    }else{
      this.router.navigate(['home'])
    }
  }


  update_user_score(){
    this.userService.update_score({'user_id':this.userId}).subscribe((data: any) => {
      console.log(data);

    }, error => {
      console.log(error);
    })
  }


  retake_onboarding(){
    this.userService.retake_onboarding({retake : '1', 'user_id':this.userData.id}).subscribe((data: any) => {
      console.log(data);
    }, error => {
      console.log(error);
      this.spinner.hide();
      this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
    })
  }

  dismissModal(){
    this.dialogRef.close();
  }
}