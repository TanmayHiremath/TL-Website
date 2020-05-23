import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { item_interface } from './item_interface';
import { request_interface } from './request_interface';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getItems(): Observable<any> {
    return this.http.get(this.baseurl + '/items/',
      { headers: this.httpHeaders });
  }

  getRequests(): Observable<any> {
    return this.http.get(this.baseurl + '/requests/',
      { headers: this.httpHeaders });
  }
  createRequest(x): Observable<any> {
    const body = { item:x.item,quantity:x.quantity,roll:x.roll,time:x.time};
    return this.http.post<any>(this.baseurl + '/requests/' ,body,
      { headers: this.httpHeaders });
  }

  updateItem(item): Observable<item_interface> {
    // const body = { title: item.title, desc: item.desc, year: item.year };
    return this.http.put<item_interface>(this.baseurl + '/items/' + item.id + '/',
      { headers: this.httpHeaders });
  }

























  getOrders(): Observable<any> {
    return this.http.get(this.baseurl + '/orders/',
      { headers: this.httpHeaders });
  }

  getOrderproducts(): Observable<any> {
    return this.http.get(this.baseurl + '/orderproduct/',
      { headers: this.httpHeaders });
  }

  getCustomers(): Observable<any> {
    return this.http.get(this.baseurl + '/customers/',
      { headers: this.httpHeaders });
  }



  updateRequest(movie): Observable<any> {
    const body = {title: movie.title , desc: movie.desc, year: movie.year };
    return this.http.put(this.baseurl + '/movies/' + movie.id + '/', body,
    {headers: this.httpHeaders});
  }

}