import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'terms-of-service-page',
  templateUrl: 'terms-of-service.html'
})

export class TermsOfServicePage {

  constructor(public view: ViewController) {}

  dismiss() {
    this.view.dismiss();
  }
}
