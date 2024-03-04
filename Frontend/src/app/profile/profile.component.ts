import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService, User } from './profile.service';
import { LoginService } from '../login/login.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent {
  file: File | string = "";
  userForm!: FormGroup;
  profileImage!: string;
  constructor(private profileService: ProfileService, private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      _id: new FormControl(['']),
      name: new FormControl(['', Validators.required]),
      email: new FormControl(['', Validators.required]),
      password: new FormControl(['', Validators.required]),
      companyName: new FormControl(['', Validators.required]),
      companyType: new FormControl(['', Validators.required]),
      empCount: new FormControl(['', Validators.required]),
      phoneno: new FormControl(['', Validators.required]),
      dob: new FormControl(['', Validators.required]),
      headline: new FormControl(['', Validators.required]),
      schoolName: new FormControl(['', Validators.required]),
      schlPassedOutYear: new FormControl(['', Validators.required]),
      collegeName: new FormControl(['', Validators.required]),
      clgPassedOutYear: new FormControl(['', Validators.required]),
      currentPosition: new FormControl(['', Validators.required]),
      skills: new FormControl(['', Validators.required]),
      location: new FormControl(['', Validators.required]),
      jobseekerIndustries: this.fb.array([]),
    });
    this.getUser();
  }

  addIndustry(): void {
    const industry = this.fb.group({
      industryName: ['', Validators.required],
      role: ['', Validators.required],
      duration: ['', Validators.required]
    });
    this.jobseekerIndustries.push(industry);
  }

  removeIndustry(index: number) {
    this.jobseekerIndustries.removeAt(index);
  }

  get jobseekerIndustries(): FormArray {
    return this.userForm.get('jobseekerIndustries') as FormArray;
  }

  image(event: any) {
    this.file = event.target.files[0];
  }

  getUser() {
    this.loginService.getUser().subscribe({
      next: (details) => {
        this.profileImage = details.image;
        this.userForm = this.fb.group({
          _id: [details._id],
          name: [details.name, Validators.required],
          email: [details.email, Validators.required],
          password: [details.password, Validators.required],
          companyName: [details.companyName, Validators.required],
          companyType: [details.companyType, Validators.required],
          empCount: [details.empCount, Validators.required],
          phoneno: [details.phoneno, Validators.required],
          dob: [details.dob, Validators.required],
          headline: [details.headline, Validators.required],
          schoolName: [details.schoolName, Validators.required],
          schlPassedOutYear: [details.schlPassedOutYear, Validators.required],
          collegeName: [details.collegeName, Validators.required],
          clgPassedOutYear: [details.clgPassedOutYear, Validators.required],
          currentPosition: [details.currentPosition, Validators.required],
          skills: [details.skills, Validators.required],
          location: [details.location, Validators.required],
          jobseekerIndustries: this.fb.array([]),
        });

        if (details.industries !== null) {
          for (let x of details.industries) {
            const industry = this.fb.group({
              industryName: [x.industryName, Validators.required],
              role: [x.role, Validators.required],
              duration: [x.duration, Validators.required]
            });
            this.jobseekerIndustries.push(industry);
          }
        }
        else {
          this.addIndustry();
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  update() {
    const formData: FormData = new FormData();
    formData.append('image', this.file === "" ? new Blob([]) : this.file);
    this.profileService.update(this.userForm.value, formData);
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
