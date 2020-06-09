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
    const body = { item: x.item, quantity: x.quantity, roll: x.roll };
    return this.http.post<request_interface>(this.baseurl + '/requests/', body,
      { headers: this.httpHeaders });
  }

  updateItem(item): Observable<any> {
    const body = {

      name: item.name, category: item.category, level1: item.level1, level2: item.level2, description: item.description,  keywords: item.keywords, picture: item.picture, id_required: item.id_required, quantity: item.quantity, critical_val: item.critical_val, current_holders: item.current_holders, is_consumable: item.is_consumable, colour_code: item.colour_code, notifications: item.notifications, price: item.price,display: item.display, displaylevel1: item.displaylevel1, displaylevel2: item.displaylevel2,
    };
    return this.http.put<item_interface>(this.baseurl + '/items/' + item.id + '/', body,
      { headers: this.httpHeaders });
  }


  getCustomers(): Observable<any> {
    return this.http.get(this.baseurl + '/customers/',
      { headers: this.httpHeaders });
  }



  updateRequest(req): Observable<any> {
    const body = { item: req.item, quantity: req.quantity, roll: req.roll, is_sent: req.is_sent, is_approved: req.is_approved, is_denied: req.is_denied };
    return this.http.put<request_interface>(this.baseurl + '/requests/' + req.id + '/', body,
      { headers: this.httpHeaders });
  }

  deleteRequest(id): Observable<any> {
    return this.http.delete<request_interface>(this.baseurl + '/requests/' + id + '/',
      { headers: this.httpHeaders });
  }

}