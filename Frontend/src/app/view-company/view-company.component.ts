import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewCompanyService } from './view-company.service';
import { Recruiter } from '../recruiter-profile-completion/recruiter-profile-completion.service';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.scss']
})
export class ViewCompanyComponent {

  company: Recruiter = {
    _id: '',
    name: '',
    companyName: '',
    empCount: 0,
    companyType: '',
    email: '',
    phoneno: '',
    password: '',
    location: '',
    image: '',
  }

  constructor(
    private route: ActivatedRoute,
    private companyService: ViewCompanyService
  ) { }

  ngOnInit() {
    this.companyService.getCompany(this.route.snapshot.paramMap.get('id') || '').subscribe({
      next: (response) => {
        this.company = response;
      }
    })

  }

}
