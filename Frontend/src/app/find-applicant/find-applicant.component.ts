import { Component, HostListener } from '@angular/core';
import { Post } from '../post-page/post-page.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { FindApplicantService, Jobseeker } from './find-applicant.service';
import { Subject, debounceTime, switchMap } from 'rxjs';
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

  private searchText$ = new Subject<string>();

  ngOnInit() {
    this.searchText$.pipe(debounceTime(500), switchMap(() => this.findApplicantService.getAllSeekers(this.inp1, this.inp2, this.inp3, this.pageIndex, this.pageSize))).subscribe({
      next: (data) => {
        this.applicants = data.content;
        this.selectedApplicant = this.applicants[0];
        this.length = data.totalElements;
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.getApplicant();
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getApplicant();
  }

  rightBox(currPost: Jobseeker) {
    this.selectedApplicant = currPost;
  }

  getApplicant() {
    this.findApplicantService.getAllSeekers(this.inp1, this.inp2, this.inp3, this.pageIndex, this.pageSize).subscribe({
      next: (data) => {
        this.applicants = data.content;
        this.selectedApplicant = this.applicants[0];
        this.length = data.totalElements;

      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  search() {
    this.searchText$.next('');
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

}
