import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-complete-profile-modal',
  templateUrl: './complete-profile-modal.component.html',
  styleUrls: ['./complete-profile-modal.component.css']
})
export class CompleteProfileModalComponent implements OnInit {
  value1: number = 3;
  options: Options = {
    floor: 1,
    ceil: 5,
    step: 1,
    showTicks: true,
    showSelectionBar: true,
  };
  constructor() { }

  ngOnInit() {
  }

}
