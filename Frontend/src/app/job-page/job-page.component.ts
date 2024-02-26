import { Component, HostListener } from '@angular/core';
import { JobPageService } from './job-page.service';

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.scss']
})
export class JobPageComponent {
  constructor(private jobPageService: JobPageService) {
  }

  ngOnInit() {
    this.jobPageService.getAllPosts().subscribe({
      next: (data) => {
        this.jobPosts = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  jobPosts: any = [
    { role: "Staff Software Engineer", location: "Remote", salary: "₹53,60,000 - ₹80,40,000 a year", jobType: "Full-time", schedule: "Monday to Friday", content: "Are comfortable working cross-functionally to drive impact across the Software Development Lifecycle (SDLC), including working with product managers to clarify requirements and break down work,…", education: "Master's (Preferred)", benifits: "Internet reimbursement", language: "English (Preferred)", date: "22/02/2024" },
    { role: "Senior Software Engineer", location: "Remote", salary: "₹53,60,000 - ₹80,40,000 a year", jobType: "Full-time", schedule: "Monday to Friday", content: "Are comfortable working cross-functionally to drive impact across the Software Development Lifecycle (SDLC), including working with product managers to clarify requirements and break down work,…", education: "Master's (Preferred)", benifits: "Internet reimbursement", language: "English (Preferred)", date: "22/02/2024" },
    { role: "Junior Software Engineer", location: "Remote", salary: "₹53,60,000 - ₹80,40,000 a year", jobType: "Full-time", schedule: "Monday to Friday", content: "Are comfortable working cross-functionally to drive impact across the Software Development Lifecycle (SDLC), including working with product managers to clarify requirements and break down work,…", education: "Master's (Preferred)", benifits: "Internet reimbursement", language: "English (Preferred)", date: "22/02/2024" },
    { role: "Business Team", location: "Remote", salary: "₹53,60,000 - ₹80,40,000 a year", jobType: "Full-time", schedule: "Monday to Friday", content: "Are comfortable working cross-functionally to drive impact across the Software Development Lifecycle (SDLC), including working with product managers to clarify requirements and break down work,…", education: "Master's (Preferred)", benifits: "Internet reimbursement", language: "English (Preferred)", date: "22/02/2024" },
  ];
  selectedPost: any =
    { role: "Staff Software Engineer", location: "Remote", salary: "₹53,60,000 - ₹80,40,000 a year", jobType: "Full-time", schedule: "Monday to Friday", content: "Are comfortable working cross-functionally to drive impact across the Software Development Lifecycle (SDLC), including working with product managers to clarify requirements and break down work,…", education: "Master's (Preferred)", benifits: "Internet reimbursement", language: "English (Preferred)", date: "22/02/2024" };

  rightBox(currPost: any) {
    this.selectedPost = currPost;
  }

  search() {
    // this.searchService.search(text);
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
  form() {

  }

}
