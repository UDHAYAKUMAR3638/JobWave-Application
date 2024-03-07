import { Component, HostListener } from '@angular/core';
import { MyJobService } from './my-job.service';
import { Post } from '../post-page/post-page.service';
import { LoginService } from '../login/login.service';
import { Jobseeker } from '../find-applicant/find-applicant.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-my-job',
  templateUrl: './my-job.component.html',
  styleUrls: ['./my-job.component.scss']
})
export class MyJobComponent {
  userDetails: Jobseeker = {
    _id: '',
    email: '',
    name: '',
    phoneno: '',
    dob: new Date(),
    headline: '',
    schoolName: '',
    schlPassedOutYear: 0,
    collegeName: '',
    clgPassedOutYear: 0,
    currentPosition: '',
    skills: '',
    industries: [],
    location: '',
    image: ''
  };
  status!: string;
  posts: Array<Post> = [];
  class!: string;
  length = 40;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  constructor(private myJobService: MyJobService, private loginService: LoginService) {
  }

  ngOnInit() {
    this.getUser();
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getUser();
  }

  rightBox(postId: string) {
    this.myJobService.getApplication(postId, this.userDetails.email).subscribe({
      next: (data: { status: string; }) => {
        this.status = data.status;
      }
    });
  }

  getUser() {
    this.loginService.getUser().subscribe({
      next: (data: Jobseeker) => {
        this.userDetails = data;
        this.myJobService.getJobs(this.userDetails.email, this.pageIndex, this.pageSize).subscribe({
          next: (data: { content: any[]; totalElements: number; }) => {
            data.content.forEach((value: any) => {
              this.posts.push(value.postId);
            });
            this.length = data.totalElements;
            this.rightBox(this.posts[0]._id);
          },
          error: (error: any) => {
            console.log(error);
          }
        });
      }
    });
  }

  @HostListener('window:scroll', [])
  OnWindowScroll() {
    const rightbox: any = document.getElementById('right');
    const text: any = document.getElementById('text');
    const textHeight = text.getBoundingClientRect();
    if (textHeight.top < -67) {
      rightbox.classList.add('right-fixed');
    } else if (textHeight.top > -71) {
      rightbox.classList.remove('right-fixed');
    }
  }

}
