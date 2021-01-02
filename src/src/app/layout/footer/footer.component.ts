import { Component, OnInit, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

//Import Libraries
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';

//Import Services
import { footerService } from '../../shared/services/footer/footer.service';
import { homeService } from '../../shared/services/home/home.service';
import { Location } from "@angular/common";

//Import Components
import { SubscribeComponent } from '../../modules/main/home/subscribe-modal/subscribe-modal.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  animal: string;
  name: string;
  hideFooter: any;
  homeData: any;
  private subscription;

  constructor(
    public dialog: MatDialog,
    private footerService: footerService,
    private homeService: homeService,
    private spinner: NgxSpinnerService,
    private router:Router,
    private _location : Location,
    private elementRef:ElementRef,
    private renderer: Renderer2


  ) {
    this.subscription = this.footerService.hideFooter.subscribe((msg)=>{
      console.log(msg);
      this.hideFooter =  msg;
      console.log(this.hideFooter);
      if(this.hideFooter == false && this._location.path() == '/home'){
          this.loadScript()
      }
    })
  }

  ngOnInit() {
    console.log(this._location.path());
    this.homeService.get_home_data().subscribe((data: any) => {
      this.spinner.hide();
      this.homeData = data.data;
        this.loadScript()
    }, error => {
        this.spinner.hide();
        console.log(error);
    })
  }


  loadScript() {
    if(this.hideFooter == false && this._location.path() == '/home'){
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = "https://app.kartra.com/optin/8vUADaTRxNrK";
      this.elementRef.nativeElement.appendChild(s);
    }
  }

  scroll(string){
    if(string == 'about'){
      let el = document.getElementById('about');
      if(el){
        el.scrollIntoView({behavior:"smooth"});
      }else{
        this.router.navigate(['home', {'isOtherPage': string }])
      }
    }else{
      let el = document.getElementById('community');
      if(el){
        el.scrollIntoView({behavior:"smooth"});
      }else{
        this.router.navigate(['home', {'isOtherPage': string }])
      }
    }
  }

  subscribe_modal(): void {
    const dialogRef = this.dialog.open(SubscribeComponent, {
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  redirectPage(string){
    this.router.navigate([string])
  }


  ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}