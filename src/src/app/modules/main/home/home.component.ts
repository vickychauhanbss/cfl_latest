import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild ,AfterViewInit, Renderer2} from '@angular/core';

//Import libraries
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { trigger, animate, style, transition } from '@angular/animations';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialog } from '@angular/material/dialog';
import { PlatformLocation } from '@angular/common';

//Import services
import { MessageService } from '../../../eventservice';
import { HeaderService } from '../../../shared/services/header/header.service';
import { footerService } from '../../../shared/services/footer/footer.service';
import { homeService } from '../../../shared/services/home/home.service';
import { appConfig } from '../../../shared/services/app.config';

//Import Components
import { StartnowModal } from '../home/start-now-modal/start-now.component';
import { videoComponent } from './video-model/video-model.component';
import { DownloadComponent } from './download-guide/download-guide.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
   trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(2000, style({opacity: 1}))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  @ViewChild('scrollToMe',{static : false}) scrollToMe: ElementRef;

  animal                : string;
  name                  : string;
  homeData              : any;
  ImageUrl              : any;
  firstNamePattern      : any;
  downloadGuideForm     : FormGroup;
  featured1             : any;
  featured2             : any;
  featured3             : any;
  show                  : any;
  instagramCount        : any;
  youtubeSubscriberCount: any;
  videocheck            : any;
  safeSrc               : any;
  youTubeVideo    : any = [];
  instagramArray  : any = []
  panelOpenState  = false;
  submitted       = false;
  showRed         = false;
  showText        = false;
  charLimit       = 200;
  url             : any;

  carouselOptions = {
    margin: 100,
    nav: true,
    autoplay:true,
    autoplayTimeout:4000,
    autoplayHoverPause:true,
    responsiveClass: true,
    responsive: {
      0: {
        items : 1,
        nav   : true,
        loop  : true

      },
      600: {
        items : 1,
        nav   : true,
        loop  : true

      },
      1000: {
        items : 1,
        nav   : true,
        loop  : true
      },
      1500: {
        items : 1,
        nav   : true,
        loop  : true
      }
    }
  }


  constructor(
    public dialog: MatDialog,
    public location: PlatformLocation,
    private headerService : HeaderService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrManager,
    public footerService: footerService,
    public cdRef:ChangeDetectorRef,
    public homeService: homeService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private elementRef:ElementRef,
    private renderer: Renderer2
  ) {
    this.firstNamePattern = "^[a-zA-Z ]{1,24}";
    this.ImageUrl =  appConfig.imagesUrl
    // this.downloadGuideForm = this.formBuilder.group({
    //   name: ['', [Validators.required, Validators.pattern(this.firstNamePattern)]],
    //   email: ['', Validators.required],
    // });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.headerService.loggedIn(false);
    this.footerService.hidefooter(false);
    this.spinner.show();
    if(document.getElementById("toastr-container") != null){
      document.getElementById("toastr-container").style.display = "bloack";
    }

    let currentUesr =  localStorage.getItem("loginUser");
    if(currentUesr){
      var currenSession = JSON.parse(currentUesr)
      console.log(currenSession)
      if(currenSession.onboarding_complete == '1'){
        this.router.navigate(['home/trustplus/ap'])
      }else{
        this.router.navigate(['home/onboarding'])
        this.messageService.login('hideHeaderFooter');
      }
      return false;
    }

    this.homeService.get_home_data().subscribe((data: any) => {
      console.log(data)
      this.spinner.hide();
      this.homeData = data.data;
      this.loadScript();


      if(localStorage.getItem('blog') != null){
        setTimeout(() => {
          this.scrollToMe.nativeElement.scrollIntoView({ behavior: 'smooth' })
          localStorage.removeItem('blog')
        }, 1000)
      }
    }, error => {
        this.spinner.hide();
        console.log(error);
    })


    setTimeout(() => {
      if(this.route.snapshot.paramMap.get('isOtherPage')){
        if(this.route.snapshot.paramMap.get('isOtherPage') =='Community'){
          let el = document.getElementById('community');
          el.scrollIntoView({behavior:"smooth"});

        }else{
          let el = document.getElementById('about');
          el.scrollIntoView({behavior:"smooth"});

        }
      }
      this.router.navigate(['home', {}]);
    }, 600)

  }

  loadScript() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://app.kartra.com/optin/XRbqkfp9QA9c";
    this.elementRef.nativeElement.appendChild(s);
  }

  get f() { return this.downloadGuideForm.controls; }

  openStartNowModal(): void {
    const dialogRef = this.dialog.open(StartnowModal, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  videoModal(): void {

    let audioPlayer = <HTMLVideoElement>document.getElementById('homeVideo');
    audioPlayer.pause()
    const dialogRef = this.dialog.open(videoComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     audioPlayer.play();
    });
  }

  showexpend(){
    this.showRed  = this.showRed == false ? true : false
  }


  downloadGuide(file): void {
    const dialogRef = this.dialog.open(DownloadComponent, {
      data: {file: file}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  //subscribe function
  onSubmit(formDirective: FormGroupDirective) {
    console.log(formDirective)

    this.submitted = true;
    console.log(this.downloadGuideForm.value);

    // stop here if form is invalid
    if (this.downloadGuideForm.invalid) {
        return;
    }

    //display form values on success
    this.spinner.show();
    this.homeService.download_guide(this.downloadGuideForm.value).subscribe((data: any) => {
      this.spinner.hide();
      console.log(data.file);
      this.submitted = false;
      this.downloadGuideForm.reset();
      this.downloadGuide(data.file);

    }, error => {
      this.spinner.hide();
      this.toastr.errorToastr(error.error, 'Oops!');
    })
  }

  showDiv(){
    let limit = this.charLimit == 200 ? 1000 : 200;
    this.charLimit = limit;
  }

  goToDetailPage(blog){
    console.log(blog);
    localStorage.setItem('blog' , 'true')
    this.router.navigate(['home/crazyDetail', {'id':blog.id}]);
  }
  goToLink(link){
    window.open(link);
  }

}
