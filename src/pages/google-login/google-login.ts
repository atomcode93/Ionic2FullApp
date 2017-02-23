import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { GoogleUserModel } from './google-user.model';
import { GoogleLoginService } from './google-login.service';

@Component({
  selector: 'google-login-page',
  templateUrl: 'google-login.html'
})
export class GoogleLoginPage {
  user: GoogleUserModel = new GoogleUserModel();
  loading: any;

  constructor(
    public navCtrl: NavController,
    public googleLoginService: GoogleLoginService,
    public loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad(){
    this.loading.present();
    let env = this;

    this.googleLoginService.getGoogleUser()
    .then(function(user){
      env.user = user;
      env.loading.dismiss();
    }, function(error){
      console.log(error);
      env.loading.dismiss();
    });
  }

  doGoogleLogout(){
    let env = this;

    this.googleLoginService.doGoogleLogout()
    .then(function(res) {
      env.user = new GoogleUserModel();
    }, function(error){
      console.log("Google logout error", error);
    });
  }

  doGoogleLogin() {
    let env = this;

    this.googleLoginService.doGoogleLogin()
    .then(function(user){
      env.user = user;
    }, function(err){
      console.log("Google Login error", err);
    });
  }
}
