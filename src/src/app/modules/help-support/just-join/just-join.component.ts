import { Component, OnInit } from '@angular/core';
import { homeService } from '../../../shared/services/home/home.service';
import { MessageService } from '../../../eventservice';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from "ngx-spinner";
import { footerService } from '../../../shared/services/footer/footer.service';





@Component({
  selector: 'app-just-join',
  templateUrl: './just-join.component.html',
  styleUrls: ['./just-join.component.css']
})

export class JustJoinComponent implements OnInit {
  just_join : any = [];
  page_title: any;
  userId: any;
  constructor(
    public homeService: homeService,
    private messageService: MessageService,
    private toastr: ToastrManager,
    private spinner: NgxSpinnerService,
    private footerService: footerService
  ) {
    let currentUesr =  localStorage.getItem("loginUser");
    let userData = JSON.parse(currentUesr);
    this.userId = userData.id
   }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.messageService.login('showHeaderSubscription');
    this.footerService.hidefooter(true);
    this.spinner.show();
    this.homeService.get_help_and_support_data({'user_id':this.userId}).subscribe((data: any) => {
      this.spinner.hide();
      this.just_join = data.data.just_join.data;
      this.page_title = data.data.just_join.page_title;

    }, error => {
        this.spinner.hide();
        console.log(error);
        this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :8000, animate :'slideFromTop',showCloseButton: true
      })
    })
  }
}