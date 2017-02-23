import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ListingModel } from './listing.model';

@Injectable()
export class ListingService {
  constructor(public http: Http) {}

  getData(): Promise<ListingModel> {
    return this.http.get('./assets/example_data/listing.json')
     .toPromise()
     .then(response => response.json() as ListingModel)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
