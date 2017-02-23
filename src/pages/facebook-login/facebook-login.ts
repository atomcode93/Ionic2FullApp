import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { FacebookUserModel } from './facebook-user.model';
import { FacebookLoginService } from './facebook-login.service';

@Component({
  selector: 'facebook-login-page',
  templateUrl: 'facebook-login.html'
})
export class FacebookLoginPage {
  user: FacebookUserModel = new FacebookUserModel();
  loading: any;

  constructor(
    public nav: NavController,
    public facebookLoginService: FacebookLoginService,
    public loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad(){
    this.loading.present();
    let env = this;

    this.facebookLoginService.getFacebookUser()
    .then(function(user){
      env.user = user;
      env.loading.dismiss();
    }, function(error){
      console.log(error);
      env.loading.dismiss();
    });
  }

  doFacebookLogout(){
    let env = this;

    this.facebookLoginService.doFacebookLogout()
    .then(function(res) {
      env.user = new FacebookUserModel();
    }, function(error){
      console.log("Facebook logout error", error);
    });
  }

  doFacebookLogin() {
    let env = this;

    this.facebookLoginService.doFacebookLogin()
    .then(function(user){
      env.user = user;
    }, function(err){
      console.log("Facebook Login error", err);
    });
  }
}
