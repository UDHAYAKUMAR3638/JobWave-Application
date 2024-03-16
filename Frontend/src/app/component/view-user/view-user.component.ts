import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from './view-user.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { Subject, Subscription, debounceTime, switchMap } from 'rxjs';
import { AlertService } from '../../service/alert.service';
@Component({
  selector: 'app-appointment',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})

export class ViewUserComponent {

  constructor(
    private userService: UserService,
    private matDialog: MatDialog,
    private alertService: AlertService
  ) { }

  inp: string = '';
  users: any = '';
  length = 40;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  updateStatusApi: Subscription = new Subscription();
  detailsApi: Subscription = new Subscription();
  searchApi: Subscription = new Subscription();
  itemsApi: Subscription = new Subscription();
  displayedColumns: string[] = ['Name', 'Email', 'Role', 'Edit', 'Profile'];
  private searchText$ = new Subject<string>();

  ngOnInit(): void {

    this.searchApi = this.searchText$.pipe(debounceTime(500), switchMap(() => this.userService.getItems(this.inp, this.pageIndex, this.pageSize))).subscribe({
      next: (response: any) => {
        this.users = response.content;
        this.length = response.totalElements;
      },
    });
    this.getUsers();

  }

  getDetails(role: string, email: string): void {

    this.detailsApi = this.userService.getDetails(role, email).subscribe({
      next: (data: any) => {
        this.matDialog.open(UserDetailsComponent, {
          data: { data, role },
          height: '550px',
          width: '600px',
        });
      }
    });

  }

  handlePageEvent(event: PageEvent): void {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getUsers();
  }

  getUsers(): void {

    this.itemsApi = this.userService.getItems(this.inp, this.pageIndex, this.pageSize)
      .subscribe((response: { totalElements: number; content: any; }) => {
        this.length = response.totalElements;
        this.users = response.content;
      });

  }

  updateStatus(id: string, status: string): void {

    this.updateStatusApi = this.userService.updateStatus(id, status).subscribe({
      next: () => {
        this.alertService.alertMessage(`User status updated as ${status}`, '', 'success')
        this.getUsers();
      },
    });

  }

  search(): void {
    this.searchText$.next('');
  }

  ngOnDestroy(): void {
    this.updateStatusApi.unsubscribe();
    this.detailsApi.unsubscribe();
    this.itemsApi.unsubscribe();
    this.searchApi.unsubscribe();
  }
}
