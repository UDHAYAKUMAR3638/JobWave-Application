import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewCompanyService } from './view-company.service';
import { Recruiter } from '../recruiter-profile-completion/recruiter-profile-completion.service';
import { Post } from '../post-page/post-page.service';
import { List } from 'lodash';
import { JobPageService } from '../job-page/job-page.service';
import { JobApplication } from '../job-apply/job-apply.service';
import { PageEvent } from '@angular/material/paginator';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.scss']
})
export class ViewCompanyComponent {

  readonly = false;
  faStar = faStar;
  rating: number = 0;
  companyRating: number = 0;
  companyPosts!: Array<Post>;
  myJobPosts: Array<string> = [];
  disabled: boolean = false;
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
    about: '',
    rating: 0
  }

  constructor(
    private route: ActivatedRoute,
    private companyService: ViewCompanyService,
    private router: Router,
    private jobPageService: JobPageService
  ) { }

  length = 40;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getCompanyPost();
  }

  ngOnInit() {
    this.companyService.getCompany(this.route.snapshot.paramMap.get('id') || '').subscribe({
      next: (response: Recruiter) => {
        this.company = response;
        this.companyRating = response.rating;
        this.getCompanyPost();
      }
    });
  }

  applicationStatus(id: string): any {
    return this.myJobPosts.includes(id);
  }

  apply(postId: string) {
    this.router.navigate(['jobApply', postId]);
  }

  getCompanyPost() {
    this.companyService.getCompanyPosts(this.company._id, this.pageIndex, this.pageSize).subscribe({
      next: (posts: { content: Post[]; totalElements: number; }) => {
        this.companyPosts = posts.content;
        this.length = posts.totalElements;

        this.jobPageService.getMyJobs().subscribe({
          next: (data: JobApplication[]) => {
            data.forEach((element: JobApplication) => {
              this.myJobPosts.push(element.postId._id);
            });
          }
        });
      }
    });
  }

  setRating(value: number) {
    if (this.readonly) return;
    this.rating = value;
  }

  updateRating() {
    this.companyService.updateCompany(this.company._id, sessionStorage.getItem('email') || '', this.rating).subscribe({
      next: () => {
        Swal.fire({
          title: 'Review submitted',
          icon: 'success',
        });
      }
    })
  }

}
