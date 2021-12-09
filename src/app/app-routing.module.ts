import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValuedPositionSimplifiedComponent } from './pages/valued-position-simplified/valued-position-simplified.component';
import { RegisterComponent } from './pages/auth/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    canActivate: [AuthGuard],
    path: 'investments',
    component: ValuedPositionSimplifiedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
