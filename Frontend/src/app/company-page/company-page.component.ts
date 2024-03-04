import { Component } from '@angular/core';
import { CompanyPageService } from './company-page.service';
import { List } from 'lodash';
import { Recruiter } from '../recruiter-profile-completion/recruiter-profile-completion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})
export class CompanyPageComponent {

  companies!: Array<Recruiter>;
  constructor(private companyService: CompanyPageService, private router: Router) { }

  ngOnInit() {
    this.companyService.getCompany().subscribe({
      next: (response: any) => {
        this.companies = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  redirect(id: string) {
    this.router.navigate(['viewCompany', id]);
  }

}
