import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';
import { User } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Gorila - Login');
  }

  ngOnInit(): void {
    this.createLoginForm(new User());
  }
  createLoginForm(user: User) {
    this.loginForm = new FormGroup({
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
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  async onSubmit() {
    try {
      this.loading = true;
      const res: any = await lastValueFrom(
        this.authService.login(this.loginForm.value)
      );
      localStorage.setItem(
        'currentUser',
        JSON.stringify({ user: res.user, token: res.token })
      );
      this.toastr.success('Logado com sucesso!', 'Sucesso!');
      this.router.navigate(['/investments']);
    } catch (error: any) {
      this.toastr.error('Usuário ou senha inválidos!', 'Erro!');
    }
    this.loading = false;
  }
}
