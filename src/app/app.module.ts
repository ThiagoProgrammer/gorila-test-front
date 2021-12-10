import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValuedPositionSimplifiedComponent } from './pages/valued-position-simplified/valued-position-simplified.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import {
  CommonModule,
  CurrencyPipe,
  registerLocaleData,
} from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { TokenInterceptor } from './helpers/http.interceptor';
import localePt from '@angular/common/locales/pt';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ToastrModule } from 'ngx-toastr';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { PercentagePipe } from './pipes/percentage.pipe';
import { BrlPipe } from './pipes/brl.pipe';
registerLocaleData(localePt, 'pt');
@NgModule({
  declarations: [
    AppComponent,
    ValuedPositionSimplifiedComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    PercentagePipe,
    BrlPipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    NgxCurrencyModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    CurrencyPipe,
    PercentagePipe,
    { provide: LOCALE_ID, useValue: 'pt' },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
