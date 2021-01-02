import { Component, Inject} from '@angular/core';

//Import Libraries
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login-v2';

//Import Components
import { VerifyComponent } from '../verify-model/verify-model.component';
import { ForgotPasswordComponent } from '../../../../modules/main/home/forgot-password/forgot-password.component';

//Import Services
import { loginService } from '../../../../shared/services/change-login/login.service';
import { loginRegisterService } from '../../../../shared/services/login-register-service/login-register.service';
import { MessageService } from '../../../../eventservice';
import { ChatService } from '../../../../../../src/app/shared/services/chat/chat.service';
import { HeaderService } from '../../../../../../src/app/shared/services/header/header.service';


export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})


export class loginComponent {
  loginForm: FormGroup;
  submitted = false;
  remember =  false;
  disbaleButton = true;
  rememberData:Boolean;
  errorMessage: any;
  message: any;
  userData: any;
  hideMessage = false;
  socialType : any;

  constructor(
    public dialogRef: MatDialogRef<loginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    public loginService : loginService,
    private loginRegisterService: loginRegisterService,
    public toastr: ToastrManager,
    private spinner: NgxSpinnerService,
    private socialAuthService: AuthService,
    private messageService: MessageService,
    private router: Router,
    public dialog: MatDialog,
    private chatService: ChatService,
		private headerService: HeaderService,

  ) {
      this.loginService.redirectRegister.subscribe((bit)=>{
        this.dismissModal();
      })
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required ]],
        type: [''],
        rememberMe: [false],
        token : [localStorage.getItem('notificationToken')]
    });

    if(JSON.parse(localStorage.getItem('RememberMe')) !== false){
      this.loginForm.patchValue({
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
        rememberMe :JSON.parse(localStorage.getItem('RememberMe'))
      });
    }
    this.remember = JSON.parse(localStorage.getItem('RememberMe'))
    this.checkCurrentSessionSocket()
  }

  checkCurrentSessionSocket(){
    this.chatService.userSessionCheck().subscribe( async (loggedIn: boolean) => {
			console.log(loggedIn)
			if (loggedIn) {
			} else {
				//this.getUsernameSuggestion();
			}
		});
  }

  get f() { return this.loginForm.controls; }

  // Login Function
  onSubmit(type) {
      this.submitted = true;
      this.loginForm.patchValue({
        type: type
     });

      //stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      if(this.remember == true){
         localStorage.setItem("email", this.loginForm.value.email);
         localStorage.setItem("password", this.loginForm.value.password);
         localStorage.setItem('RememberMe', JSON.stringify(this.remember));
       }else{
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem('RememberMe');
       }

      // this.spinner.show();
      this.loginRegisterService.login_user(this.loginForm.value).subscribe((data: any) => {
        console.log(data);
        this.headerService.startEndActivity(true);
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
        this.admirerOnline(data.user.id)
      }, error => {
        this.spinner.hide();
        this.hideMessage = false;
        this.errorMessage = error.error
      })
  }

  admirerOnline(id){
    this.loginRegisterService.admirer_online({user_id :id}).subscribe((response: any) => {
      // console.log(response);
    }, error => {
      this.spinner.hide();
      // console.log(error);
    })

  }


  //Social login (Facebook/Google)
  public socialSignIn(socialPlatform : string) {
    this.dialogRef.close();
    console.log(socialPlatform)
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
          console.log(data)
          if(data.status == 'OK' && data.exists == 0){
            this.spinner.hide();
            this.verifyModal(userData.email, 'socialLogin')
          }else{
            this.loginRegisterService.login_user({email: userData.email,  type :'gmail'}).subscribe((data: any) => {
            this.spinner.hide();
              console.log(data);

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
              this.admirerOnline(data.user.id)
              // this.dialogRef.close();
              // localStorage.setItem("token", data.token);
              // localStorage.setItem("loginUser", JSON.stringify(data.user));
              // this.messageService.login('hideHeaderFooter');
              // if(data.user.onboarding_complete == '1') {
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
          //this.spinner.hide();
        }, error => {
          this.spinner.hide();
          this.errorMessage = error.error;
        })
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
          type :this.socialType
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
        this.admirerOnline(data.user.id)
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
    });
  }


  rememberMe(){
    this.remember = this.remember  == true ? false : true;
    console.log(this.remember)
  }


  goToLoginPage(){
    console.log('login');
    this.loginService.redirectRegisterPage(true)
  }


  dismissModal(){
    this.dialogRef.close();
  }

  forgotPassword(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  hideValidation(){
    if(this.loginForm.value.password == ''){
      this.hideMessage = true;
    }
  }
}
