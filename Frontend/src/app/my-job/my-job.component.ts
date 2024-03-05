import { Component, HostListener } from '@angular/core';
import { MyJobService } from './my-job.service';
import { Post } from '../post-page/post-page.service';
import { LoginService } from '../login/login.service';
import { Jobseeker } from '../find-applicant/find-applicant.service';

@Component({
  selector: 'app-my-job',
  templateUrl: './my-job.component.html',
  styleUrls: ['./my-job.component.scss']
})
export class MyJobComponent {
  userDetails: Jobseeker = {
    _id: '',
    email: '',
    name: '',
    phoneno: '',
    dob: new Date(),
    headline: '',
    schoolName: '',
    schlPassedOutYear: 0,
    collegeName: '',
    clgPassedOutYear: 0,
    currentPosition: '',
    skills: '',
    industries: [],
    location: '',
    image: ''
  };
  status!: string;
  posts!: Array<Post>;
  class!: string;
  constructor(private myJobService: MyJobService, private loginService: LoginService) {
  }

  ngOnInit() {

    this.loginService.getUser().subscribe({
      next: (data) => {
        this.userDetails = data;
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
