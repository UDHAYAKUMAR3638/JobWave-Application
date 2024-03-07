import { Component } from '@angular/core';
import { CompanyPageService } from './company-page.service';
import { List } from 'lodash';
import { Recruiter } from '../recruiter-profile-completion/recruiter-profile-completion.service';
import { Router } from '@angular/router';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

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
  private searchText$ = new Subject<string>();

  companies!: Array<Recruiter>;
  constructor(private companyService: CompanyPageService, private router: Router) { }

  ngOnInit() {

    this.searchText$.pipe(debounceTime(500), switchMap(() => this.companyService.getCompany(this.inp, this.pageIndex, this.pageSize))).subscribe({
      next: (response: any) => {
        this.companies = response.content;
        this.length = response.totalElements;
      },
      error: (error: any) => {
        console.log(error);
      }
    });

    this.getCompany();
  }

  getCompany() {
    this.companyService.getCompany(this.inp, this.pageIndex, this.pageSize).subscribe({
      next: (response: any) => {
        this.companies = response.content;
        this.length = response.totalElements;
      },
      error: (error: any) => {
        console.log(error);
      }
    });

  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getCompany();
  }

  redirect(id: string) {
    this.router.navigate(['viewCompany', id]);
  }

  search() {
    this.searchText$.next('');
  }

}
