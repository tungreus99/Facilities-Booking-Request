import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BaseApiService } from './base-api.service';
@Injectable({
  providedIn: 'root'
})
export class ClubService extends BaseApiService {

  constructor(http: HttpClient, private router: Router) {
    super(http);
  }

  changeUrl() {
    return 'api/ClubDetail';
  }

  getAllClubs(): Observable<any> {
    return this.http.get(this.baseUrl + `api/icpdp/getAllClubDB`, this.httpOptions)
  }
  getClubDetail(clubId): Observable<any> {
    return this.http.get(this.baseUrl + `api/getClubDetail/${clubId}`, this.httpOptions)
  }



  public UpdateFileClub(file): Observable<any> {
    const formData = new FormData();
    // if (navigator.msSaveBlob) {
    //     formData.append('File', file);
    // } else {

    // }
    formData.append('file', file);
    const uploadReq = new HttpRequest(
      'POST', this.baseUrl + 'api/upload', formData,
      {
        headers: new HttpHeaders({
          'Authorization': ("Bearer" + " " + localStorage.getItem("userToken")).trim(),

        }),

        reportProgress: true

      },

    );

    return this.http.request(uploadReq);
    // console.log(formData)
    // return null
  }
  exportClub(): Observable<any> {
    return this.http.get(this.baseUrl + `api/exportClub`, this.httpOptions)
  }
  exportClubTemplate(): Observable<any> {
    return this.http.get(this.baseUrl + `api/exportClubTemplate`, this.httpOptions)
  }
  public handleError(error: any) {
    if (error.status == 401) {
      return throwError("401");

    }
    return throwError(error);

  }
}
