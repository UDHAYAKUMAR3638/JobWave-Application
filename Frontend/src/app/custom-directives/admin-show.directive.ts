import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[adminShow]',
  standalone: true
})
export class AdminShowDirective {

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    if (sessionStorage.getItem('role') !== 'ADMIN')
      this.el.nativeElement.hidden = true;
  }

}
