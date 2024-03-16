import { Component, HostListener } from '@angular/core';
import { MyPostService } from './my-post.service';
import { ApplicantComponent } from '../applicant/applicant.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../service/data.service';
import { LoginService } from '../login/login.service';
import { Post } from '../post-page/post-page.service';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AlertService } from '../../service/alert.service';
import { JobApplication } from '../job-apply/job-apply.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss']
})
export class MyPostComponent {

  myPost!: Array<Post>;
  myPostApplicants!: Array<JobApplication>;
  flag = false;
  userDetails!: any;
  length = 40;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  userApi: Subscription = new Subscription();
  postApi: Subscription = new Subscription();
  applicantApi: Subscription = new Subscription();
  updateApi: Subscription = new Subscription();


  constructor(
    private myPostService: MyPostService,
    public dialog: MatDialog,
    private loginService: LoginService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.userApi = this.loginService.getUser().subscribe({
      next: (data: any) => {
        this.userDetails = data;
        this.getPost();
      }
    });

  }

  handlePageEvent(event: PageEvent): void {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getPost();
  }

  getPost(): void {
    this.postApi = this.myPostService.MyPosts(this.userDetails._id, this.pageIndex, this.pageSize).subscribe({
      next: (data: { content: Post[]; totalElements: number; }) => {
        this.myPost = data.content;
        this.length = data.totalElements;
        this.rightBox(this.myPost[0]._id);
      },

    });
  }

  rightBox(postId: string): void {
    this.applicantApi = this.myPostService.MyPostSeekers(postId).subscribe({
      next: (data: Array<JobApplication>) => {
        this.myPostApplicants = data;

        if (data.length > 0)
          this.flag = true;
        else
          this.flag = false;

      },

    });
  }

  openDialog(details: any): void {
    const dialogRef = this.dialog.open(ApplicantComponent, {
      data: details,
      height: '450px',
      width: '500px',
    });
  }

  @HostListener('window:scroll', [])
  OnWindowScroll(): void {
    const rightbox: any = document.getElementById('right');
    const text: any = document.getElementById('text');
    const textHeight = text.getBoundingClientRect();

    if (textHeight.top < -67) {
      rightbox.classList.add('right-fixed');
    }
    else if (textHeight.top > -71) {
      rightbox.classList.remove('right-fixed');
    }

  }

  open(post: Post): void {

    post.status = 'Open';
    this.updateApi = this.myPostService.updatePost(post).subscribe({
      next: () => {
        this.alertService.alertMessage('Post opened', '', 'success');
      }
    })

  }

  close(post: Post): void {

    post.status = 'Close';
    this.updateApi = this.myPostService.updatePost(post).subscribe({
      next: () => {
        this.alertService.alertMessage('Post closed', '', 'success');
      }
    });

  }

  ngOnDestroy() {
    this.userApi.unsubscribe();
    this.updateApi.unsubscribe();
    this.postApi.unsubscribe();
    this.applicantApi.unsubscribe();
  }

}
