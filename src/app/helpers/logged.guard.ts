import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = await localStorage.getItem('key');

    if (token) {
      await this.router.navigate(['/crypto-valued-position']);
      return true;
    } else {
      // User is Logged Out, so can't active

      return true;
    }
  }
}
