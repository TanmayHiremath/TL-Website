import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import * as $ from 'jquery';
import { Router } from '@angular/router'
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username
  password
  new_password
  new_password_temp
  user_data
  username_display = true
  password_display = true
  pwd_placeholder = 'Password...'
  logged_in = false
  constructor(private api: ApiService, private router: Router) {
    this.username = ''
    this.password = ''
  }

  ngOnInit(): void {

    if (this.api.is_Authenticated() && this.api.check_technician()) { this.logged_in = true; this.username_display = false; this.password_display = false }
    else if (this.api.is_Authenticated()) { this.router.navigate(['']) }
    else { this.logged_in = false }

  }

  login() {
    if (this.password == '') { alert('Password Cannot be blank') }
    else {
      var login_data = {}
      login_data['username'] = this.username
      login_data['password'] = this.password
      const that = this
      $.post(environment.serverUrl + 'auth_technician/', login_data, function (data) {
        console.log(data)
        if (data == 'True') {
          that.api.getCustomer(login_data['username'])
            .subscribe(data => {
              console.log('hey');
              that.user_data = data;
              that.user_data.roll_number = window.btoa(that.user_data.roll_number);
              console.log(data);
              that.api.setJdata(environment.jdataKey, JSON.stringify(that.user_data))
              window.location.reload()
            },
              error => { console.log(error) })



          // that.router.navigate(['../technician'])


        }
        else {
          alert('Incorrect Username or Password')
        }
      })
    }
  }
  change_pwd() {
    if (this.password == '' || this.new_password == '' || this.new_password_temp == '') { alert('Password Cannot be blank') }
    else if (this.new_password != this.new_password_temp) { alert("Passwords don't match") }
    else {
      var login_data = {}
      login_data['username'] = window.atob(JSON.parse(this.api.getJdata(environment.jdataKey)).roll_number)
      login_data['password'] = this.password
      const that = this
      $.post(environment.serverUrl + 'auth_technician/', login_data, function (data) {
        console.log(data)
        if (data == 'True') {
          var pwd_data = {}
          pwd_data['username'] = window.atob(JSON.parse(that.api.getJdata(environment.jdataKey)).roll_number)
          pwd_data['password'] = that.new_password
          $.post(environment.serverUrl + 'change_pwd/', pwd_data, function (data) {
            if (data == 'True') { alert('password changed successfully');window.location.reload() }
            else { alert('error') }
          })
        }
        else {alert('Old Password is wrong')}
      })
    }
  }
}
