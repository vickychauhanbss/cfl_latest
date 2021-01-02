import { Component, Inject} from '@angular/core';

//Import Libraries
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { VerifyComponent } from '../verify-model/verify-model.component';
import { Router } from "@angular/router";
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login-v2';

//Import services
import { loginService } from '../../../../shared/services/change-login/login.service';
import { loginRegisterService } from '../../../../shared/services/login-register-service/login-register.service';
import { MessageService } from '../../../../eventservice';
import { ChatService } from '../../../../../../src/app/shared/services/chat/chat.service';
import { Auth } from '../../../../interfaces/auth';

export interface DialogData {
  name: string;
  condition : string;
}

@Component({
  selector: 'app-start-now',
  templateUrl: './start-now.component.html',
  styleUrls: ['./start-now.component.css']
})


export class StartnowModal {
  registerForm: FormGroup;
  submitted = false;
  animal: string;
  name: string;
  errorMessage: any;
  emailPattern: any;
  userData:any;
  message: any;
  socialType : any;

  constructor(
    public dialogRef: MatDialogRef<StartnowModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private loginService :loginService,
    private loginRegisterService: loginRegisterService,
    private spinner: NgxSpinnerService,
    private socialAuthService: AuthService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private router: Router,
    private chatService: ChatService
  ) {
      this.loginService.redirectPage.subscribe((bit)=>{
        this.dismissModal();
      })
    }

    //On load function
    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        gender: ['', Validators.required],
        interest: ['', Validators.required],
        first_name: ['', [Validators.required, Validators.maxLength(12)]],
        last_name: ['', [Validators.required, Validators.maxLength(12)]],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        acceptTerms: [false, Validators.requiredTrue]
      });
    }


  get f() { return this.registerForm.controls; }


  dismissModal(){
    this.dialogRef.close();
  }

  //Register function
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    // display form values on success
    this.spinner.show();
    this.loginRegisterService.Register_user(this.registerForm.value).subscribe((data: any) => {
      console.log(data);
      if(data.status == 'error'){
        this.spinner.hide();
        this.errorMessage = data.error;
      }else{
        this.dialogRef.close();
        this.spinner.hide();

        // this.chatService.login({'username':this.registerForm.value.email, password:'111111'}).subscribe(
        //   (response: Auth) => {
        //     this.spinner.hide();
        //     console.log(response);
        //     // localStorage.setItem('userid', response.userId);
        //   },
        //   (error) => {
        //     console.log(error);
        //     /* Uncomment it, Incase if you like to reset the Login Form. */
        //     // this.loginForm.reset();
        //   }
        // );
        this.verifyModal(this.registerForm.value.email, 'register')
        this.dialogRef.close();
      }
    }, error => {
      this.spinner.hide();
      this.errorMessage = error.error;
    })
}

// Social login
public socialSignIn(socialPlatform : string) {
  this.dialogRef.close();
  let socialPlatformProvider;
  if(socialPlatform == "facebook"){
    this.socialType = 'facebook';
    socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  }else if(socialPlatform == "google"){
    this.socialType = 'gmail';
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  }
  this.socialAuthService.signIn(socialPlatformProvider).then(
    (userData) => {
      console.log(socialPlatform+" sign in data : " , userData);
      this.userData = userData;

        this.spinner.show();
        this.loginRegisterService.check_user({'email' :userData.email}).subscribe((data: any) => {
          if(data.status == 'OK' && data.exists == 0){
            this.spinner.hide();
            this.verifyModal(userData.email, 'socialLogin')
          }else{
            this.loginRegisterService.login_user({email: userData.email,  type :'gmail'}).subscribe((data: any) => {
              this.spinner.hide();
              if(data.user.onboarding_complete == '1') {
                if(data.user.plan_type == 1 || data.user.plan_type == ''){
                  this.router.navigate(['home/trustplus/ap']);
                }else if(data.user.plan_type == 2){
                  this.router.navigate(['home/centerstage/cupg']);
                }else if(data.user.plan_type == 3){
                  this.router.navigate(['home/dashboard']);
                }
                // this.dialogRef.close();
              } else {
                this.spinner.hide();
                // this.dialogRef.close();
                this.messageService.login('hideHeaderFooter');
                localStorage.setItem("showNotification", 'true');
                this.router.navigate(['home/onboarding'])
              }
              // this.dialogRef.close();
              // localStorage.setItem("token", data.token);
              // localStorage.setItem("loginUser", JSON.stringify(data.user));
              // this.messageService.login('hideHeaderFooter');
              // if(data.user.onboarding_complete == '1'){
              //   this.router.navigate(['home/trustplus/ap'])
              // }else{
              //   localStorage.setItem("showNotification", 'true');
              //   this.router.navigate(['home/onboarding'])
              // }

            }, error => {
              this.spinner.hide();
              console.log(error);
              this.errorMessage = error.error
            })
          }
          this.spinner.hide();
        }, error => {
          this.spinner.hide();
          this.errorMessage = error.error;
        })

      // Now sign-in with userData
      // ...
    }
  );
}

verifyModal(email, condition): void {
  const dialogRef = this.dialog.open(VerifyComponent, {
    data: {name: email, condition : condition}
  });

  dialogRef.afterClosed().subscribe(result => {
    if(condition == 'socialLogin' && result){
      var postData = {
        gender :result.gender,
        interest: result.interest,
        first_name:this.userData.name.split(' ')[0],
        last_name: this.userData.name.split(' ')[1],
        email:this.userData.email,
        type :'gmail'
      }

      this.spinner.show();
      this.loginRegisterService.login_user(postData).subscribe((data: any) => {
        this.spinner.hide();

        if(data.user.onboarding_complete == '1') {
          if(data.user.plan_type == 1 || data.user.plan_type == ''){
            this.router.navigate(['home/trustplus/ap']);
          }else if(data.user.plan_type == 2){
            this.router.navigate(['home/centerstage/cupg']);
          }else if(data.user.plan_type == 3){
            this.router.navigate(['home/dashboard']);
          }
          this.dialogRef.close();
        } else {
          this.spinner.hide();
          this.dialogRef.close();
          this.messageService.login('hideHeaderFooter');
          localStorage.setItem("showNotification", 'true');
          this.router.navigate(['home/onboarding'])
        }
        // this.dialogRef.close();
        // localStorage.setItem("token", data.token);
        // localStorage.setItem("loginUser", JSON.stringify(data.user));
        // this.messageService.login('hideHeaderFooter');
        // if(data.user.onboarding_complete == '1'){
        //   this.router.navigate(['home/trustplus/ap'])
        // }else{
        //   localStorage.setItem("showNotification", 'true');
        //   this.router.navigate(['home/onboarding'])
        // }

      }, error => {
        this.spinner.hide();
        console.log(error);
        this.errorMessage = error.error
      })
    }
    console.log('The dialog was closed');
    //this.animal = result;
  });
}


  goToLoginPage(){
    this.loginService.redirectlogin(true)
  }


  keyPress(event){
    const pattern = /[a-zA-Z]/;   //[a-zA-Z]
    const inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
      }
  }
}
