import { Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrManager } from 'ng6-toastr-notifications';

export interface DialogData {
  file: string;
}

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-guide.component.html',
  styleUrls: ['./download-guide.component.css']
})


export class DownloadComponent {
  submitted = false;
  remember =  false;
  disbaleButton = true;
  rememberData:Boolean;
  errorMessage: any;
  pdfLink: any;

  constructor(
    public dialogRef: MatDialogRef<DownloadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public toastr: ToastrManager,
    public dialog: MatDialog
  ) {
      this.pdfLink = data.file
    }

  ngOnInit() {}

  dismissModal(){
    this.dialogRef.close();
  }

  downloadGuide(){
    window.open(this.pdfLink, '_blank');
    this.dialogRef.close();
  }
}