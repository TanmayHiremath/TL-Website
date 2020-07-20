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

  constructor(private api: ApiService, private router: Router) {
    this.username = ''
  }

  ngOnInit(): void {
  }

  submit() {
    console.log('clicked')
    var data = {}
    data['username'] = this.username
    data['password'] = this.password
    const that = this
    $.post(environment.serverUrl + 'auth_technician/', data, function (data) {
      console.log(data)
      if (data == 'True') {
        var user_data = {
          roll_number: window.btoa("Technician"),
          first_name: "Technician",
          last_name: "1",
          email: "abcd@email.com",
          username: "technician",
          access_token: "efvew",
          refresh_token: "scaaz"
        }

        that.api.setJdata(environment.jdataKey,JSON.stringify(user_data))

        that.router.navigate(['../technician'])

      }
      else {
        alert('Incorrect Username or Password')
      }
    })

  }
}
