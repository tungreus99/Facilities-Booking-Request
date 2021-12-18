import { Router } from '@angular/router';
import { facitilyDto } from './../modal/facilityDto';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class IcpdpService extends BaseApiService {

  changeUrl() {
    return 'api/icpdp';
  }

  constructor(http: HttpClient, private router: Router) {
    super(http)
  }
  public getPendingRequest(): Observable<any> {
    return this.http.get(this.rootUrl + `/getPendingRequest`, this.httpOptions)
  }
  public getgetRequestDetail(requestId: any): Observable<any> {
    return this.http.get(this.rootUrl + `/getRequestDetail${requestId}`, this.httpOptions)
  }


  public getFacilityByBuilding(): Observable<any> {
    return this.http.get(this.baseUrl + `api/getFacilityByBuilding`, this.httpOptions)
  }
  public getRoomByBuilding(buildingId: string, bookByClub:boolean): Observable<any> {
    return this.http.get(this.baseUrl + `api/getRoomByBulding/${buildingId}/${bookByClub}`, this.httpOptions)
  }
  public getFacilityByName(facilityName: string): Observable<any> {
    return this.http.get(this.baseUrl + `api/getFacilityByName/${facilityName}`, this.httpOptions)
  }
  public AddFacility(facility: facitilyDto): Observable<any> {
    return this.http.post(this.rootUrl + `/addFacility`, facility, this.httpOptions)
  }
  public UpdateFacility(facility: facitilyDto, id: number): Observable<any> {
    return this.http.put(this.rootUrl + `/updateFacility/${id}`, facility, this.httpOptions)
  }
  public deleteFacility(facilityId: number): Observable<any> {
    return this.http.delete(this.rootUrl + `/deleteFacilityDB/${facilityId}`, this.httpOptions)
  }



  updateRequest(requestId, request: any): Observable<any> {
    return this.http.put(this.rootUrl + `/updateRequestStatus/${requestId}`, request, this.httpOptions)

  }
  deleteRequest(requestId): Observable<any> {
    return this.http.put(this.baseUrl + `api/deleteRequest/${requestId}`, {}, this.httpOptions)

  }

  // Club service
  AddClub(club): Observable<any> {
    return this.http.post(this.rootUrl + `/addClubDetail`, club, this.httpOptions)

  }
  UpdateClub(club, clubId): Observable<any> {
    return this.http.put(this.rootUrl + `/updateClub/${clubId}`, club, this.httpOptions)

  }
  deleteClub(clubId): Observable<any> {
    return this.http.delete(this.rootUrl + `/deleteClub/${clubId}`,  this.httpOptions)

  }

  // Event service
  AddEvent(event): Observable<any> {
    return this.http.post(this.rootUrl + `/addEventDetail`, event, this.httpOptions)

  }
  UpdateEvent(event, eventId): Observable<any> {
    return this.http.put(this.rootUrl + `/updateEvent/${eventId}`, event, this.httpOptions)

  }

  getAllOldEvents(): Observable<any> {
    return this.http.get(this.rootUrl + `/OldEventDetail`, this.httpOptions)
  }

  deleteEvent(eventId): Observable<any> {
    return this.http.delete(this.rootUrl + `/deleteEvent/${eventId}`,  this.httpOptions)

  }
  setRequestTypeStatus(status): Observable<any> {
    return this.http.put(this.rootUrl + `/SetRequestTypeStatus/${status}`, {}, this.httpOptions)

  }
  deleteClubMember(accId, clubId): Observable<any> {
    return this.http.delete(this.rootUrl + `/deleteClubMember/${accId}/${clubId}`, this.httpOptions)
  }
  deleteEventMember(accId,eventId): Observable<any> {
    return this.http.delete(this.rootUrl+ `/deleteEventMember/${accId}/${eventId}`, this.httpOptions);
  }
  public getEventByName(name): Observable<any> {
    return this.http.get(this.rootUrl + `/getEventByName/${name}`, this.httpOptions)
  }
  public getClubByName(name): Observable<any> {
    return this.http.get(this.rootUrl + `/getClubByName/${name}`, this.httpOptions)
  }
  public handleError(error: any) {
    if (error.status == 401) {
      return throwError("401");

    }
    return throwError(error);
    
  }

}
