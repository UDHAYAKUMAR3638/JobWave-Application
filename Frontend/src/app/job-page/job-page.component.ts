import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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

  @ViewChild('applyButton') applyButton!: ElementRef;

  constructor(private jobPageService: JobPageService, private dataService: DataService, private router: Router) {

  }

  jobPosts!: Array<post>;
  jobPostsB!: Array<post>;
  selectedPost: post = {
    _id: '',
    role: '',
    location: '',
    salary: '',
    jobType: '',
    schedule: '',
    content: '',
    education: '',
    benifits: '',
    language: '',
    date: new Date(),
    skills: '',
    recruiterId: {
    },
    status: ''
  };

  ngOnInit() {
    this.jobPageService.getAllPosts().subscribe({
      next: (data) => {
        this.jobPosts = data;
        this.jobPostsB = data;
        this.rightBox(this.jobPosts[0]);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  rightBox(currPost: post) {
    this.selectedPost = currPost;
    this.jobPageService.getApplication(this.selectedPost._id, sessionStorage.getItem('email') || '').subscribe({
      next: (data) => {

        if (data != null) {
          this.applyButton.nativeElement.disabled = true;
        }
        else {
          this.applyButton.nativeElement.disabled = false;
        }
      }
    })
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
    // this.dataService.messageSource.next(postId);
    this.router.navigate(['jobApply', postId]);
  }


}
