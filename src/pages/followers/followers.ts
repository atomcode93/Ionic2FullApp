import { Component } from '@angular/core';
import { MenuController, NavParams } from 'ionic-angular';
import { UserModel } from '../profile/profile.model';

@Component({
  selector: 'followers-page',
  templateUrl: 'followers.html'
})
export class FollowersPage {
  list: Array<UserModel> = [];

  constructor(public menu: MenuController, public navParams: NavParams)
  {
    this.list = navParams.get('list');
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on this page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
