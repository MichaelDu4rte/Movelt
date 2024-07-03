import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { Component } from '@angular/core';
import { InputPrimaryComponent } from '../../components/input-primary/input-primary.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, InputPrimaryComponent],
  providers: [LoginService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent {
  signupForm!: FormGroup;

  constructor(private router: Router, private loginService: LoginService, private toast : ToastrService) {
    this.signupForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
     
    });
  }

  submit() {
    this.loginService.login(this.signupForm.value.email, this.signupForm.value.password).subscribe({
      next: () => this.toast.success("Login Success"),
      error: () => this.toast.error("Login Error"),
    });
  }

  navigate() {
    console.log("navigate");
    this.router.navigate(['/login']);
  }
}
