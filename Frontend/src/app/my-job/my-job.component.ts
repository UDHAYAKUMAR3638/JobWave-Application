import { Component, HostListener } from '@angular/core';
import { MyJobService } from './my-job.service';
import { post } from '../post-page/post-page.service';

@Component({
  selector: 'app-my-job',
  templateUrl: './my-job.component.html',
  styleUrls: ['./my-job.component.scss']
})
export class MyJobComponent {
  userDetails: any;
  status!: string;
  posts!: Array<post>;
  class!: string;
  constructor(private myJobService: MyJobService) {
  }

  ngOnInit() {
    this.userDetails = JSON.parse(sessionStorage.getItem('user')!);
    this.myJobService.getJobs(this.userDetails.email).subscribe({
      next: (data) => {
        this.posts = data;
        this.rightBox(this.posts[0]._id);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  rightBox(postId: string) {
    this.myJobService.getApplication(postId, this.userDetails.email).subscribe({
      next: (data) => {
        this.status = data.status;

      }
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

}
