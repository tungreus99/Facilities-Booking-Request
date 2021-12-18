import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { TokenService, LogService, UtilsService } from 'abp-ng2-module';
import { AppConsts } from '@shared/AppConsts';
import { UrlHelper } from '@shared/helpers/UrlHelper';


@Injectable()
export class AppAuthService {
    // authenticateModel: AuthenticateModel;
    // authenticateResult: AuthenticateResultModel;
    // // rememberMe: boolean;

    // constructor(
    //     private _tokenAuthService: ,
    //     private _router: Router,
    //     private _utilsService: UtilsService,
    //     private _tokenService: TokenService,
    //     private _logService: LogService
    // ) {
    //     this.clear();
    // }

    // logout(reload?: boolean): void {
    //     abp.auth.clearToken();
    //     abp.utils.setCookieValue(
    //         AppConsts.authorization.encryptedAuthTokenName,
    //         undefined,
    //         undefined,
    //         abp.appPath
    //     );
    //     if (reload !== false) {
    //         location.href = AppConsts.appBaseUrl;
    //     }
    // }

    // authenticate(finallyCallback?: () => void): void {
    //     finallyCallback = finallyCallback || (() => { });

    //     this._tokenAuthService
    //         .authenticate(this.authenticateModel)
    //         .pipe(
    //             finalize(() => {
    //                 finallyCallback();
    //             })
    //         )
    //         .subscribe((result: AuthenticateResultModel) => {
    //             this.processAuthenticateResult(result);
    //         });
    // }

    // public processAuthenticateResult(
    //     authenticateResult: AuthenticateResultModel
    // ) {
    //     this.authenticateResult = authenticateResult;

    //     if (authenticateResult.accessToken) {
    //         // Successfully logged in
    //         this.login(
    //             authenticateResult.accessToken,
    //             authenticateResult.encryptedAccessToken,
    //             authenticateResult.expireInSeconds,
    //             // this.rememberMe
    //         );
    //     } else {
    //         // Unexpected result!

    //         this._logService.warn('Unexpected authenticateResult!');
    //         this._router.navigate(['account/login']);
    //     }
    // }

    // private login(
    //     accessToken: string,
    //     encryptedAccessToken: string,
    //     expireInSeconds: number,
    
    // ): void {
     
      

    //     this._tokenService.setToken(accessToken);

    //     this._utilsService.setCookieValue(
    //         AppConsts.authorization.encryptedAuthTokenName,
    //         encryptedAccessToken,
        
    //     );

    //     let initialUrl = UrlHelper.initialUrl;
    //     if (initialUrl.indexOf('/login') > 0) {
    //         initialUrl = AppConsts.appBaseUrl;
    //     }

    //     location.href = initialUrl;
    // }

    // private clear(): void {
    //     this.authenticateModel = new AuthenticateModel();
    //     // this.authenticateModel.rememberClient = false;
    //     this.authenticateResult = null;
    //     // this.rememberMe = false;
    // }
}
