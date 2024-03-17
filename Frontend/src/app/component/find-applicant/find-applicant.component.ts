import { Component, HostListener } from '@angular/core';
import { Post } from '../post-page/post-page.service';
import { DataService, Page } from '../../service/data.service';
import { Router } from '@angular/router';
import { FindApplicantService, Jobseeker } from './find-applicant.service';
import { Subject, Subscription, debounceTime, switchMap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-find-applicant',
  templateUrl: './find-applicant.component.html',
  styleUrls: ['./find-applicant.component.scss']
})
export class FindApplicantComponent {

  constructor(private findApplicantService: FindApplicantService, private router: Router) { }

  inp1: string = '';
  inp2: string = '';
  inp3: string = '';
  length = 40;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  applicants!: Array<Jobseeker>;
  private searchText$ = new Subject<string>();
  searchApi: Subscription = new Subscription();
  applicantApi: Subscription = new Subscription();
  selectedApplicant: Jobseeker = {
    _id: '',
    name: '',
    email: '',
    phoneno: '',
    schoolName: '',
    schlPassedOutYear: 0,
    collegeName: '',
    clgPassedOutYear: 0,
    currentPosition: '',
    headline: '',
    location: '',
    dob: new Date(),
    industries: [],
    skills: '',
    image: ''
  };



  ngOnInit() {
    this.searchApi = this.searchText$.pipe(debounceTime(500), switchMap(() => this.findApplicantService.getAllSeekers(this.inp1, this.inp2, this.inp3, this.pageIndex, this.pageSize))).subscribe({
      next: (data: { content: Jobseeker[]; totalElements: number; }) => {
        this.applicants = data.content;
        this.selectedApplicant = this.applicants[0];
        this.length = data.totalElements;
      },

    });

    this.getApplicant();
  }

  handlePageEvent(event: PageEvent): void {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getApplicant();
  }

  rightBox(currPost: Jobseeker): void {
    this.selectedApplicant = currPost;
  }

  getApplicant(): void {
    this.applicantApi = this.findApplicantService.getAllSeekers(this.inp1, this.inp2, this.inp3, this.pageIndex, this.pageSize).subscribe({
      next: (data: { content: Array<Jobseeker>, totalElements: number }) => {
        this.applicants = data.content;
        this.selectedApplicant = this.applicants[0];
        this.length = data.totalElements;

      },

    });
  }

  search(): void {
    this.searchText$.next('');
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

  ngOnDestroy() {
    this.searchApi.unsubscribe();
    this.applicantApi.unsubscribe();
  }

}
