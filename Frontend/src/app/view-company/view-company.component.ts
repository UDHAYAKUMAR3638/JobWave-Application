import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewCompanyService } from './view-company.service';
import { Recruiter } from '../recruiter-profile-completion/recruiter-profile-completion.service';
import { Post } from '../post-page/post-page.service';
import { List } from 'lodash';
import { JobPageService } from '../job-page/job-page.service';
import { JobApplication } from '../job-apply/job-apply.service';

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
    about: ''
  }

  companyPosts!: Array<Post>;
  myJobPosts: Array<string> = [];
  disabled: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private companyService: ViewCompanyService,
    private router: Router,
    private jobPageService: JobPageService
  ) { }

  ngOnInit() {
    this.companyService.getCompany(this.route.snapshot.paramMap.get('id') || '').subscribe({
      next: (response) => {
        this.company = response;
        this.companyService.getCompanyPosts(this.company._id).subscribe({
          next: (posts) => {
            this.companyPosts = posts;
            this.jobPageService.getMyJobs().subscribe({
              next: (data) => {
                data.forEach((element: Recruiter) => {
                  this.myJobPosts.push(element._id);
                });
              }
            });
          }
        });
      }
    });
  }

  applicationStatus(id: string): any {
    return this.myJobPosts.includes(id);
  }

  apply(postId: string) {
    this.router.navigate(['jobApply', postId]);
  }

}
