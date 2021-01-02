import { Component, OnInit} from '@angular/core';
import { MessageService } from '../../../eventservice';
//import Router
import { Router } from "@angular/router";
import { footerService } from '../../../shared/services/footer/footer.service';
import { HeaderService } from '../../../shared/services/header/header.service';
import { planService } from '../../../shared/services/plans/plans.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
//Import Api loader
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer } from '@angular/platform-browser';

//Import notification toast
import { ToastrManager } from 'ng6-toastr-notifications';
import { Users } from '../../../interfaces/users';
import { Subscription } from 'rxjs';
import { ChatService } from '../../../shared/services/chat/chat.service';
import { Auth } from '../../../interfaces/auth';

@Component({
  selector: 'app-membershipplan',
  templateUrl: './membershipplan.component.html',
  styleUrls: ['./membershipplan.component.css']
})
export class MembershipplanComponent implements OnInit {
  currentUser: Users;
  currentUserSubscription: Subscription;
  plansArray : any = [];
  monthAmount: any;
  monthCount : any;
  grandTotal : any;
  public payPalConfig?: IPayPalConfig;
  payType    : any;
  cardNumber : string;
  expiryMonth: string;
  expiryYear : string;
  cvc        : string;
  message    : string;
  PaymentDetails : any;
  userId     : any;
  plan_type  : any;
  plan_id    : any;
  planType   : any;
  email      : any;
  userData   : any;
  iframeURL  : any;
  monthCenterAmount: any;
  monthCenterCount : any;
  grandCenterTotal : any;
  constructor(
    private messageService: MessageService,
    private router: Router,
    private footerService: footerService,
    private plans: planService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrManager,
    private chatService: ChatService,
    private headerService : HeaderService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.grandTotal = 0;
    this.planType = 'quarterly';
    let currentUesr =  localStorage.getItem("loginUser");
    if(currentUesr == null){
      this.router.navigate(['home'])
      this.messageService.login('homePage');
    }else{
      let userData = JSON.parse(currentUesr);
      this.userData = userData
      this.userId = userData.id;
      this.email = userData.email;
      this.iframeURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://crazyfilipinalov.kartra.com/page/NBk181?email='+this.userData.email+'&first_name='+this.userData.first_name+'&last_name='+this.userData.last_name);
      this.spinner.show();
      // this.userService.check_user_token().subscribe((data: any) => {
      //   console.log(data);
        this.getSubscriptionPlans();
        this.initConfig();
      //   console.log(data)
         this.messageService.login('showHeaderSubscription');
         this.footerService.hidefooter(true);
      // },(error)=>{
      //   console.log(error.status);
      //   if(error.status == 400){
      //     // this.messageService.login('showHeaderFooter');
      //     // localStorage.removeItem("loginUser");
      //     // localStorage.removeItem("token");
      //     // this.router.navigate(['home']);
      //   }
      // })
    }
  }


  getSubscriptionPlans(){
    this.plans.get_subscription_plans().subscribe((data: any) => {
      this.spinner.hide();

      console.log(data);
      if(data.data){
        this.plansArray = data.data;
        var monthAmount = data.data[1].plan_amount2/3;
        this.monthAmount = monthAmount.toFixed(2)

        this.monthCount = data.data[1].plan_duration2;
        this.grandTotal = data.data[1].plan_amount2;

        var monthCenterAmount = data.data[2].plan_amount2/3;
        this.monthCenterAmount = monthCenterAmount.toFixed(2)
        this.monthCenterCount = data.data[2].plan_duration2;
        this.grandCenterTotal = data.data[2].plan_amount2;

        this.chatService.login({'username':this.email, password:'111111'}).subscribe(
          (response: Auth) => {
            console.log(response);
            localStorage.setItem('userid', response.userId);
          },
          (error) => {
            console.log(error);
          }
        );

      }
    },(error)=>{
      this.spinner.hide();
      console.log(error);
    })
  }

  goToDashboard(){
    this.router.navigate(['home/dashboard'])
  }

  changePlans(e, string, data1 , data2) {
    var elems = document.querySelector(".active");
    if(elems !==null){
     elems.classList.remove("active");
    }
   this.planType = string;
   e.target.className = "nav-link active";

   let monthAmount = string == 'monthly' ? data1.plan_amount1 :  string == 'quarterly' ? data1.plan_amount2/3 : data1.plan_amount3/12;
   this.monthAmount = monthAmount.toFixed(2)
   this.grandTotal = string == 'monthly' ? data1.plan_amount1 :  string == 'quarterly' ? data1.plan_amount2 : data1.plan_amount3;
   this.monthCount = string == 'monthly' ? data1.plan_duration1 :  string == 'quarterly' ? data1.plan_duration2 : data1.plan_duration3;

   let monthCenterAmount = string == 'monthly' ? data2.plan_amount1 :  string == 'quarterly' ? data2.plan_amount2/3 : data2.plan_amount3/12;
   this.monthCenterAmount = monthCenterAmount.toFixed(2)
   this.grandCenterTotal = string == 'monthly' ? data2.plan_amount1 :  string == 'quarterly' ? data2.plan_amount2 : data2.plan_amount3;
   this.monthCenterCount = string == 'monthly' ? data2.plan_duration1 :  string == 'quarterly' ? data2.plan_duration2 : data2.plan_duration3;
  }


  //Config paypal
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'AfJ-ZvYtpFhXG_lgrx2Z_a1UTehzwzfG_ulMnnw8oABs4mDAqIRwcOK6ETisg6PAa-aPh0YECUJNHfAX',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: this.grandTotal,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.grandTotal
              }
            }
          },
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log(data);
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.payType = 'paypal';
      this.PaymentDetails = data;
      if(data.status == 'COMPLETED'){
        this.payment()
      }
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

// You can access the token ID with `token.id`.
// Get the token ID to your server-side code for use.
  openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_p1ywOGAVQCWiwKg0dcVKakOh',
      locale: 'auto',
      token: (token: any) => {
        console.log(token);
        this.payType = 'stripe';
        this.PaymentDetails = token.id
        this.payment();
      }
    });

    handler.open({
      name: 'Crazy Filipino Love',
      amount: this.grandTotal * 100
    });
  }

  checkPaymentType(string, plan_id){
    this.plan_type = string;
    this.plan_id = plan_id
    if(string == 'free'){
      this.payment()
    }
  }

  //Payment function
  payment(){
    let formdata = {
      user_id : this.userId,
      txn_id :this.plan_type == 'free' ? '' :  this.payType == 'paypal' ? this.PaymentDetails.purchase_units[0].payments.captures[0].id : '',
      plan_id:this.plan_id,
      plan_type: this.plan_type == 'free' ? '' : this.planType,
      amount: this.plan_type == 'free' ? '0' :this.grandTotal,
      payment_method: this.plan_type == 'free' ? '' : this.payType,
      token:this.plan_type == 'free' ? '' :  this.payType == 'stripe' ? this.PaymentDetails :'',
      status:'COMPLETED'
    }
    console.log(formdata);
    this.spinner.show();
    this.plans.save_payment(formdata).subscribe((data: any) => {
      this.spinner.hide();
      console.log(data);
      if(data.status == 'OK'){
        this.toastr.successToastr('Subscription Plan Upgrade Successfully.', 'Success',
            { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        );
      }
    },(error)=>{
      this.spinner.hide()
      this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
    })
  }


  selectPaymentMehod(type){
    this.spinner.show();
    this.plans.save_payment({'plan_type': type, 'user_id': this.userId}).subscribe((data: any) => {
      this.spinner.hide();
      if(data.status == 'OK'){
        this.userData.plan_type = type;
        localStorage.setItem("loginUser", JSON.stringify(this.userData));
        this.headerService.updateUserPlan(type);
        this.toastr.successToastr('Subscription Plan Upgrade Successfully.', 'Success',
            { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
        );
      }
    },(error)=>{
      this.spinner.hide()
      this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
    })
  }
}