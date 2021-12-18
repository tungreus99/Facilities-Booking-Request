import { reportDto } from './../../home/report-dialog/report-dialog.component';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseApiService{
  public requestListItem =[]
  changeUrl() {
    return 'api/student';
  }

  constructor(http:HttpClient, private router: Router) {
    super(http)
   }
   public getRequestByAccount(accountId:any):Observable<any>{
     console.log(this.httpOptions)
    return this.http.get(this.baseUrl+`api/student/getRequestByAccountId/${accountId}`, this.httpOptions)
   }
   public getRequestDetailByFacility(roomId:any):Observable<any>{
    return this.http.get(this.baseUrl+`api/getRequestDetailByFacility/${roomId}`,this.httpOptions)

   }
   public addRequest(requestBody):Observable<any>{
    return this.http.post(this.rootUrl+`/addRequest`,requestBody,this.httpOptions)

   }
   public getRequestDetail(requestId:any):Observable<any>{
    return this.http.get(this.baseUrl+`api/getRequestDetail/${requestId}`,this.httpOptions)
   }
   public getRequestDetailByDate(date):Observable<any>{
    return this.http.get(this.baseUrl+`api/getRequestDetailByDate/${date}`,this.httpOptions)

   }

   public updateRequestDetailStatus(requestId, requestDetail):Observable<any>{
    return this.http.put(this.baseUrl+`api/updateRequestDetailStatus/${requestId}`,requestDetail,this.httpOptions)

   }
   public report(report:reportDto):Observable<any>{
    return this.http.post(this.baseUrl+`api/report`,report,this.httpOptions)

   }
   public handleError(error: any) {
    if (error.status == 401) {
      return throwError("401");

    }
    return throwError("");
  }
   
}
