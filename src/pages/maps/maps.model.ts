export class MapsModel {
  map: google.maps.Map;
	map_options: google.maps.MapOptions = {
    center: {lat: 40.785091, lng: -73.968285},
    zoom: 13,
    disableDefaultUI: true
  };

	map_places: Array<MapPlace> = [];

	search_query: string = '';
	search_places_predictions: Array<google.maps.places.AutocompletePrediction> = [];

	nearby_places: Array<MapPlace> = [];

	directions_origin: MapPlace = new MapPlace();
	directions_display: google.maps.DirectionsRenderer;

	using_geolocation: boolean = false;

	// https://developers.google.com/maps/documentation/javascript/reference#Map
	init(map: google.maps.Map) {
		this.map = map;
		// https://developers.google.com/maps/documentation/javascript/reference#DirectionsRenderer
		this.directions_display = new google.maps.DirectionsRenderer({
			map: this.map,
			suppressMarkers: true,
			preserveViewport: true
		});
	}

	cleanMap() {
		// Empty nearby places array
		this.nearby_places = [];

		// To clear previous directions
		this.directions_display.setDirections({routes: []});

		// To remove all previous markers from the map
		this.map_places.forEach((place) => {
      place.marker.setMap(null);
    });

		// Empty markers array
		this.map_places = [];

		this.using_geolocation = false;
	}

	addPlaceToMap(location: google.maps.LatLng, color: string = '#333333') : MapPlace {
		let _map_place = new MapPlace();

		_map_place.location = location;
		_map_place.marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: MapPlace.createIcon(color)
    });

		this.map_places.push(_map_place);

		return _map_place;
	}

	addNearbyPlace(place_result: google.maps.places.PlaceResult) {
		let _map_place = this.addPlaceToMap(place_result.geometry.location, '#666666');

		// This is an extra attribute for nearby places only
		_map_place.details = place_result;
    let getRandom = (min:number, max:number) : number => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    // Add a random image
		_map_place.details["image"] = "./assets/images/maps/place-"+getRandom(1, 9)+".jpg";

		this.nearby_places.push(_map_place);
	}

	deselectPlaces() {
		this.nearby_places.forEach((place) => {
      place.deselect();
    });
	}
}

export class MapPlace {
	marker: google.maps.Marker;
	location: google.maps.LatLng;
	selected: boolean = false;
	// This is an extra attribute for nearby places only
	details: google.maps.places.PlaceResult;

	// https://developers.google.com/maps/documentation/javascript/reference#Symbol
	static createIcon(color: string) : google.maps.Symbol {
    let _icon: google.maps.Symbol = {
      path: "M144 400c80 0 144 -60 144 -134c0 -104 -144 -282 -144 -282s-144 178 -144 282c0 74 64 134 144 134zM144 209c26 0 47 21 47 47s-21 47 -47 47s-47 -21 -47 -47s21 -47 47 -47z",
      fillColor: color,
      fillOpacity: .6,
      anchor: new google.maps.Point(0,0),
      strokeWeight: 0,
      scale: 0.08,
      rotation: 180
    }
    return _icon;
  }

	setIcon(color: string) : void {
		this.marker.setIcon(MapPlace.createIcon(color));
	}

	deselect() {
		this.selected = false;
    this.setIcon('#666666');
	}

	select() {
		this.selected = true;
    this.setIcon('#ae75e7');
	}
}
