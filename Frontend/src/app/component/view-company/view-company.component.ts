import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewCompanyService } from './view-company.service';
import { Recruiter } from '../recruiter-profile-completion/recruiter-profile-completion.service';
import { Post } from '../post-page/post-page.service';
import { JobPageService } from '../job-page/job-page.service';
import { JobApplication } from '../job-apply/job-apply.service';
import { PageEvent } from '@angular/material/paginator';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.scss']
})

export class ViewCompanyComponent {

  constructor(
    private route: ActivatedRoute,
    private companyService: ViewCompanyService,
    private router: Router,
    private jobPageService: JobPageService,
    private alertService: AlertService
  ) { }

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

  length = 40;
  pageSize = 3;
  pageIndex = 0;
  pageSizeOptions = [3, 6, 12];
  showFirstLastButtons = true;
  companyApi: Subscription = new Subscription();
  postApi: Subscription = new Subscription();
  updateApi: Subscription = new Subscription();

  handlePageEvent(event: PageEvent): void {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getCompanyPost();
  }

  ngOnInit(): void {

    this.companyApi = this.companyService.getCompany(this.route.snapshot.paramMap.get('id') || '').subscribe({
      next: (response: Recruiter) => {
        this.company = response;
        this.companyRating = response.rating;
        this.getCompanyPost();
      }
    });

  }

  applicationStatus(id: string): boolean {
    return this.myJobPosts.includes(id);
  }

  apply(postId: string): void {
    this.router.navigate(['jobApply', postId]);
  }

  getCompanyPost(): void {

    this.postApi = this.companyService.getCompanyPosts(this.company._id, this.pageIndex, this.pageSize).subscribe({
      next: (posts: { content: Post[], totalElements: number }) => {
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

  setRating(value: number): void {

    if (this.readonly)
      return;
    this.rating = value;

  }

  updateRating(): void {

    this.updateApi = this.companyService.updateCompany(this.company._id, sessionStorage.getItem('email') || '', this.rating).subscribe({
      next: () => {
        this.alertService.alertMessage('Rating submitted', '', 'success')
      }
    })

  }

  ngOnDestroy(): void {
    this.companyApi.unsubscribe();
    this.postApi.unsubscribe();
    this.updateApi.unsubscribe();
  }

}
