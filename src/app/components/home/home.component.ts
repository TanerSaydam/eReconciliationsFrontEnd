import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserThemeOption } from 'src/app/models/userThemeOptionModel';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  jwtHelper: JwtHelperService = new JwtHelperService;

  userThemeOption: UserThemeOption = {
    sidenavType: "dark",
    id: 0,
    mode: "",
    sidenavColor: "primary",
    userId: 0
  };

  styleClass = "";
  isAuthenticated: boolean = false;
  companyId: string;
  userId: string;

  constructor(
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.getUserTheme();
  }

  changeStyleClass(text: string) {
    return "fixed-plugin ps " + text;
  }

  refresh() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      let token = localStorage.getItem("token");
      let decode = this.jwtHelper.decodeToken(token);

      let companyId = Object.keys(decode).filter(x => x.endsWith("/anonymous"))[0];
      let userId = Object.keys(decode).filter(x => x.endsWith("/nameidentifier"))[0];
      this.companyId = decode[companyId];
      this.userId = decode[userId];
    }
  }

  getUserTheme() {
    this.showSpinner();
    this.userService.getTheme(this.userId).subscribe((res) => {
      this.userThemeOption = res.data
      this.hideSpinner();
    }, (err) => {
      console.log(err);
      this.hideSpinner();
    })
  }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

}
