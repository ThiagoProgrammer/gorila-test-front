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
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    const currentUser: any = this.authService.getCurrentUser();
    if (currentUser.token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
