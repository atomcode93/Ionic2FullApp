import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { List1Model } from './list-1.model';

@Injectable()
export class List1Service {
  constructor(public http: Http) {}

  getData(): Promise<List1Model> {
    return this.http.get('./assets/example_data/lists.json')
     .toPromise()
     .then(response => response.json() as List1Model)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
