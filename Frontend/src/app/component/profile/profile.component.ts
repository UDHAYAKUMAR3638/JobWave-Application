import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService, User } from './profile.service';
import { LoginService } from '../login/login.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent {
  file: File | string = "";
  userForm!: FormGroup;
  profileImage!: string;
  loginApi: Subscription = new Subscription();
  jobApi: Subscription = new Subscription();
  updateApi: Subscription = new Subscription();

  constructor(private profileService: ProfileService, private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.userForm = new FormGroup({
      _id: new FormControl(['']),
      name: new FormControl(['', Validators.required]),
      email: new FormControl(['', Validators.required]),
      password: new FormControl(['', Validators.required]),
      companyName: new FormControl(['', Validators.required]),
      companyType: new FormControl(['', Validators.required]),
      empCount: new FormControl(['', Validators.required]),
      phoneno: new FormControl(['', Validators.required]),
      dob: new FormControl([new Date(), Validators.required]),
      headline: new FormControl(['', Validators.required]),
      schoolName: new FormControl(['', Validators.required]),
      schlPassedOutYear: new FormControl(['', Validators.required]),
      collegeName: new FormControl(['', Validators.required]),
      clgPassedOutYear: new FormControl(['', Validators.required]),
      currentPosition: new FormControl(['', Validators.required]),
      skills: new FormControl(['', Validators.required]),
      location: new FormControl(['', Validators.required]),
      about: new FormControl(['', Validators.required]),
      jobseekerIndustries: this.formBuilder.array([]),
    });
    this.getUser();

  }

  addIndustry(): void {
    const industry = this.formBuilder.group({
      industryName: ['', Validators.required],
      role: ['', Validators.required],
      duration: ['', Validators.required]
    });
    this.jobseekerIndustries.push(industry);

  }

  removeIndustry(index: number): void {
    this.jobseekerIndustries.removeAt(index);
  }

  get jobseekerIndustries(): FormArray {
    return this.userForm.get('jobseekerIndustries') as FormArray;
  }

  image(event: Event): void {
    const fileEvent = event.target as HTMLInputElement;
    if (fileEvent.files) {
      this.file = fileEvent.files[0];
    }
  }

  getUser(): void {
    this.loginApi = this.loginService.getUser().subscribe({
      next: (details: User) => {
        this.profileImage = details.image;
        this.userForm.patchValue({
          _id: details._id,
          name: details.name,
          email: details.email,
          password: details.password,
          companyName: details.companyName,
          companyType: details.companyType,
          empCount: details.empCount,
          phoneno: details.phoneno,
          dob: new Date(details.dob),
          headline: details.headline,
          schoolName: details.schoolName,
          schlPassedOutYear: details.schlPassedOutYear,
          collegeName: details.collegeName,
          clgPassedOutYear: details.clgPassedOutYear,
          currentPosition: details.currentPosition,
          skills: details.skills,
          location: details.location,
          about: details.about,
        });

        if (details?.industries !== null) {
          details.industries.forEach(x => {
            const industry = this.formBuilder.group({
              industryName: [x.industryName, Validators.required],
              role: [x.role, Validators.required],
              duration: [x.duration, Validators.required]
            });
            this.jobseekerIndustries.push(industry);
          }
          );
        }

      },
    });

  }

  update(): void {
    const formData: FormData = new FormData();
    formData.append('image', this.file === "" ? new Blob([]) : this.file);
    this.jobApi = this.profileService.update(this.userForm.value, formData).subscribe({
      next: () => {

        if (this.userForm.get('jobseekerIndustries') !== null)
          this.updateIndustry();
        else
          this.alertService.alertMessage('Profile Updation', 'Successfully', 'success');

        this.getUser();
      },

      error: () => {
        this.alertService.alertMessage('Profile Updation', 'Failed', 'error');
      }
    });
  }

  updateIndustry(): void {
    this.updateApi = this.profileService.updateIndustry(this.userForm.value).subscribe({
      next: () => {
        this.alertService.alertMessage('Profile Updation', 'Successfully', 'success');
      },
      error: () => {
        this.alertService.alertMessage('Profile Updation', 'Failed', 'error');
      }
    })
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.loginApi.unsubscribe();
    this.jobApi.unsubscribe();
    this.updateApi.unsubscribe();
  }
}
