import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
declare var require: any

export interface DialogData {
  images: any;
  index: any
}

@Component({
  selector: 'app-open-image',
  templateUrl: './open-image.component.html',
  styleUrls: ['./open-image.component.css']
})
export class OpenImageComponent implements OnInit {
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;
  images : any = [];
  formGroup: FormGroup;
  bookingForm: FormArray;
  index: number
	defaultImage = require('../../../../assets/chat/image-loader.gif');

  constructor(
    public dialogRef: MatDialogRef<OpenImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,

  ) {
    this.images = data.images
		this.index = data.index;


    this.formGroup = this._formBuilder.group({
			bookingForm: this._formBuilder.array([this._formBuilder.group({
				image: new FormControl(''),
			})])
		})
  }

  
  formData() {
		return (this.formGroup.get('bookingForm') as FormArray).controls;
	}

  ngOnInit() {
    this.bookingForm = this.formGroup.get('bookingForm') as FormArray;
		this.images.forEach(obj => {
			this.bookingForm.push(
				this._formBuilder.group({
					image: new FormControl(obj.src)
				})
			);
		})
    this.bookingForm.removeAt(0);
  }

  dismissModal(){
		this.dialogRef.close();
  }

  back(){
		this.myStepper.previous();
  }

  next(){
		this.myStepper.next();
  }

}
