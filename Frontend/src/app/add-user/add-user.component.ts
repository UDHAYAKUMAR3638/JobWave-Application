import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AddUserService, User } from './add-user.service';
import { Subscription } from 'rxjs';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})


export class UserComponent {

  constructor(
    private formBuilder: FormBuilder,
    private addUserService: AddUserService,
    private alertService: AlertService
  ) { }

  userApi: Subscription = new Subscription();

  addUserForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    role: ['', Validators.required],
  });


  register(): void {

    if (!this.addUserForm.invalid) {
      this.userApi = this.addUserService.addUser(<User>this.addUserForm.value).subscribe({
        next: () => {
          this.alertService.alertMessage('New User AddedSuccessfully', '', 'success');
        },
        error: () => {
          this.alertService.alertMessage('Enter Valid User Details!', 'Try again', 'error');
        },
      });
    }

  }

  ngOnDestroy() {
    this.userApi.unsubscribe();
  }

}
