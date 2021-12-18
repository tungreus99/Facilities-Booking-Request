import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseApiService {

  constructor(http: HttpClient, private router: Router) {
    super(http);
  }

  changeUrl() {
    return 'api/icpdp/';
  }
  getAllAccount(): Observable<any> {
    return this.http.get(this.rootUrl + "ListAllAccount",this.httpOptions)
  }
  public handleError(error: any) {
    if (error.status == 401) {
      return throwError("401");

    }
    return throwError(error);

  }
}
