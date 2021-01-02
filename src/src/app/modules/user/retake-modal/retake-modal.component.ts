import { Component, Inject} from '@angular/core';
//Import Libraries
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrManager } from 'ng6-toastr-notifications';

//Import Services
import { userService } from '../../../shared/services/user/user.service';
import { HeaderService } from '../../../shared/services/header/header.service';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-retake-modal',
  templateUrl: './retake-modal.component.html',
  styleUrls: ['./retake-modal.component.css']
})

export class RetakeModalComponent {
  retakeFrom: FormGroup;
  submitted = false;
  userId: any;
  private subscription;

  constructor(
    public dialogRef: MatDialogRef<RetakeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private userService: userService,
    private toastr: ToastrManager,
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
      this.retakeFrom = this.formBuilder.group({
          reason: ['', [Validators.required]],
      });
    }

    get f() { return this.retakeFrom.controls; }


    onSubmit() {
      this.submitted = true;
      //stop here if form is invalid
      if (this.retakeFrom.invalid) {
          return;
      }

      this.spinner.show();
      this.userService.onboarding_retake_user({'user_id' :this.userId,'reason':this.retakeFrom.value.reason}).subscribe((data: any) => {
        console.log(data);
        this.spinner.hide();
        if(data.status == 'OK'){
          this.submitted = false;
          this.retakeFrom.reset();
          this.dialogRef.close();
          this.toastr.successToastr('Request submitted successfully.', 'Success',
              { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
          );
        }
      }, error => {
        console.log(error);
        this.spinner.hide();
        this.toastr.errorToastr(error.error, 'Oops!',   {
          position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
        });
      })
    }

    dismissModal(){
      this.dialogRef.close();
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

}