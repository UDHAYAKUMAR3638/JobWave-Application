import { Component, HostListener } from '@angular/core';
import { MyJobService } from './my-job.service';
import { Post } from '../post-page/post-page.service';
import { LoginService } from '../login/login.service';
import { Jobseeker } from '../find-applicant/find-applicant.service';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { JobApplication } from '../job-apply/job-apply.service';
import { User } from '../profile/profile.service';

@Component({
  selector: 'app-my-job',
  templateUrl: './my-job.component.html',
  styleUrls: ['./my-job.component.scss']
})

export class MyJobComponent {

  userDetails!: User;

  status!: string;
  posts: Array<Post> = [];
  class!: string;
  length = 40;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  applicationApi: Subscription = new Subscription();
  jobApi: Subscription = new Subscription();
  userApi: Subscription = new Subscription();


  constructor(
    private myJobService: MyJobService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  handlePageEvent(event: PageEvent): void {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getUser();
  }

  rightBox(postId: string): void {
    this.applicationApi = this.myJobService.getApplication(postId, this.userDetails.email).subscribe({
      next: (data: { status: string; }) => {
        this.status = data.status;
      }
    });
  }

  getUser(): void {

    this.userApi = this.loginService.getUser().subscribe({
      next: (data) => {
        this.userDetails = data;
        this.jobApi = this.myJobService.getJobs(this.userDetails.email, this.pageIndex, this.pageSize).subscribe({
          next: (data: { content: JobApplication[], totalElements: number }) => {
            this.posts = [];
            data.content.forEach((value: JobApplication) => {
              this.posts.push(value.postId);
            });
            this.length = data.totalElements;
            this.rightBox(this.posts[0]._id);
          },
        });

      }

    });

  }

  @HostListener('window:scroll', [])
  OnWindowScroll(): void {
    const rightbox: any = document.getElementById('right');
    const text: any = document.getElementById('text');
    const textHeight = text.getBoundingClientRect();

    if (textHeight.top < -67) {
      rightbox.classList.add('right-fixed');
    }
    else if (textHeight.top > -71) {
      rightbox.classList.remove('right-fixed');
    }

  }

  ngOnDestroy() {
    this.userApi.unsubscribe();
    this.jobApi.unsubscribe();
    this.applicationApi.unsubscribe();
  }

}
