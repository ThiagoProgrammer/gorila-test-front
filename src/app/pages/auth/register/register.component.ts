import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.createRegisterForm(new User());
  }
  createRegisterForm(user: User) {
    this.registerForm = new FormGroup({
      email: new FormControl(
        user.email,
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl(
        user.password,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  async onSubmit() {
    try {
      const res: any = await lastValueFrom(
        this.authService.register(this.registerForm.value)
      );
      localStorage.setItem(
        'currentUser',
        JSON.stringify({ user: res.user, token: res.token })
      );
      this.router.navigate(['/investments']);
    } catch (error) {
      console.log(error);
    }
  }
}
