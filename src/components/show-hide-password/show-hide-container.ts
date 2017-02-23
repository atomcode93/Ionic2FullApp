import { Component, ContentChild } from '@angular/core';
import { ShowHideInput } from './show-hide-input'

@Component({
  selector: 'show-hide-container',
  templateUrl: 'show-hide-password.html',
  host: {
    'class': 'show-hide-password'
  }
})
export class ShowHideContainer
{
  show = false;

  @ContentChild(ShowHideInput) input: ShowHideInput;

  constructor(){}

  toggleShow()
  {
    this.show = !this.show;
    if (this.show){
      this.input.changeType("text");
    }
    else {
      this.input.changeType("password");
    }
  }
}
