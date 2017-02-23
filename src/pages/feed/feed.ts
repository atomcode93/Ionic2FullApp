import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import 'rxjs/Rx';

import { FeedModel } from './feed.model';
import { FeedService } from './feed.service';
import { SocialSharing } from 'ionic-native';

@Component({
  selector: 'feed-page',
  templateUrl: 'feed.html'
})
export class FeedPage {
  feed: FeedModel = new FeedModel();
  loading: any;

  constructor(
    public nav: NavController,
    public feedService: FeedService,
    public navParams: NavParams,
    public loadingCtrl: LoadingController
  ) {
    this.feed.category = navParams.get('category');

    this.loading = this.loadingCtrl.create();
  }


  ionViewDidLoad() {
    this.loading.present();
    this.feedService
      .getPosts()
      .then(posts => {
        this.feed.posts = posts;
        this.loading.dismiss();
      });
  }

  goToProfile(event, item) {
    this.nav.push(ProfilePage, {
      user: item
    });
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  sharePost(post) {
   //this code is to use the social sharing plugin
   // message, subject, file, url
   SocialSharing.share(post.description, post.title, post.image)
   .then(() => {
     console.log('Success!');
   })
   .catch(() => {
      console.log('Error');
   });
 }
}
