import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { AddUserService, User } from './add-user.service';

@Component({
  selector: 'app-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})


export class UserComponent {

  constructor(
    private fb: FormBuilder,
    private addUserService: AddUserService
  ) { }

  addUserForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    role: ['', Validators.required]
  });

  register() {
    if (!this.addUserForm.invalid) {

      this.addUserService.addUser(<User>this.addUserForm.value).subscribe({
        next: () => {
          Swal.fire({
            title: 'New User AddedSuccessfully',
            icon: 'success'
          })
        },
        error: () => {
          Swal.fire({
            title: "Enter Valid User Details!",
            text: "Try again",
            icon: "error",
          });
        },
      });
    }
  }

}
