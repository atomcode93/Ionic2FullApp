import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { List2Model } from './list-2.model';

@Injectable()
export class List2Service {
  constructor(public http: Http) {}

  getData(): Promise<List2Model> {
    return this.http.get('./assets/example_data/lists.json')
     .toPromise()
     .then(response => response.json() as List2Model)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
