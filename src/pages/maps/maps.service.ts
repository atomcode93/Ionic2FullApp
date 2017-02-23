import { Injectable, NgZone } from "@angular/core";

import { Observable } from 'rxjs/Observable';

@Injectable()
export class GoogleMapsService {

  _AutocompleteService: google.maps.places.AutocompleteService;
  _Geocoder: google.maps.Geocoder;
  _PlacesService: google.maps.places.PlacesService;
  // Source:
  //    - https://developers.google.com/maps/documentation/javascript/directions
  //    - https://developers.google.com/maps/documentation/javascript/examples/directions-simple
  _DirectionsService: google.maps.DirectionsService;
  //  Source
  //    - https://developers.google.com/maps/documentation/javascript/examples/distance-matrix
  _DistanceMatrixService: google.maps.DistanceMatrixService;

  // There are some issues with async observers (https://gist.github.com/endash/1f961830d0c5b744598a)
  //    - That's why we need to use ngZones
  // Here's another post explaining the issue (http://stackoverflow.com/a/38100262/1116959)
  //    - Seems that google.maps API is not patched by Angular's zone
  constructor(public zone: NgZone) {
    this._AutocompleteService = new google.maps.places.AutocompleteService();
    this._Geocoder = new google.maps.Geocoder;
    // As we are already using a map, we don't need to pass the map element to the PlacesServices (https://groups.google.com/forum/#!topic/google-maps-js-api-v3/QJ67k-ATuFg)
    this._PlacesService = new google.maps.places.PlacesService(document.createElement("div"));
    this._DirectionsService = new google.maps.DirectionsService;
    this._DistanceMatrixService = new google.maps.DistanceMatrixService;
  }

  // Caveat:  As we are using Observable.create don't forget a well-formed finite Observable must attempt to call
  //          either the observer’s onCompleted method exactly once or its onError method exactly once, and must not
  //          thereafter attempt to call any of the observer’s other methods.
  //    - http://reactivex.io/documentation/operators/create.html
  //    - http://stackoverflow.com/a/38376519/1116959

  // https://developers.google.com/maps/documentation/javascript/reference#AutocompletePrediction
  getPlacePredictions(query: string) : Observable<Array<google.maps.places.AutocompletePrediction>> {
    return Observable.create((observer) => {
      this._AutocompleteService.getPlacePredictions({ input: query }, (places_predictions, status) => {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          this.zone.run(() => {
            observer.next([]);
            observer.complete();
          });
        }
        else
        {
          this.zone.run(() => {
            observer.next(places_predictions);
            observer.complete();
          });
        }
      });
    });
  }

  geocodePlace(placeId: string) : Observable<google.maps.LatLng> {
    return Observable.create((observer) => {
      this._Geocoder.geocode({'placeId': placeId}, (results, status) => {
        if(status.toString() === 'OK'){
          if(results[0]){
            this.zone.run(() => {
              observer.next(results[0].geometry.location);
              observer.complete();
            });
  				}
  				else {
            this.zone.run(() => {
              observer.error(new Error("no results"));
            });
  				}
  			}
  			else {
          this.zone.run(() => {
            observer.error(new Error("error"));
          });
  			}
  		});
    });
  }

  // https://developers.google.com/maps/documentation/javascript/reference#PlaceResult
  getPlacesNearby(location: google.maps.LatLng) : Observable<Array<google.maps.places.PlaceResult>> {
    return Observable.create((observer) => {
      this._PlacesService.nearbySearch({
  	    location: location,
        radius: 500,
        types: ['restaurant']
  	  }, (results, status) => {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          this.zone.run(() => {
            observer.next([]);
            observer.complete();
          });
  		  }
  			else {
          this.zone.run(() => {
            observer.next(results);
            observer.complete();
          });
  			}
  		});
    });
  }

  // https://developers.google.com/maps/documentation/javascript/reference#DirectionsResult
  getDirections(origin: google.maps.LatLng, destination: google.maps.LatLng) : Observable<google.maps.DirectionsResult> {
    let _origin: google.maps.Place = {
          location: origin
        },
        _destination: google.maps.Place = {
          location: destination
        },
        route_query: google.maps.DirectionsRequest = {
          origin: _origin,
          destination: _destination,
          travelMode: google.maps.TravelMode.WALKING
        };

    return Observable.create((observer) => {
      this._DirectionsService.route(route_query, (route, status) => {
        if (status.toString() === 'OK') {
          this.zone.run(() => {
            // Yield a single value and complete
            observer.next(route);
            observer.complete();
          });
        } else {
          this.zone.run(() => {
            observer.error(new Error("error due to " + status));
          });
        }
      });
    });
  }

  getDistanceMatrix(origin: google.maps.LatLng, destination: google.maps.LatLng) : Observable<google.maps.DistanceMatrixResponse> {
    let _origin: google.maps.Place = {
          location: origin
        },
        _destination: google.maps.Place = {
          location: destination
        },
        distance_query: google.maps.DistanceMatrixRequest = {
          origins: [_origin],
          destinations: [_destination],
          travelMode: google.maps.TravelMode.WALKING,
          unitSystem: google.maps.UnitSystem.METRIC
        };

    return Observable.create((observer) => {
      this._DistanceMatrixService.getDistanceMatrix(distance_query, (distance, status) => {
        if (status.toString() === 'OK') {
          this.zone.run(() => {
            // Yield a single value and complete
            observer.next(distance);
            observer.complete();
          });
        } else {
          this.zone.run(() => {
            observer.error(new Error("error due to " + status));
          });
        }
      });
    });
  }
}
