import { Component, HostListener } from '@angular/core';
import { MyPostService } from './my-post.service';
import { post } from '../post-page/post-page.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss']
})
export class MyPostComponent {

  myPost!: Array<post>;

  constructor(private myPostService: MyPostService) {
  }

  selectedPost!: any;

  ngOnInit() {
    this.myPostService.MyPosts('65dc91b5a291de217207d3e8').subscribe({
      next: (data) => {
        console.log("post:", data);
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
        console.log(data);
        this.selectedPost = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  @HostListener('window:scroll', [])
  OnWindowScroll() {
    const rightbox: any = document.getElementById('right');
    const boxHeight = rightbox.getBoundingClientRect(); // Height of the box
    if (boxHeight.top < 0) {
      rightbox.classList.add('right-fixed');
    } else {
      rightbox.classList.remove('right-fixed');
    }
  }

}
