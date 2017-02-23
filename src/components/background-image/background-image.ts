import { Component, Input, ElementRef, Renderer, OnChanges, SimpleChange } from '@angular/core';

import { isPresent } from 'ionic-angular/util/util';

@Component({
  selector: 'background-image',
  templateUrl: 'background-image.html'
})
export class BackgroundImage implements OnChanges {
	_src: string = '';

	constructor(public _elementRef: ElementRef, public _renderer: Renderer) {}

  @Input() class: string;

	@Input() set src(val: string) {
    this._src = isPresent(val) ? val : '';
  }

	ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    this._update();
    // console.log("CHANGES background-image", this._src);
    // console.log(changes['src'].isFirstChange());
  }

	_update() {
		let img = new Image();

	  img.addEventListener('load', () => {
      this._elementRef.nativeElement.style.backgroundImage = 'url(' + this._src + ')';
			this._loaded(true);
	  });

	  img.src = this._src;

	  this._loaded(false);
	}

	_loaded(isLoaded: boolean) {
    this._elementRef.nativeElement.classList[isLoaded ? 'add' : 'remove']('img-loaded');
  }
}
