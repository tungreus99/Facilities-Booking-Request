import { AppConsts } from './../../../shared/AppConsts';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export abstract class BaseApiService {


    public accontId: any
    protected baseUrl = "http://localhost:8080/"
    public httpOptions = {}

    protected get rootUrl() {
        return this.baseUrl + this.changeUrl();
    }

    protected http: HttpClient;
    constructor(http: HttpClient) {
        this.http = http;
        this.httpOptions = this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': ("Bearer" + " " + localStorage.getItem("userToken")).trim()
            })
        }
    }

    abstract changeUrl();

    protected getUrl(url: string) {
        return this.rootUrl + '/' + url;
    }
    public setToken(token) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': ("Bearer" + " " + token).trim()
            })
        }
    }

    //
    getOne(id: any, includes?: any): Observable<any> {
        return this.http.get(this.rootUrl + '/Get?' + 'id=${id}');
    }

    filterAndPaging(request: any): Observable<any> {
        return this.http.post<any>(this.rootUrl + '/GetAllPagging', request);
    }

    getAllPagging(request: any): Observable<any> {
        return this.http.post<any>(this.rootUrl + '/GetAllPagging', request);
    }

    public getById(id: any): Observable<any> {
        return this.http.get<any>(this.rootUrl + '/Get?id=' + id);
    }

    public delete(id: any): Observable<any> {
        return this.http.delete<any>(this.rootUrl + '/Delete', {
            params: new HttpParams().set('Id', id)
        })
    }

    public update(item: any): Observable<any> {
        return this.http.put<any>(this.rootUrl + '/Update', item);
    }

    public create(item: any): Observable<any> {
        return this.http.post<any>(this.rootUrl + '/Create', item);
    }

    //


    filter(key: any): Observable<any> {
        return this.http.get(this.rootUrl + '/Filter?' + `Includes=${key.includes}&Filters=${key.filters}&Sorts=${key.sorts}&Page=${key.page}&PageSize=${key.pageSize}`);
    }

    save(data: object): Observable<any> {
        return this.http.post(this.rootUrl + '/Save', data);
    }
    

}
