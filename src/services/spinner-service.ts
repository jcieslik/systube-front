import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  spinnerCount = 0;

  constructor(private spinner: NgxSpinnerService) { }
  
  show() {
    this.spinner.show();
    this.spinnerCount += 1;
  }

  hide() {
    this.spinnerCount -= 1;
    if (this.spinnerCount < 1) {
      this.spinnerCount = 0;
      this.spinner.hide();
    }
  }
}