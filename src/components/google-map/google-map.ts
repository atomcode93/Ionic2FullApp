import { Component, Input, ElementRef, OnInit, EventEmitter } from '@angular/core';

import { isPresent } from 'ionic-angular/util/util';

@Component({
  selector: 'google-map',
  template: ''
})
export class GoogleMap implements OnInit{

  public _el: HTMLElement;
  public _map: google.maps.Map;
  public _mapOptions: google.maps.MapOptions = {
    zoom: 15
  };
  public $mapReady: EventEmitter<any> = new EventEmitter();
  public _mapIdledOnce: boolean = false;

  @Input() set options(val: google.maps.MapOptions) {
    if(isPresent(val))
    {
      this._mapOptions =  val;
    }
  }

  constructor(public _elementRef: ElementRef) {

  }

  ngOnInit() {
    this.initMap();
  }

  initMap(): void {
    this._el = this._elementRef.nativeElement;
    this._map = new google.maps.Map(this._el, this._mapOptions);

    // Workarround for init method: try to catch the first idel event after the map cretion (this._mapIdledOnce). The following idle events don't matter.
    let _ready_listener = this._map.addListener('idle', () => {
      console.log("mapReady - IDLE");
      if (!this._mapIdledOnce) {
        this.$mapReady.emit(this._map);
        this._mapIdledOnce = true;
        // Stop listening to event, the map is ready
        google.maps.event.removeListener(_ready_listener);
      }
    });
  }
}
