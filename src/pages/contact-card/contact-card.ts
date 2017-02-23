import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CallNumber, SocialSharing, InAppBrowser } from 'ionic-native';

import { ContactModel } from './contact.model';

@Component({
  selector: 'contact-card-page',
  templateUrl: 'contact-card.html'
})
export class ContactCardPage {
  contact: ContactModel = new ContactModel();

  constructor(
    public navCtrl: NavController
  ) {
  }

  call(number: string){
    CallNumber.callNumber(number, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }

  sendMail(email: string){
    SocialSharing.canShareViaEmail().then(() => {
      SocialSharing.shareViaEmail("Hello, I'm trying this fantastic app that will save me hours of development.", "This app is the best!", [email]).then(() => {
        console.log('Success!');
      }).catch(() => {
        console.log('Error');
      });
    }).catch(() => {
       console.log('Sharing via email is not possible');
    });
  }

  openInAppBrowser(website: string){
    new InAppBrowser(website, '_blank', "location=yes");
  }

}
