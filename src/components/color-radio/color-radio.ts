import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({
  selector: '[color-radio]'
})
export class ColorRadio
{
  @Input('color-radio') color: string;

  constructor(public el: ElementRef, public renderer: Renderer) { }

  setColor(color: string) {
    this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
    this.renderer.setElementStyle(this.el.nativeElement, 'borderColor', color);
  }

  ngOnInit() {
    console.log(this.color);
    this.setColor(this.color);
  }
}
