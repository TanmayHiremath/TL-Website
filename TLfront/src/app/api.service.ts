import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { item_interface } from './item_interface';
import { request_interface } from './request_interface';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { env } from 'process';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  code

  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  user_data
  logged_in: boolean = false
  constructor(private http: HttpClient, private router: Router) { }

  getItems(): Observable<any> {
    return this.http.get(environment.serverUrl + 'items/',
      { headers: this.httpHeaders });
  }
  getRequests(): Observable<any> {
    return this.http.get(environment.serverUrl + 'requests?',
      { headers: this.httpHeaders });
  }
  rollSearch(roll): Observable<any> {
    return this.http.get(environment.serverUrl + 'requestss' + '?roll=' + roll);
  }

  createRequest(x): Observable<any> {
    const body = { item: x.item, quantity: x.quantity, roll: x.roll };
    return this.http.post<request_interface>(environment.serverUrl + 'requests/', body,
      { headers: this.httpHeaders });
  }

  createFlag(x): Observable<any> {
    const body = { item: x.item, roll: x.roll };
    return this.http.post<request_interface>(this.baseurl + '/flags/', body,
      { headers: this.httpHeaders });
  }

  updateItem(item): Observable<any> {
    const body = {

      quantity: item.quantity, critical_val: item.critical_val, colour_code: item.colour_code, is_flagged: item.is_flagged, price: item.price
    };
    return this.http.patch(environment.serverUrl + 'items/' + item.id + '/', body,
      { headers: this.httpHeaders });
  }


  getCustomers(): Observable<any> {
    return this.http.get(environment.serverUrl + 'customers/',
      { headers: this.httpHeaders });
  }

  getFlags(): Observable<any> {
    return this.http.get(this.baseurl + '/flags/',
      { headers: this.httpHeaders });
  }



  updateRequest(req): Observable<any> {
    const body = { item: req.item, quantity: req.quantity, roll: req.roll, is_sent: req.is_sent, is_approved: req.is_approved, is_issued: req.is_issued, is_returned: req.is_returned, is_denied: req.is_denied };
    return this.http.put<request_interface>(environment.serverUrl + 'requests/' + req.id + '/', body,
      { headers: this.httpHeaders });
  }

  deleteRequest(id): Observable<any> {
    return this.http.delete<request_interface>(environment.serverUrl + 'requests/' + id + '/',
      { headers: this.httpHeaders });
  }


  sendMail(): void {
    console.log('sending')
    $.get(environment.serverUrl + '/sendmail/', function (data) { alert(data) })
  }

  updateMail(subject, message, recipient_list, html_message): Observable<any> {
    const body = {

      subject: subject, message: message, recipient_list: recipient_list, html_message: html_message
    };
    return this.http.patch(environment.serverUrl + 'mails/' + '1' + '/', body,
      { headers: this.httpHeaders });
  }

  getCustomer(roll_number): Observable<any> {
    return this.http.get(environment.serverUrl + 'customer/' + roll_number,
      { headers: this.httpHeaders });

  }

  updateCustomer(data): Observable<any> {
    const body = {
      first_name: data.first_name,last_name:data.last_name, email: data.email, roll_number: data.roll_number, username: data.username,
      access_token: data.access_token, refresh_token: data.refresh_token
    };
    return this.http.put(environment.serverUrl + 'customer/' + data.roll_number, body,
      { headers: this.httpHeaders });
  }



  is_Authenticated() {


    if (this.getJdata(environment.jdataKey)) { this.logged_in = true }
    else {
      this.logged_in = false
    }

    console.log(this.logged_in)
    return this.logged_in
  }

  logout() { this.removeJdata(environment.jdataKey); this.logged_in = false; window.location.reload() }

  get_user_data() { return this.user_data }

  set_user_data(data) { this.user_data = data }

  setJdata(key, value) { localStorage.setItem(key, value); }

  getJdata(key) { return localStorage.getItem(key) }

  removeJdata(key) { localStorage.removeItem(key) }

}