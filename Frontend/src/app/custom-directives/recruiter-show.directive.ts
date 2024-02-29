import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[recruiterShow]',
  standalone: true
})
export class RecruiterShowDirective {

  constructor(private el: ElementRef) {
  }
  ngOnInit() {
    if (!(sessionStorage.getItem('role') === "RECRUITER"))
      this.el.nativeElement.hidden = true;
  }
}
