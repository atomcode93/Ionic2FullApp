import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { ScheduleModel } from './schedule.model';

@Injectable()
export class ScheduleService {
  constructor(public http: Http) {}

  getData(): Promise<ScheduleModel> {
    return this.http.get('./assets/example_data/schedule.json')
     .toPromise()
     .then(response => response.json() as ScheduleModel)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
