import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {}

@Component({
  selector: 'app-video-model',
  templateUrl: './video-model.component.html',
  styleUrls: ['./video-model.component.css']
})


export class videoComponent {
  email: any;
  constructor(
    public dialogRef: MatDialogRef<videoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
  }

  dismissModal(){
    this.dialogRef.close();
  }

  playStop(){
    console.log('-------');
    let audioPlayer = <HTMLVideoElement>document.getElementById('VideoPlay');
    console.log(audioPlayer)
    audioPlayer.pause()
    audioPlayer.play();


  }
}