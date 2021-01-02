import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  video: string;
}

@Component({
  selector: 'app-warning-popup',
  templateUrl: './warning-popup.component.html',
  styleUrls: ['./warning-popup.component.css']
})


export class WarningPopupComponent {
  email: any;
  videoUrl: any;
  private subscription;

  constructor(
    public dialogRef: MatDialogRef<WarningPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData ) {
    }

  ngOnInit() {
  }

  dismissModal(status){
    this.dialogRef.close(status);
  }

}
