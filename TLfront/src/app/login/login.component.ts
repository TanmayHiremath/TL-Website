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

  constructor(private api: ApiService, private router: Router) { }

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
        that.router.navigate(['../technician'])       
      }
      else{
        alert('Incorrect Username or Password')
      }
    })

  }
}
