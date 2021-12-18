import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class RequestLogService extends BaseApiService {

  constructor(http: HttpClient, private router: Router) {
    super(http);
  }

  changeUrl() {
    return 'api/icpdp/';
  }
  getAllListRqLog(): Observable<any> {
    return this.http.get(this.rootUrl + "getListRequestLog",this.httpOptions)
  }
  public handleError(error: any) {
    if (error.status == 401) {
      return throwError("401");

    }
    return throwError(error);
  }

  deleteRequestLog(requestLogId): Observable<any> {
    return this.http.delete(this.rootUrl + `deleteRequestLog/${requestLogId}`, this.httpOptions)

  }
  
}
