import { Component, HostListener } from '@angular/core';
import { MyPostService, applicant } from './my-post.service';
import { post } from '../post-page/post-page.service';
import { ApplicantComponent } from '../applicant/applicant.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../service/data.service';
import { LoginService } from '../login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss']
})
export class MyPostComponent {

  myPost!: Array<post>;
  myPostApplicants!: Array<applicant>;
  userDetails!: any;

  constructor(private myPostService: MyPostService, private data: DataService,
    public dialog: MatDialog, private loginService: LoginService) {
  }

  ngOnInit() {

    this.loginService.getUser().subscribe({
      next: (data) => {
        this.userDetails = data;
        this.myPostService.MyPosts(this.userDetails._id).subscribe({
          next: (data) => {
            this.myPost = data;
            this.rightBox(data[0]._id);
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    });

  }

  rightBox(postId: string) {
    this.myPostService.MyPostSeekers(postId).subscribe({
      next: (data) => {
        this.myPostApplicants = data;
        // console.log(data);

      },
      error: (error) => {
        console.log(error);
      }
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
  OnWindowScroll() {
    const rightbox: any = document.getElementById('right');
    const text: any = document.getElementById('text');
    const textHeight = text.getBoundingClientRect();
    if (textHeight.top < -67) {
      rightbox.classList.add('right-fixed');
    } else if (textHeight.top > -71) {
      rightbox.classList.remove('right-fixed');
    }
  }

  open(post: post) {
    post.status = 'Open';
    this.myPostService.updatePost(post).subscribe({
      next: () => {
        Swal.fire({
          title: 'Post updated Successfully',
          icon: 'success'
        })
      }
    })
  }

  close(post: post) {
    post.status = 'Close';
    this.myPostService.updatePost(post).subscribe({
      next: () => {
        Swal.fire({
          title: 'Post updated Successfully',
          icon: 'success'
        })
      }
    })
  }

}
