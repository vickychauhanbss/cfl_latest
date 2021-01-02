import { Component, OnInit ,Inject, ElementRef , ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { userService } from '../../../shared/services/user/user.service';
//Import Api loader
import { NgxSpinnerService } from "ngx-spinner";
import { DataShareService } from '../../../shared/services/utils/data-share.service';
import { SocketService } from '../../../shared/services/socket/socket.service';
import { User } from './../../../interfaces/user';
import { HeaderService } from '../../../shared/services/header/header.service';
declare var require: any

export interface DialogData {
  condition: string
}

@Component({
  selector: 'app-choose-gallary',
  templateUrl: './choose-gallary.component.html',
  styleUrls: ['./choose-gallary.component.css']
})


export class ChooseGallaryComponent {
  @ViewChild('videoPlayer',{static : false}) videoplayer: ElementRef;

  gallaryImages:any = [];
  gallaryVideos:any = [];
  userId: any;
  condition: any;
  selectUserId   : any;
  selectedVideo: '';
  sendVideo: any;
  public selectedUser: User = null;
  private subscription;
	defaultImage = require('../../../../assets/chat/image-loader.gif');


  

  constructor(
    public dialogRef: MatDialogRef<ChooseGallaryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private userService: userService,
    private dataShareService: DataShareService,
    private socketService: SocketService,
    public headerService : HeaderService
  ) {
      let currentUesr =  localStorage.getItem("loginUser");
      let userData = JSON.parse(currentUesr)
      this.userId = userData.id;
      console.log(data.condition);
      this.condition = data.condition;

      this.subscription = this.headerService.closePopup.subscribe((bit)=>{
        console.log(bit);
        this.dialogRef.close();
      })
    }

    ngOnInit() {
      this.spinner.show();
      this.userService.get_gellery_data({'user_id' :this.userId}).subscribe((data: any) => {
        this.spinner.hide();
        console.log(data)
        if(data.status == 'OK' && data.records){
          // this.gallaryData = data.records
          data.records.forEach(item => {
            if(item.type == "gallary_img"){
              this.gallaryImages.push(item)
            }else{
              this.gallaryVideos.push(item)
            }
          })

        }
      }, error => {
        console.log(error);
        this.spinner.hide();
      })


      this.selectUserId = this.dataShareService.getUserId();
      console.log(this.selectUserId);
      this.dataShareService.selectedUser.subscribe((selectedUser: User) => {
        console.log(selectedUser);

        if (selectedUser !== null) {
          this.selectedUser = selectedUser;
          console.log(this.selectedUser.id);
        }
      });
    }


    dismissModal(image){
      console.log(image);
      this.dialogRef.close(image);
    }


    selectVideo(event, el, video){
      event.preventDefault();
      console.log(el.value);
      console.log(video);
        if (this.selectedVideo && this.selectedVideo === el.value) {
          el.checked = false;
          this.selectedVideo = '';
        } else {
          this.selectedVideo = el.value
          el.checked = true;
        }

        console.log(this.selectedVideo);
        this.sendVideo = video;
  }

  send(){
    console.log(this.sendVideo);
    console.log(this.selectedVideo);
    if(this.selectedVideo != '' || this.selectedVideo != undefined){
      this.dialogRef.close(this.sendVideo);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}