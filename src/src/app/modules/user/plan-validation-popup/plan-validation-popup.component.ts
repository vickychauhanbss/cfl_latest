import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from "@angular/router";
import { HeaderService } from '../../../shared/services/header/header.service';


export interface DialogData {
  name: string;
}

@Component({
  selector: 'plan-validation-popup',
  templateUrl: './plan-validation-popup.component.html',
  styleUrls: ['./plan-validation-popup.component.css']
})


export class PlanValidationPopup {
  text: any
  private subscription;

  constructor(  public dialogRef: MatDialogRef<PlanValidationPopup>,
    public headerService : HeaderService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private router: Router, ) {
      console.log(data);
      this.text = data.name;
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

  goToUpgradeNowPage() {
    this.dialogRef.close();
    this.router.navigate(['home/trustplus/ap'])
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}