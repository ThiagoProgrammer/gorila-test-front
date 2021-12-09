import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserAuthDTO } from '../dto/userAuth.dto';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  login(login: UserAuthDTO) {
    return this.http.post(`${environment.api_url}/auth/login`, login);
  }

  register(register: UserAuthDTO) {
    return this.http.post(`${environment.api_url}/auth/register`, register);
  }
}
