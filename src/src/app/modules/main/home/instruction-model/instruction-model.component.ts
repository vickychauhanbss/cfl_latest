import { Component ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-instruction-model',
  templateUrl: './instruction-model.component.html',
  styleUrls: ['./instruction-model.component.css']
})


export class InstructionComponent {
  description: any;
  constructor(
    public dialogRef: MatDialogRef<InstructionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
      this.description = data.name;
    }

  ngOnInit() {
  }

  dismissModal(){
    this.dialogRef.close();
  }
}