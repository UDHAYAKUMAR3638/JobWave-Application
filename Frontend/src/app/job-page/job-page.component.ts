import { Component, HostListener } from '@angular/core';
import { JobPageService } from './job-page.service';
import { post } from '../post-page/post-page.service';
import { List } from 'lodash';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.scss']
})
export class JobPageComponent {
  inp1!: string;
  inp2!: string;

  constructor(private jobPageService: JobPageService, private dataService: DataService, private router: Router) {

  }
  jobPosts!: Array<post>;
  jobPostsB!: Array<post>;
  selectedPost: post = {
    "_id": "",
    "role": "Staff Software Engineer",
    "location": "Remote",
    "salary": "₹53,60,000 - ₹80,40,000 a year",
    "jobType": "Full-time",
    "schedule": "Monday to Friday",
    "content": "Are comfortable working cross-functionally to drive impact across the Software Development Lifecycle (SDLC), including working with product managers to clarify requirements and break down work,…",
    "education": "Master's (Preferred)",
    "benifits": "Internet reimbursement",
    "language": "English (Preferred)",
    "date": new Date(),
    skills: '',
    recruiterId: {
      _id: '65dd6d9751aaae72f34241fc'
    }
  };

  ngOnInit() {
    this.jobPageService.getAllPosts().subscribe({
      next: (data) => {
        this.jobPosts = data;
        this.jobPostsB = data;
        this.selectedPost = this.jobPosts[0];
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  rightBox(currPost: post) {
    this.selectedPost = currPost;
  }

  search() {
    if ((this.inp1 !== '' && this.inp1 !== undefined) || (this.inp2 !== '' && this.inp2 !== undefined)) {
      this.jobPosts = this.jobPostsB.filter((data) => {
        if (this.inp2 !== '' && this.inp2 !== undefined)
          return (data.role.includes(this.inp1) || data.jobType.includes(this.inp1)) && data.location.includes(this.inp2);
        else
          return data.role.includes(this.inp1) || data.jobType.includes(this.inp1) || data.location.includes(this.inp2);

      });
      if (this.jobPosts.length > 0)
        this.selectedPost = this.jobPosts[0];
    }
    else {
      this.jobPosts = this.jobPostsB;
    }
  }

  @HostListener('window:scroll', [])
  OnWindowScroll() {
    const rightbox: any = document.getElementById('right');
    const searchbox: any = document.getElementById('search');
    const boxHeight = rightbox.getBoundingClientRect(); // Height of the box
    const searchHeight = searchbox.getBoundingClientRect(); // Height of the box
    if (boxHeight.top < 0) {
      rightbox.classList.add('right-fixed');
    } else if (searchHeight.top > -150) {
      rightbox.classList.remove('right-fixed');
    }
  }

  apply(postId: string) {
    this.dataService.messageSource.next(postId);
    this.router.navigate(['jobApply']);
  }


}
