import { Component, Inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Post } from '../post-page/post-page.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MyPostService } from '../my-post/my-post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-posted-jobs',
  templateUrl: './user-posted-jobs.component.html',
  styleUrls: ['./user-posted-jobs.component.scss']
})

export class UserPostedJobsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public details: any,
    public dialogRef: MatDialogRef<UserPostedJobsComponent>,
    private myPostService: MyPostService
  ) { }

  posts: Array<Post> = [];
  id: string = '';
  length = 40;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  displayedColumns: string[] = ['Job title', 'Salary', 'Job type', 'Location', 'Posted date', 'Status'];
  userApi: Subscription = new Subscription();
  postApi: Subscription = new Subscription();

  ngOnInit(): void {

    this.userApi = this.myPostService.getUserId(this.details.email).subscribe({
      next: (data: { _id: string; }) => {
        this.id = data._id;
        this.getPosts();
      }
    })

  }

  getPosts(): void {

    this.postApi = this.myPostService.MyPosts(this.id, this.pageIndex, this.pageSize).subscribe({
      next: (data: { content: Post[]; totalElements: number; }) => {
        this.posts = data.content;
        this.length = data.totalElements;
      },
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getPosts();
  }

  ngOnDestroy(): void {
    this.postApi.unsubscribe();
    this.userApi.unsubscribe();
  }

}
