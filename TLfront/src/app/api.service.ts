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
    return this.http.get(this.baseurl + '/requests?',
      { headers: this.httpHeaders });
  }
  rollSearch(roll): Observable<any> {
    return this.http.get(this.baseurl + '/requestss' + '?roll=' + roll);
  }

  createRequest(x): Observable<any> {
    const body = { item: x.item, quantity: x.quantity, roll: x.roll };
    return this.http.post<request_interface>(this.baseurl + '/requests/', body,
      { headers: this.httpHeaders });
  }

  updateItem(item): Observable<any> {
    const body = {

      quantity: item.quantity, critical_val: item.critical_val, current_holders: item.current_holders, colour_code: item.colour_code, notifications: item.notifications, price: item.price
    };
    return this.http.patch(this.baseurl + '/items/' + item.id + '/', body,
      { headers: this.httpHeaders });
  }


  getCustomers(): Observable<any> {
    return this.http.get(this.baseurl + '/customers/',
      { headers: this.httpHeaders });
  }



  updateRequest(req): Observable<any> {
    const body = { item: req.item, quantity: req.quantity, roll: req.roll, is_sent: req.is_sent, is_approved: req.is_approved, is_issued: req.is_issued, is_returned: req.is_returned, is_denied: req.is_denied };
    return this.http.put<request_interface>(this.baseurl + '/requests/' + req.id + '/', body,
      { headers: this.httpHeaders });
  }

  deleteRequest(id): Observable<any> {
    return this.http.delete<request_interface>(this.baseurl + '/requests/' + id + '/',
      { headers: this.httpHeaders });
  }


  sendMail(): void {
    console.log('sending')
    $.get(this.baseurl + '/sendmail/', function (data) { alert(data) })
  }

  updateMail(subject,message,recipient_list,html_message): Observable<any> {
    const body = {

      subject:subject,message:message,recipient_list:recipient_list,html_message:html_message };
    return this.http.patch(this.baseurl + '/mails/' + '1' + '/', body,
      { headers: this.httpHeaders });
  }

  setJdata(data){
    alert("setting")
    localStorage.setItem('a','b');
    localStorage.setItem('jdata',data);
  }

  getJdata() {
    localStorage.getItem('jdata')
  }

}