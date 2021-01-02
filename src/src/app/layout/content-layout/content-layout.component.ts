import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay'; 
import { Subscription } from 'rxjs';
import { MessageService } from '../../eventservice';
import { Router } from "@angular/router";

import { HeaderService } from '../../shared/services/header/header.service';
import { footerService } from '../../shared/services/footer/footer.service';



@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {
  private overlayContainer: OverlayContainer;
  public theme = 'my-light-theme';
  public visible : boolean = true;
  public hideFooter : boolean = false;
  message: any;
  subscription: Subscription;
  constructor(private messageService: MessageService, private router: Router, public headerService : HeaderService,  private cd: ChangeDetectorRef, private footerService: footerService) {
    // subscribe to home component messages
    // this.subscription = this.messageService.login.subscribe(message => { this.message = message; });
    // console.log(this.subscription)

    this.messageService.change.subscribe((msg)=>{
      if(msg == 'hideHeaderFooter'){
        this.visible = false;
        this.cd.detectChanges();
      }else if(msg =='showHeaderSubscription'){
        this.visible = true;
        this.cd.detectChanges();
        this.headerService.loggedIn(true);
      }else{
        this.visible = true;
        this.cd.detectChanges();
      }
    })
}

// ngOnDestroy() {
//     // unsubscribe to ensure no memory leaks
//     this.subscription.unsubscribe();
// }

  ngOnInit() {
    if(this.router.url == '/home/onboarding'){
      this.visible = false;
    }

    if (this.overlayContainer) {
      this.overlayContainer.getContainerElement().classList.add(this.theme);
    }
  }
}
