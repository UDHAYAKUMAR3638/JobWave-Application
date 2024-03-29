import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appLoginHide]',
  standalone: true
})
export class LoginHideDirective {

  constructor(private el: ElementRef) {
  }
  ngOnInit() {
    if (sessionStorage.getItem('isLogged'))
      this.el.nativeElement.hidden = true;
  }



}
