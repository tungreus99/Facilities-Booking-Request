import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseApiService {

  constructor(http: HttpClient , private router: Router) {
    super(http);
  }

  changeUrl() {
    return 'api/admin';
  }
  addAccount(account): Observable<any> {
    return this.http.post(this.rootUrl + `/addAccount`, account, this.httpOptions)

  }

  updateAccount(account,id): Observable<any> {
    delete account["id"]
    delete account["email"]

    return this.http.post(this.baseUrl + `api/icpdp/updateAccount/${id}`, account, this.httpOptions)
  }
  accountDetail(account): Observable<any> {
    return this.http.get(this.baseUrl + `api/icpdp/accountDetail/${account.id}`, this.httpOptions)

  }
 
  deleteAccount(id): Observable<any> {
    return this.http.delete(this.rootUrl + `/deleteAccount/${id}`, this.httpOptions)

  }
  public handleError(error: any) {
    if (error.status == 401) {
      return throwError("401");

    }
    return throwError(error);

  }
  adminDeleteClub(id): Observable<any> {
    return this.http.delete(this.rootUrl + `/deleteClub/${id}`, this.httpOptions)

  }
  getAllClubs(): Observable<any> {
    return this.http.get(this.rootUrl + `/getAllClubDB/` , this.httpOptions)
  }

  getAllEvent(): Observable<any> {
    return this.http.get(this.rootUrl + `/getAllEventDB/` , this.httpOptions)
  }

  adminDeleteEvent(id): Observable<any> {
    return this.http.delete(this.rootUrl + `/deleteEvent/${id}`, this.httpOptions)

  }

  getAllFacility(): Observable<any> {
    return this.http.get(this.rootUrl + `/getAllFacilityDB/` , this.httpOptions)
  }
}
