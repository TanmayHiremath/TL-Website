import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getItems(): Observable<any> {
    return this.http.get(this.baseurl + '/items/',
    {headers: this.httpHeaders});
  }
  getOrders(): Observable<any> {
    return this.http.get(this.baseurl + '/order/',
    {headers: this.httpHeaders});
  }

  getOrderproducts(): Observable<any> {
    return this.http.get(this.baseurl + '/orderproduct/',
    {headers: this.httpHeaders});
  }

  getCustomer(): Observable<any> {
    return this.http.get(this.baseurl + '/customer/',
    {headers: this.httpHeaders});
  }

  getRequest(): Observable<any> {
    return this.http.get(this.baseurl + '/request/',
    {headers: this.httpHeaders});
  }

  updateRequest(req): Observable<any> {
    const body = {is_sent: req.is_sent };
    return this.http.put(this.baseurl + '/request/' + req.id + '/', body,
    {headers: this.httpHeaders});
  }

}