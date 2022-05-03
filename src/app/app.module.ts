import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './components/register/register.component';
import { APP_BASE_HREF, DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ConfirmComponent } from './components/register/confirm/confirm.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { NavComponent } from './components/nav/nav.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CurrencyAccountComponent } from './components/currency-account/currency-account.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CurrencyAccountPipe } from './pipe/currency-account.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CurrencyAccountFilterPipe } from './pipe/currency-account-filter.pipe';
import { UserComponent } from './components/user/user.component';
import { UserPipe } from './pipe/user.pipe';
import { UserFilterPipe } from './pipe/user-filter.pipe';
import { UserOperationClaimComponent } from './components/user/user-operation-claim/user-operation-claim.component';
import { OperationClaimPipe } from './pipe/operation-claim.pipe';
import { CompanyComponent } from './components/company/company.component';
import { CompanyPipe } from './pipe/company.pipe';
import { CompanyFilterPipe } from './pipe/company-filter.pipe';
import { QuillModule } from 'ngx-quill';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AccountReconciliationComponent } from './components/account-reconciliation/account-reconciliation.component';
import { AccountReconciliationPipe } from './pipe/account-reconciliation.pipe';
import { AccountReconciliationFilterPipe } from './pipe/account-reconciliation-filter.pipe';
import { AccountReconciliationResultComponent } from './components/account-reconciliation/account-reconciliation-result/account-reconciliation-result.component';
import { MyChartComponent } from './components/my-chart/my-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmComponent,
    ForgotPasswordComponent,
    NavComponent,
    SidenavComponent,
    CurrencyAccountComponent,
    CurrencyAccountPipe,
    CurrencyAccountFilterPipe,
    UserComponent,
    UserPipe,
    UserFilterPipe,
    UserOperationClaimComponent,
    OperationClaimPipe,
    CompanyComponent,
    CompanyPipe,
    CompanyFilterPipe,
    AccountReconciliationComponent,
    AccountReconciliationPipe,
    AccountReconciliationFilterPipe,
    AccountReconciliationResultComponent,
    MyChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularEditorModule,
    NgxSpinnerModule,
    QuillModule.forRoot(),
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      closeButton: true
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: 'apiUrl', useValue: 'https://localhost:7220/api/' },
    { provide: 'validHatasi', useValue: 'Zorunlu alanları doldurun' },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    [DatePipe]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
