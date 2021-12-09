import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValuedPositionSimplifiedComponent } from './pages/valued-position-simplified/valued-position-simplified.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './pages/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    ValuedPositionSimplifiedComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],

  bootstrap: [AppComponent],
})
export class AppModule {}
