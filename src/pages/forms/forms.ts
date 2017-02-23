import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormLayoutPage } from '../form-layout/form-layout';
import { FiltersPage } from '../filters/filters';

@Component({
  selector: 'forms-page',
  templateUrl: 'forms.html'
})
export class FormsPage {
  items: Array<{title: string, note?: string, component: any}>;

  constructor(public nav: NavController) {
    this.items = [
      { title: 'Forms Examples', component: FormLayoutPage },
      { title: 'Filters', component: FiltersPage }
    ];
  }

  itemTapped(event, item) {
    this.nav.push(item.component);
  }
}
