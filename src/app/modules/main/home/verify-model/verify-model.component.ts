import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  name: string;
  condition: string;
}

@Component({
  selector: 'app-verify-modal',
  templateUrl: './verify-model.component.html',
  styleUrls: ['./verify-model.component.css']
})

export class VerifyComponent {
  email: any;
  condition: any;
  registerForm: FormGroup;
  submitted = false;
  constructor(
    public dialogRef: MatDialogRef<VerifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder
  ) {
      this.condition = data.condition
      this.email = data.name;
    }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      gender: ['', Validators.required],
      interest: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }


  //Register function
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.dialogRef.close(this.registerForm.value);
  }

  dismissModal(){
    this.dialogRef.close();
  }

}