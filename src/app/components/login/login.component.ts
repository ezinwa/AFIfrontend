import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrganicRouterService } from 'src/app/service/organic-router.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginSwitch: boolean = true;

  public loginform: FormGroup;
  public message: string;

  constructor(private fb: FormBuilder, private service: UserService, private organicroute: OrganicRouterService) {

    this.loginform = this.fb.group({
      /* we connect the html to the backend here, in the input tag we use formControlName="<variable name>" and those are connected to the variables below, eg email & password in this case*/
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
      ]),
      role: new FormControl(''),
    });
  }

  ngOnInit(): void { }

  get email() {
    return this.loginform.get('email');
  }

  get password() {
    return this.loginform.get('password');
  }

  get role() {
    return this.loginform.get('role');
  }
  
  login() {

    let x = this.loginform.controls["role"].value
    this.service.logInUser(this.loginform.controls["email"].value,this.loginform.controls["password"].value,this.loginform.controls["role"].value).subscribe(
      (res) => {
        console.log(res)
        sessionStorage.setItem("loggedin", "true");
        sessionStorage.setItem("role", this.loginform.controls["role"].value)
        sessionStorage.setItem("email", this.loginform.controls["email"].value)

        if (x === "COMPANY") {
          // this.organicroute.openAdcreation()
          //window.location.reload();
          this.service.updatemenu.next()

        } else if (x === "SUBSCRIBER") {
          // window.location.reload();
          // this.organicroute.openMinsidor()
          this.service.updatemenu.next()

        }


      }
    )
  }

}
