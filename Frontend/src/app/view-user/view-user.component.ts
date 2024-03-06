import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from './view-user.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from '../user-details/user-details.component';
import Swal from 'sweetalert2';

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

  users: any = '';
  length = 40;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  displayedColumns: string[] = ['Name', 'Email', 'Role', 'Edit', 'Profile'];

  ngOnInit(): void {
    this.getUsers();
  }

  getDetails(role: string, email: string) {
    this.userService.getDetails(role, email).subscribe({
      next: (data) => {
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
    this.userService.getItems(this.pageIndex, this.pageSize)
      .subscribe(response => {
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
      error: (error) => {
        console.log(error);
      }
    });
  }
}
