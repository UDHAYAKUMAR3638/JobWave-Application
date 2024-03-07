import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { JobPageService } from './job-page.service';
import { Post } from '../post-page/post-page.service';
import { List } from 'lodash';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.scss']
})
export class JobPageComponent {

  @ViewChild('applyButton') applyButton!: ElementRef;

  constructor(private jobPageService: JobPageService, private router: Router) { }

  jobPosts!: Array<Post>;
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

  private searchText$ = new Subject<string>();

  ngOnInit() {
    this.searchText$.pipe(debounceTime(500), switchMap(() => this.jobPageService.getAllPosts(this.inp1, this.inp2, this.inp3, this.pageIndex, this.pageSize))).subscribe({
      next: (data: { content: Post[]; totalElements: number; }) => {
        this.jobPosts = data.content;
        this.rightBox(this.jobPosts[0]);
        this.length = data.totalElements;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    this.getPost();
  }

  search() {
    this.searchText$.next('');
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getPost();
  }

  getPost() {
    this.jobPageService.getAllPosts(this.inp1, this.inp2, this.inp3, this.pageIndex, this.pageSize).subscribe({
      next: (data: { content: Post[]; totalElements: number; }) => {
        this.jobPosts = data.content;
        this.length = data.totalElements;
        this.rightBox(this.jobPosts[0]);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  rightBox(currPost: Post) {
    this.selectedPost = currPost;
    this.jobPageService.getApplication(this.selectedPost._id, sessionStorage.getItem('email') || '').subscribe({
      next: (data: null) => {
        if (data != null) {
          this.applyButton.nativeElement.disabled = true;
        }
        else {
          this.applyButton.nativeElement.disabled = false;
        }
      }
    })
  }

  @HostListener('window:scroll', [])
  OnWindowScroll() {

    const rightbox: any = document.getElementById('right');
    const searchbox: any = document.getElementById('search');
    const boxHeight = rightbox.getBoundingClientRect();
    const searchHeight = searchbox.getBoundingClientRect();

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
