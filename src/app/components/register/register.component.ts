import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup

  constructor(private fb: FormBuilder, private service: UserService) {
    this.registerForm = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern("[a-zA-Z ]*")]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern("[a-zA-Z ]*")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      prenumNumber: new FormControl('', [Validators.required, Validators.minLength(8)]),
      orgNumber: new FormControl('', [Validators.required, Validators.minLength(8)]),

      phoneNumber: new FormControl(''),
      role: new FormControl('SUBSCRIBER'),
      city: new FormControl(''),
      street: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  register() {

    console.log(this.registerForm.value)
    this.service.createUser(this.registerForm.value).subscribe(
      (res) => {

        console.log("new user registered")
      }
    )
  }
}
