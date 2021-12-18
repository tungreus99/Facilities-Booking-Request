import { AuthenticateService } from './../core/service/authenticate.service';
import { SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppAuthService } from '@shared/auth/app-auth.service';

@Component({
  selector: 'header-user-menu',
  templateUrl: './header-user-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserMenuComponent {
  constructor(private authenService: AuthenticateService, private googleAuthService: SocialAuthService, private router:Router) {}

  logout(): void {
    this.googleAuthService.signOut()
    this.router.navigate(["account/login"])
  }
}
