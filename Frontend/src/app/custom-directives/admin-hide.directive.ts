import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[adminHide]',
  standalone: true
})
export class AdminHideDirective {

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    if (sessionStorage.getItem('role') === 'ADMIN')
      this.el.nativeElement.hidden = true;
  }
}
