import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  name: string;
  string: string
}

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-model.component.html',
  styleUrls: ['./confirmation-model.component.css']
})


export class ConfirmationComponent {
  deletePop: any;
  condition: any;
  constructor(  public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      console.log(data.name);
      this.deletePop = data.name;
      this.condition = data.string;
    }

  ngOnInit() {
  }

  logout(){
    console.log('working');
    this.dialogRef.close('logout');
  }

  dismissModal(){
    this.dialogRef.close('');
  }

  delete(){
    this.dialogRef.close('delete');
  }

}