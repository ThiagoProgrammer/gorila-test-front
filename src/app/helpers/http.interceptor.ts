import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: any = this.authService.getCurrentUser();
    if (token) {
      if (!token) {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
      }
      request = request.clone({
        setHeaders: {
          Authentication: `Bearear ${token}`,
        },
      });
      return next.handle(request);
    } else {
      return next.handle(request);
    }
  }
}
