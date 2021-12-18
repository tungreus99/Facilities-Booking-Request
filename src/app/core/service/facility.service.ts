import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class FacilityService extends BaseApiService {


  constructor(
    http: HttpClient, private router: Router
  ) {
    super(http);
  }

  changeUrl() {
    return 'api/Facility';
  }
  getAllFacility(): Observable<any> {
    return this.http.get(this.baseUrl + `api/icpdp/getAllFacilityDB`, this.httpOptions)
  }
  public UpdateFileFacility(file, id): Observable<any> {
    const formData = new FormData();
    // if (navigator.msSaveBlob) {
    //     formData.append('File', file);
    // } else {

    // }
    formData.append('file', file);
    const uploadReq = new HttpRequest(
      'POST', this.baseUrl + 'api/uploadEvent', formData,
      {
        headers: new HttpHeaders({
          'Authorization': ("Bearer" + " " + localStorage.getItem("userToken")).trim(),

        }),

        reportProgress: true

      },

    );

    return this.http.request(uploadReq);

  }
  exportFacility(): Observable<any> {
    return this.http.get(this.baseUrl + `api/exportFacility`, this.httpOptions)
  }
  exportFacilityTemplate(): Observable<any> {
    return this.http.get(this.baseUrl + `api/exportFacilityTemplate`, this.httpOptions)
  }
  public handleError(error: any) {
    if (error.status == 401) {
      return throwError("401");

    }
    return throwError("");

  }
}
