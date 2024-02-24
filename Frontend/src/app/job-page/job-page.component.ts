import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.scss']
})
export class JobPageComponent {

  jobPosts: any = [
    { role: "Staff Software Engineer", location: "Remote", salary: "₹53,60,000 - ₹80,40,000 a year", jobType: "Full-time", schedule: "Monday to Friday", content: "Are comfortable working cross-functionally to drive impact across the Software Development Lifecycle (SDLC), including working with product managers to clarify requirements and break down work,…", date: "22/02/2024" },
    { role: "Staff Software Engineer", location: "Remote", salary: "₹53,60,000 - ₹80,40,000 a year", jobType: "Full-time", schedule: "Monday to Friday", content: "Are comfortable working cross-functionally to drive impact across the Software Development Lifecycle (SDLC), including working with product managers to clarify requirements and break down work,…", date: "22/02/2024" },
    { role: "Staff Software Engineer", location: "Remote", salary: "₹53,60,000 - ₹80,40,000 a year", jobType: "Full-time", schedule: "Monday to Friday", content: "Are comfortable working cross-functionally to drive impact across the Software Development Lifecycle (SDLC), including working with product managers to clarify requirements and break down work,…", date: "22/02/2024" },
    { role: "Staff Software Engineer", location: "Remote", salary: "₹53,60,000 - ₹80,40,000 a year", jobType: "Full-time", schedule: "Monday to Friday", content: "Are comfortable working cross-functionally to drive impact across the Software Development Lifecycle (SDLC), including working with product managers to clarify requirements and break down work,…", date: "22/02/2024" },
    { role: "Staff Software Engineer", location: "Remote", salary: "₹53,60,000 - ₹80,40,000 a year", jobType: "Full-time", schedule: "Monday to Friday", content: "Are comfortable working cross-functionally to drive impact across the Software Development Lifecycle (SDLC), including working with product managers to clarify requirements and break down work,…", date: "22/02/2024" },
    { role: "Staff Software Engineer", location: "Remote", salary: "₹53,60,000 - ₹80,40,000 a year", jobType: "Full-time", schedule: "Monday to Friday", content: "Are comfortable working cross-functionally to drive impact across the Software Development Lifecycle (SDLC), including working with product managers to clarify requirements and break down work,…", date: "22/02/2024" },
    { role: "Staff Software Engineer", location: "Remote", salary: "₹53,60,000 - ₹80,40,000 a year", jobType: "Full-time", schedule: "Monday to Friday", content: "Are comfortable working cross-functionally to drive impact across the Software Development Lifecycle (SDLC), including working with product managers to clarify requirements and break down work,…", date: "22/02/2024" },
    { role: "Staff Software Engineer", location: "Remote", salary: "₹53,60,000 - ₹80,40,000 a year", jobType: "Full-time", schedule: "Monday to Friday", content: "Are comfortable working cross-functionally to drive impact across the Software Development Lifecycle (SDLC), including working with product managers to clarify requirements and break down work,…", date: "22/02/2024" },
    { role: "Staff Software Engineer", location: "Remote", salary: "₹53,60,000 - ₹80,40,000 a year", jobType: "Full-time", schedule: "Monday to Friday", content: "Are comfortable working cross-functionally to drive impact across the Software Development Lifecycle (SDLC), including working with product managers to clarify requirements and break down work,…", date: "22/02/2024" },
    { role: "Staff Software Engineer", location: "Remote", salary: "₹53,60,000 - ₹80,40,000 a year", jobType: "Full-time", schedule: "Monday to Friday", content: "Are comfortable working cross-functionally to drive impact across the Software Development Lifecycle (SDLC), including working with product managers to clarify requirements and break down work,…", date: "22/02/2024" },
  ];
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

}
