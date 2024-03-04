import { Component, HostListener } from '@angular/core';
import { Applicant, MyPostService } from './my-post.service';
import { ApplicantComponent } from '../applicant/applicant.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../service/data.service';
import { LoginService } from '../login/login.service';
import Swal from 'sweetalert2';
import { Post } from '../post-page/post-page.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss']
})
export class MyPostComponent {

  myPost!: Array<Post>;
  myPostApplicants!: Array<Applicant>;
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

  open(post: Post) {
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

  close(post: Post) {
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
