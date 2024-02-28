import { Component, HostListener } from '@angular/core';
import { MyPostService, applicant } from './my-post.service';
import { post } from '../post-page/post-page.service';
import { ApplicantComponent } from '../applicant/applicant.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss']
})
export class MyPostComponent {

  myPost!: Array<post>;

  constructor(private myPostService: MyPostService, private data: DataService,
    public dialog: MatDialog) {
  }

  myPostApplicants!: Array<applicant>;

  ngOnInit() {
    this.myPostService.MyPosts('65dc91b5a291de217207d3e8').subscribe({
      next: (data) => {
        this.myPost = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  rightBox(postId: string) {
    this.myPostService.MyPostSeekers(postId).subscribe({
      next: (data) => {
        this.myPostApplicants = data;
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
    if (textHeight.top < -97) {
      rightbox.classList.add('right-fixed');
    } else if (textHeight.top > -95) {
      rightbox.classList.remove('right-fixed');
    }
  }

}
