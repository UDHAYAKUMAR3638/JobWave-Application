import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { JobPageService } from './job-page.service';
import { Post } from '../post-page/post-page.service';
import { Router } from '@angular/router';
import { Subject, Subscription, debounceTime, switchMap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { LoginService } from '../login/login.service';
import { JobApplication } from '../job-apply/job-apply.service';

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.scss']
})
export class JobPageComponent {

  constructor(
    private jobPageService: JobPageService,
    private router: Router,
    private loginService: LoginService
  ) { }

  @ViewChild('applyButton') applyButton!: ElementRef;
  jobPosts!: Array<Post>;
  myJobs: string[] = [];
  selectedPost: Post = {
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
    },
    status: ''
  };

  inp1: string = '';
  inp2: string = '';
  inp3: string = '';
  length = 40;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  postApi: Subscription = new Subscription();
  applicationApi: Subscription = new Subscription();
  searchApi: Subscription = new Subscription();


  private searchText$ = new Subject<string>();

  ngOnInit() {
    this.searchApi = this.searchText$.pipe(debounceTime(500), switchMap(() => this.jobPageService.getAllPosts(this.inp1, this.inp2, this.inp3, this.pageIndex, this.pageSize))).subscribe({
      next: (data: { content: Post[]; totalElements: number; }) => {
        this.jobPosts = data.content;
        if (this.jobPosts.length > 0)
          this.rightBox(this.jobPosts[0]);
        this.length = data.totalElements;
      },

    });
    this.getApplicantJobs();
    this.getPost();
  }

  search(): void {
    this.searchText$.next('');
  }

  handlePageEvent(event: PageEvent): void {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getPost();
  }

  getPost(): void {
    this.postApi = this.jobPageService.getAllPosts(this.inp1, this.inp2, this.inp3, this.pageIndex, this.pageSize).subscribe({
      next: (data: { content: Post[]; totalElements: number; }) => {
        this.jobPosts = data.content;
        this.length = data.totalElements;
        if (this.jobPosts.length > 0)
          this.rightBox(this.jobPosts[0]);
      },

    });
  }

  rightBox(currPost: Post): void {
    this.selectedPost = currPost;
    this.applyButton.nativeElement.disabled = this.myJobs.includes(currPost._id);
  }

  getApplicantJobs(): void {
    if (sessionStorage.getItem('role') === 'JOBSEEKER') {
      this.applicationApi = this.jobPageService.getMyJobs().subscribe({
        next: (data: JobApplication[]) => {
          for (let val of data) {
            this.myJobs.push(val.postId._id);
          }
        }
      });
    }
  }

  @HostListener('window:scroll', [])
  OnWindowScroll(): void {

    const rightbox: any = document.getElementById('right');
    const searchbox: any = document.getElementById('search');
    const boxHeight = rightbox.getBoundingClientRect();
    const searchHeight = searchbox.getBoundingClientRect();

    if (boxHeight.top < 0) {
      rightbox.classList.add('right-fixed');
    }
    else if (searchHeight.top > -150) {
      rightbox.classList.remove('right-fixed');
    }

  }

  apply(postId: string): void {
    this.router.navigate(['jobApply', postId]);
  }

  ngOnDestroy() {
    this.searchApi.unsubscribe();
    this.applicationApi.unsubscribe();
    this.postApi.unsubscribe();
  }

}
