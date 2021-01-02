import { Component, Inject, ElementRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { userService } from '../../../shared/services/user/user.service';
//Import Api loader
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrManager } from 'ng6-toastr-notifications';
import { ConfirmationComponent } from '../../main/home/confirmation-model/confirmation-model.component';
import { CropbannerComponent } from '../crop-banner/crop-banner.component';
import { showMessageComponent } from '../show-message/show-message.component';
import { HeaderService } from '../../../shared/services/header/header.service';


export interface DialogData {
  image: any;
}

@Component({
  selector: 'app-cover-banner-modal',
  templateUrl: './cover-banner-modal.component.html',
  styleUrls: ['./cover-banner-modal.component.css']
})

export class coverBannerComponent {
  @ViewChild('filesc', {static: false}) myInputVariable: ElementRef;
  coverImage: File = null;
  showCoverImage: any;
  userId: any;
  showError: any;
  coverBanner:any = [];
  private subscription;

  constructor(
    public dialogRef: MatDialogRef<coverBannerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private userService: userService,
    private toastr :ToastrManager,
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
    // this.spinner.show();
    this.userService.get_user_banner({'user_id': this.userId}).subscribe((data: any) => {
      this.spinner.hide();
      if(data.status == 'OK'){
        this.coverBanner = data.records
      }
    }, error => {
      console.log(error);
      this.spinner.hide();
      //this.toastr.errorToastr(error.error, 'Oops!');
    })
  }


  chooseCoverImages(fileInput: any){
    this.coverImage = <File>fileInput.target.files[0];
    this.spinner.show();
    var mimeType = this.coverImage.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var  reader = new FileReader();
    if (fileInput.target.files && fileInput.target.files.length > 0) {
      let file = fileInput.target.files[0];
      let img = new Image();
      img.src = window.URL.createObjectURL( file );
      reader.readAsDataURL(file);
      reader.onload = () => {
        setTimeout(() => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;

          window.URL.revokeObjectURL( img.src );
          if ( width < 1350 && height < 650 ) {
            this.spinner.hide();
            this.showError = "Banner dimension should be greater than or equal to 1350X650"
            // this.toastr.errorToastr("Image dimension should be greater than or equal to 1500X233", "Oops", {
            //   showCloseButton: true,
            //   animate: "slideFromRight"
            // });
            this.myInputVariable.nativeElement.value = "";
          } else {
            this.spinner.hide();
            const dialogRef = this.dialog.open(CropbannerComponent, {
              data: {image: fileInput, string:'banner', 'width': width , 'height': height }
            });
            dialogRef.afterClosed().subscribe(result => {
              if(result){
                const formData = new FormData();
                formData.append('image', result);
                formData.append('type', 'banner_img');
                formData.append('user_id', this.userId);

                this.spinner.show();
                this.userService.change_gallery(formData).subscribe((data: any) => {
                  this.myInputVariable.nativeElement.value = "";
                  this.spinner.hide();
                  if(data.status == "OK"){
                  this.showPopup('banner')

                    // this.dismissModal(data.url)
                    // this.dismissModal('')

                  }
                }, error => {
                  console.log(error);
                  this.spinner.hide();
                  this.toastr.errorToastr(error.error, 'Oops!',   {
                    position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
                  });
                })
              }
            });
          }
        }, 1500);
      };
    }
  }

  showPopup(text){
    this.dismissModal('')
    const dialogRef = this.dialog.open(showMessageComponent, {
      data: {condition: text}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }


  dismissModal(image){
    this.dialogRef.close(image);
  }

  activeBanner(image){
    let default_id = image.default_id != null ? image.default_id : null;
    let id = image.id != null ? image.id : null;
    this.spinner.show();
    this.userService.active_banner({'user_id': this.userId, 'type': 'banner_img', 'default_id': default_id, 'id': id}).subscribe((data: any) => {
      console.log(data);
      this.spinner.hide();
      this.toastr.successToastr('Banner activated successfully.', 'Success',
          { enableHTML: true , toastTimeout :3000, position: 'top-full-width', animate :'slideFromTop', showCloseButton: true}
      );
      this.dismissModal(image.path)
    }, error => {
      console.log(error);
      this.spinner.hide();
      this.toastr.errorToastr(error.error, 'Oops!',   {
        position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
      });
    })
  }

  deleteImage(index, item ,string){
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {name: 'deleteImage', string :string}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'delete'){
        this.spinner.show();
        this.userService.delete_image_video({'id':item.id , 'user_id':this.userId, 'type':'image'}).subscribe((data: any) => {
          this.spinner.hide();
          if(data.status == 'OK'){
           this.coverBanner.splice(index , 1);
          }
        }, error => {
          console.log(error);
          this.spinner.hide();
          this.toastr.errorToastr(error.error, 'Oops!',   {
            position: 'top-full-width',toastTimeout :3000, animate :'slideFromTop',showCloseButton: true
          });
        })
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

