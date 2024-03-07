import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from './view-user.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from '../user-details/user-details.component';
import Swal from 'sweetalert2';
import { Subject, debounceTime, switchMap } from 'rxjs';
@Component({
  selector: 'app-appointment',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent {

  constructor(
    private userService: UserService,
    private matDialog: MatDialog
  ) { }

  inp: string = '';
  users: any = '';
  length = 40;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  displayedColumns: string[] = ['Name', 'Email', 'Role', 'Edit', 'Profile'];
  private searchText$ = new Subject<string>();

  ngOnInit(): void {
    this.searchText$.pipe(debounceTime(500), switchMap(() => this.userService.getItems(this.inp, this.pageIndex, this.pageSize))).subscribe({
      next: (response: any) => {
        this.users = response.content;
        this.length = response.totalElements;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    this.getUsers();
  }

  getDetails(role: string, email: string) {
    this.userService.getDetails(role, email).subscribe({
      next: (data: any) => {
        this.matDialog.open(UserDetailsComponent, {
          data: { data, role },
          height: '550px',
          width: '600px',
        });
      }
    });
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getItems(this.inp, this.pageIndex, this.pageSize)
      .subscribe((response: { totalElements: number; content: any; }) => {
        this.length = response.totalElements;
        this.users = response.content;
      });
  }

  updateStatus(id: string, status: string) {
    this.userService.updateStatus(id, status).subscribe({
      next: () => {
        Swal.fire({
          title: `User status updated as ${status}`,
          icon: 'success',
        });
        this.getUsers();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  search() {
    this.searchText$.next('');
  }
}
