import { AuthenticateService } from './../../app/core/service/authenticate.service';
import { Router } from '@angular/router';
import { Component, Injector } from '@angular/core';
import { AbpSessionService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/app-component-base';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { BaseApiService } from '@app/core/service/base-api.service';

@Component({
  templateUrl: './login.component.html',
  animations: [accountModuleAnimation()]
})
export class LoginComponent extends AppComponentBase {
  submitting = false;
  user: SocialUser
  loggedIn: boolean;
  processLogin: boolean = false

  constructor(
    injector: Injector,
    public authService: AppAuthService,
    public authenService: AuthenticateService, private googleAuthService: SocialAuthService,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.googleAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn && this.processLogin) {
        this.authenticateGoogle(this.user);
      }
    });
  }

  login(): void {

    this.authenService.login().subscribe(rs => {
      if (rs.role == 'ROLE_STUDENT' || rs.role == 'ROLE_ADMIN') {
        this.router.navigate(["app/home"])
      }
      else {
        this.router.navigate(["app/manage-request"])
      }
      this.authenService.userRole = rs.role
      this.authenService.userId = rs.id
      this.authenService.clubMember = rs.clubmember
      this.authenService.setToken(rs.jwtToken)
      this.authenService.requestTypeStatus = rs.requestTypeStatus


    
      localStorage.setItem("userName", rs.userName)
      localStorage.setItem("userToken", rs.jwtToken)
      localStorage.setItem("userId", rs.id)
      localStorage.setItem("requestTypeStatus", rs.requestTypeStatus)
      localStorage.setItem("clubMember", rs.clubmember)
      localStorage.setItem("userRole", rs.role)
      localStorage.setItem("accountName", rs.fullName)
      this.processLogin = false
    },
      () => {
        this.router.navigate(["account/login"])
      })
  }
  signInWithGoogle() {
    this.processLogin = true
    this.googleAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  authenticateGoogle(user: any, finallyCallback?: () => void): void {
    finallyCallback = finallyCallback || (() => { });
    this.authenService.account.email = user.email
    this.authenService.account.passWord = ""
    this.authenService.account.fullName = user.name
    this.authenService.login().subscribe(rs => {
      if (rs.role == 'ROLE_STUDENT') {
        this.router.navigate(["app/home"])
      }
      else if (rs.role == 'ROLE_ADMIN') {
        this.router.navigate(["app/admin"])
      }
      else if (rs.role == 'ROLE_SRO') {
        this.router.navigate(["app/SRO"])
      }
      else {
        this.router.navigate(["app/manage-request"])
      }
      this.authenService.userRole = rs.role
      this.authenService.userId = rs.id
      this.authenService.clubMember = rs.clubmember
      this.authenService.setToken(rs.jwtToken)
      this.authenService.requestTypeStatus = rs.requestTypeStatus
      localStorage.setItem("userName", rs.userName)
      localStorage.setItem("userToken", rs.jwtToken)
      localStorage.setItem("userId", rs.id)
      localStorage.setItem("requestTypeStatus", rs.requestTypeStatus)
      localStorage.setItem("clubMember", rs.clubmember)
      localStorage.setItem("userRole", rs.role)
      localStorage.setItem("accountName", rs.fullName)
      this.processLogin = false
    },
      () => {
        this.router.navigate(["account/login"])
      })
  }

}
