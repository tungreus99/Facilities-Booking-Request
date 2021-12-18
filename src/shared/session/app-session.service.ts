import { AbpMultiTenancyService } from 'abp-ng2-module';
import { Injectable } from '@angular/core';


@Injectable()
export class AppSessionService {

    // private _user: UserLoginInfoDto;
    // private _tenant: TenantLoginInfoDto;
    // private _application: ApplicationInfoDto;

    // constructor(
    //     private _sessionService: SessionServiceProxy,
    //     private _abpMultiTenancyService: AbpMultiTenancyService) {
    // }

    // get application(): ApplicationInfoDto {
    //     return this._application;
    // }


 


    // getShownLoginName(): string {
    //     const userName = "admin";
    //     if (!this._abpMultiTenancyService.isEnabled) {
    //         return userName;
    //     }

    //     return (this._tenant ? this._tenant.tenancyName : '.') + '\\' + userName;
    // }

    // init(): Promise<boolean> {
    //     return new Promise<boolean>((resolve, reject) => {
    //         this._sessionService.getCurrentLoginInformations().toPromise().then((result: GetCurrentLoginInformationsOutput) => {
    //             this._application = result.application;
    //             this._user = result.user;
    //             this._tenant = result.tenant;

    //             resolve(true);
    //         }, (err) => {
    //             reject(err);
    //         });
    //     });
    // }

    // changeTenantIfNeeded(tenantId?: number): boolean {
    //     if (this.isCurrentTenant(tenantId)) {
    //         return false;
    //     }

    //     abp.multiTenancy.setTenantIdCookie(tenantId);
    //     location.reload();
    //     return true;
    // }

    // private isCurrentTenant(tenantId?: number) {
    //     if (!tenantId && this.tenant) {
    //         return false;
    //     } else if (tenantId && (!this.tenant || this.tenant.id !== tenantId)) {
    //         return false;
    //     }

    //     return true;
    // }
}
