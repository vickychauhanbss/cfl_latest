import { Component, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { userService } from '../../../shared/services/user/user.service';
//Import Api loader
import { NgxSpinnerService } from "ngx-spinner";
import { HeaderService } from '../../../shared/services/header/header.service';
declare var require: any

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-icon-modal',
  templateUrl: './icon-modal.component.html',
  styleUrls: ['./icon-modal.component.css']
})


export class IconComponent {
  IntersetIcons:any = [];
  userId: any;
  private subscription;
	defaultImage = require('../../../../assets/chat/image-loader.gif');


  constructor(
    public dialogRef: MatDialogRef<IconComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private userService: userService,
    public headerService : HeaderService

  ) {
      let currentUesr =  localStorage.getItem("loginUser");
      let userData = JSON.parse(currentUesr)
      this.userId = userData.id;

      this.subscription = this.headerService.closePopup.subscribe((bit)=>{
        console.log(bit);
        this.dialogRef.close();
      })
    }

    ngOnInit() {
      this.spinner.show();
      this.userService.get_user_interest_icon({'user_id' :this.userId}).subscribe((data: any) => {
        console.log(data.records);
        this.spinner.hide();
        if(data.status == 'OK'){
          this.IntersetIcons = data.records
        }
      }, error => {
        console.log(error);
        this.spinner.hide();
      })
    }


    dismissModal(image){
      this.dialogRef.close(image);
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

}