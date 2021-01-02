import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HeaderService } from '../../../shared/services/header/header.service';


export interface DialogData {
  video: string;
}

@Component({
  selector: 'app-video-model',
  templateUrl: './video-model.component.html',
  styleUrls: ['./video-model.component.css']
})


export class videoUserComponent {
  email: any;
  videoUrl: any;
  private subscription;

  constructor(
    public dialogRef: MatDialogRef<videoUserComponent>,
    public headerService : HeaderService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, ) {
      let video = data.video == '' ? 'assets/home-img/client-video-old.mp4' :  data.video;
      this.videoUrl = video;

      this.subscription = this.headerService.closePopup.subscribe((bit)=>{
        console.log(bit);
        this.dialogRef.close();
      })
    }

  ngOnInit() {
  }

  dismissModal(){
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}