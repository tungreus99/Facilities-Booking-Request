import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { BaseApiService } from "./base-api.service";

@Injectable({
  providedIn: "root",
})
export class EventService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  changeUrl() {
    return "api/EventDetail";
  }
  getAllEvent(): Observable<any> {
    return this.http.get(this.baseUrl + `api/icpdp/getAllEventDB`, this.httpOptions);
  }
  getEventDetail(id): Observable<any> {
    return this.http.get(this.baseUrl + `api/getEventDetail/${id}`, this.httpOptions);
  }
  public UpdateFileEvent(file): Observable<any> {
    const formData = new FormData();

    formData.append('file', file);
    const uploadReq = new HttpRequest(
      'POST', this.baseUrl + 'api/icpdp/uploadEvent', formData,
      {
        headers: new HttpHeaders({
          'Authorization': ("Bearer" + " " + localStorage.getItem("userToken")).trim(),
        }),
        reportProgress: true
      },
    );
    return this.http.request(uploadReq);
  }
  exportEvent(): Observable<any> {
    return this.http.get(this.baseUrl + `api/exportEvent`, this.httpOptions)
  }
  exportEventTemplate(): Observable<any> {
    return this.http.get(this.baseUrl + `api/icpdp/exportEventTemplate`, this.httpOptions)
  }

  public handleError(error: any) {
    if (error.status == 401) {
      return throwError("401");

    }
    return throwError("");

  }


}
