import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { NotificationsModel } from './notifications.model';

@Injectable()
export class NotificationsService {
  constructor(public http: Http) {}

  getData(): Promise<NotificationsModel> {
    return this.http.get('./assets/example_data/notifications.json')
     .toPromise()
     .then(response => response.json() as NotificationsModel)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
