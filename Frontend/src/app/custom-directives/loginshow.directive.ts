import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appLoginShow]'
})
export class LoginShowDirective {

    constructor(private el: ElementRef) {
    }
    ngOnInit() {
        if (!sessionStorage.getItem('isLogged'))
            this.el.nativeElement.hidden = true;
    }



}
