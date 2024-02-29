import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[jobseekerShow]',
  standalone: true
})
export class JobseekerShowDirective {

  constructor(private el: ElementRef) {
  }
  ngOnInit() {
    if (!(sessionStorage.getItem('role') === "JOBSEEKER"))
      this.el.nativeElement.hidden = true;
  }

}
