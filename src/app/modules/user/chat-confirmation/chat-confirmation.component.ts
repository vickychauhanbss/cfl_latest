import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  name: string
}

@Component({
  selector: 'app-chat-confirmation',
  templateUrl: './chat-confirmation.component.html',
  styleUrls: ['./chat-confirmation.component.css']
})


export class ChatConfimationComponent {
  deletePop: any;
  condition: any;
  constructor(
    public dialogRef: MatDialogRef<ChatConfimationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
      this.condition = data.name;
    }

  ngOnInit() {

  }

  dismissModal(data){
    this.dialogRef.close(data);
  }
}