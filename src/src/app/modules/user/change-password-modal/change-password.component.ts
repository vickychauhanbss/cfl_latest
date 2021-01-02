import { Component, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { userService } from '../../../shared/services/user/user.service';
//Import Api loader
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MustMatch } from '../../../shared/must-match.validator';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ConfirmationComponent } from '../../main/home/confirmation-model/confirmation-model.component';
import { loginRegisterService } from '../../../shared/services/login-register-service/login-register.service';
import { Router } from "@angular/router";
import { HeaderService } from '../../../shared/services/header/header.service';


export interface DialogData {
  condition: string;
  reasonArray: any;
}

@Component({
  selector: 'app-account-modal',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})


export class ChangePassword {
  userId: any;
  passForm : FormGroup;
  deleteForm : FormGroup;
  submitted: boolean =  false;
  submittedDeleted : boolean = false;
  hideMessage: boolean = false;
  showError : any;
  condition: any;
  reasonArray: any = [];
  private subscription;

  constructor(
    public dialogRef: MatDialogRef<ChangePassword>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private userService: userService,
    private formBuilder: FormBuilder,
    private toastr: ToastrManager,
    private router: Router,
    private loginRegisterService: loginRegisterService,
    public headerService : HeaderService
  ) {
      let currentUesr =  localStorage.getItem("loginUser");
      let userData = JSON.parse(currentUesr)
      this.userId = userData.id
      console.log(data.condition);
      this.condition = data.condition;
      this.reasonArray = data.reasonArray;
      this.subscription = this.headerService.closePopup.subscribe((bit)=>{
        console.log(bit);
        this.dialogRef.close();
      })
    }

    ngOnInit() {
      // this.spinner.show();

      this.passForm = this.formBuilder.group({
        password: ['', [Validators.required ]],
        newpass: ['', [Validators.required,  Validators.minLength(6) ]],
        confirm_pass: ['', [Validators.required ]]
      }, {
        validator: MustMatch('newpass', 'confirm_pass')
      });


      this.deleteForm = this.formBuilder.group({
        password: ['', [Validators.required ]],
        reason: ['', [Validators.required]],
      });
    }

  get f() { return this.passForm.controls; }
  get g() { return this.deleteForm.controls; }




    dismissModal(){
      this.dialogRef.close();
    }

    onSubmit(){
      this.submitted = true;
      //stop here if form is invalid
      if (this.passForm.invalid) {
          return;
      }

      console.log(this.passForm.value);

      var data = {
        password:this.passForm.value.password,
        new_password: this.passForm.value.newpass,
        user_id: this.userId,
        tab :'update_password'
      }

    this.spinner.show();
    this.userService.save_account_settings(data).subscribe((data: any) => {
      this.spinner.hide();
       if(data.status == 'success'){
        this.submitted = false;
        this.passForm.reset();
        this.dialogRef.close();
        this.toastr.successToastr('Password updated successfully.', 'Success',
            { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        );
       }else{
         this.showError = data.msg;
         this.hideMessage = false;
       }
     }, error => {
       console.log(error);
       this.spinner.hide();
       this.toastr.errorToastr(error.error, 'Oops!',   {
         position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
       });
     })
    }

    hideValidation(){
      this.hideMessage = true;
    }


  deleteUserProfile(){
    this.submittedDeleted = true;
    //stop here if form is invalid
    if (this.deleteForm.invalid) {
        return;
    }


    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {name: 'deleteUser', string :'account'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'delete'){
        var postData = {
          user_id: this.userId,
          reason: this.deleteForm.value.reason,
          password: this.deleteForm.value.password
        }

        console.log(postData);
        this.spinner.show();
        this.userService.delete_user_profile(postData).subscribe((data: any) => {
          this.spinner.hide();
          if(data.status == 'success'){
            this.submitted = false;
            this.deleteForm.reset();
            this.dialogRef.close();
            this.toastr.successToastr('Your account deleted successfully.', 'Success',
                { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
            );

            this.loginRegisterService.logout();
            this.router.navigate(['home'])
          }else{
            this.showError = data.msg;
            this.hideMessage = false;
          }
        }, error => {
          console.log(error);
          this.spinner.hide();
          this.toastr.errorToastr(error.error, 'Oops!',   {
            position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
          });
        })
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}