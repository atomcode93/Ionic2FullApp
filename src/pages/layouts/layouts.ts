import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SchedulePage } from '../schedule/schedule';
import { List1Page } from '../list-1/list-1';
import { List2Page } from '../list-2/list-2';
import { GridPage } from '../grid/grid';
import { NotificationsPage } from '../notifications/notifications';
import { ProfilePage } from '../profile/profile';


@Component({
  selector: 'layouts-page',
  templateUrl: 'layouts.html'
})
export class LayoutsPage {
  items: Array<{title: string, note?: string, component: any}>;

  constructor(public nav: NavController) {
    this.items = [
      { title: 'Schedule', component: SchedulePage },
      { title: 'Lists', note: '(Big)', component: List1Page },
      { title: 'Lists', note: '(Mini)', component: List2Page },
      { title: 'Grid', component: GridPage },
      { title: 'Notifications', component: NotificationsPage },
      { title: 'Profile', component: ProfilePage }
    ];
  }

  itemTapped(event, item) {
    this.nav.push(item.component);
  }
}
