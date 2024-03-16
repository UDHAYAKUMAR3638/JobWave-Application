import { Component } from '@angular/core';
import { CompanyPageService } from './company-page.service';
import { List } from 'lodash';
import { Recruiter } from '../recruiter-profile-completion/recruiter-profile-completion.service';
import { Router } from '@angular/router';
import { Subject, Subscription, debounceTime, switchMap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Page } from '../../service/data.service';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})

export class CompanyPageComponent {

  inp: string = '';
  length = 40;
  pageSize = 6;
  pageIndex = 0;
  pageSizeOptions = [6, 10, 25];
  showFirstLastButtons = true;
  searchApi: Subscription = new Subscription();
  companyApi: Subscription = new Subscription();
  private searchText$ = new Subject<string>();
  companies!: Array<Recruiter>;

  constructor(private companyService: CompanyPageService, private router: Router) { }

  ngOnInit() {

    this.searchApi = this.searchText$.pipe(debounceTime(500), switchMap(() => this.companyService.getCompany(this.inp, this.pageIndex, this.pageSize))).subscribe({
      next: (response: Page) => {
        this.companies = response.content;
        this.length = response.totalElements;
      },
    });
    this.getCompany();

  }

  getCompany(): void {
    this.companyApi = this.companyService.getCompany(this.inp, this.pageIndex, this.pageSize).subscribe({
      next: (response: Page) => {
        this.companies = response.content;
        this.length = response.totalElements;
      },

    });

  }

  handlePageEvent(event: PageEvent): void {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getCompany();
  }

  redirectToPage(id: string): void {
    this.router.navigate(['viewCompany', id]);
  }

  search(): void {
    this.searchText$.next('');
  }

  ngOnDestroy() {
    this.searchApi.unsubscribe();
    this.companyApi.unsubscribe();
  }

}
