import { Component, HostListener } from '@angular/core';
import { post } from '../post-page/post-page.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { JobPageService } from '../job-page/job-page.service';
import { applicant } from '../my-post/my-post.service';
import { FindApplicantService, jobseeker } from './find-applicant.service';

@Component({
  selector: 'app-find-applicant',
  templateUrl: './find-applicant.component.html',
  styleUrls: ['./find-applicant.component.scss']
})
export class FindApplicantComponent {
  inp1!: string;
  inp2!: string;
  image!: string;
  constructor(private findApplicantService: FindApplicantService, private dataService: DataService, private router: Router) {

  }
  applicants!: Array<jobseeker>;
  applicantsB!: Array<jobseeker>;
  selectedApplicant: jobseeker = {
    _id: '',
    name: '',
    email: '',
    phoneno: '',
    schoolName: '',
    schlPassedOutYear: 0,
    collegeName: '',
    clgPassedOutYear: 0,
    currentPosition: '',
    headline: '',
    location: '',
    dob: new Date(),
    indusrties: [],
    skills: '',
    image: ''
  };

  ngOnInit() {
    this.findApplicantService.getAllSeekers().subscribe({
      next: (data) => {
        this.applicants = data;
        this.applicantsB = data;
        this.selectedApplicant = this.applicants[0];
        this.image = this.selectedApplicant.image;

      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  rightBox(currPost: jobseeker) {
    this.selectedApplicant = currPost;
    this.image = this.selectedApplicant.image;
  }

  search() {
    if ((this.inp1 !== '' && this.inp1 !== undefined) || (this.inp2 !== '' && this.inp2 !== undefined)) {
      this.applicants = this.applicantsB.filter((data) => {
        if (this.inp2 !== '' && this.inp2 !== undefined)
          return (data.skills.includes(this.inp1) || data.headline.includes(this.inp1)) && data.location.includes(this.inp2);
        else
          return data.skills.includes(this.inp1) || data.headline.includes(this.inp1) || data.location.includes(this.inp2);
      });
      if (this.applicants.length > 0)
        this.selectedApplicant = this.applicants[0];
    }
    else {
      this.applicants = this.applicantsB;
    }
  }

  @HostListener('window:scroll', [])
  OnWindowScroll() {
    const rightbox: any = document.getElementById('right');
    const searchbox: any = document.getElementById('search');
    const boxHeight = rightbox.getBoundingClientRect(); // Height of the box
    const searchHeight = searchbox.getBoundingClientRect(); // Height of the box
    if (boxHeight.top < 0) {
      rightbox.classList.add('right-fixed');
    } else if (searchHeight.top > -150) {
      rightbox.classList.remove('right-fixed');
    }
  }

  // apply(postId: string) {
  //   this.dataService.messageSource.next(postId);
  //   this.router.navigate(['jobApply']);
  // }


}
