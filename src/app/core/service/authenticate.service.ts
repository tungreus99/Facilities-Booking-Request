import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { AccountDto } from './../modal/accountDto';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { AppConsts } from '@shared/AppConsts';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService extends BaseApiService {
  public account = {} as AccountDto
  public rememberMe: boolean = false
  public user: SocialUser = null
  public userId: number
  public requestTypeStatus
  public clubMember:boolean
  public userRole:string =""
  public userName:string =""
  constructor(
    http: HttpClient , private router: Router
  ) {
    super(http);
  }

  changeUrl() {
    return 'authenticate';
  }
  login(): Observable<any> {
    this.account.passWord = ""
    return this.http.post<any>(this.rootUrl + '/login', this.account);
  }
  logout(): Observable<any> {
    return this.http.post<any>(this.rootUrl + '/logout', this.account);
  }
  public handleError(error: any) {
    if (error.status == 401) {
      return throwError("401");

    }
    return throwError(error);

  }

}
