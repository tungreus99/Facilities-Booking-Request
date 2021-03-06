import { LoginComponent } from './login/login.component';
import { SocialAuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AccountComponent } from './account.component';
import { AccountLanguagesComponent } from './layout/account-languages.component';
import { AccountHeaderComponent } from './layout/account-header.component';
import { AccountFooterComponent } from './layout/account-footer.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        SharedModule,
        AccountRoutingModule,
        ModalModule.forChild(),
        SocialLoginModule
    ],
    declarations: [
        AccountComponent,
        LoginComponent,
        AccountLanguagesComponent,
        AccountHeaderComponent,
        AccountFooterComponent,
        // tenant
    ],
    providers: [
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: true,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider('383904693502-3tqm80gd3oq4qoq06dpl9fevvrt33h0d.apps.googleusercontent.com')

              },
            ],
          } as SocialAuthServiceConfig,
        }
      ],
    entryComponents: [
        // tenant
    ]
})
export class AccountModule {

}
