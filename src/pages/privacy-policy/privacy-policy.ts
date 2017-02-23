import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'privacy-policy-page',
  templateUrl: 'privacy-policy.html'
})

export class PrivacyPolicyPage {

  constructor(public view: ViewController) {}

  dismiss() {
    this.view.dismiss();
  }
}
