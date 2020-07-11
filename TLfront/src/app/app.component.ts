import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TLfront';
  year: string;
  flag;
  logged_in: boolean = false
  code
  user_data = null
  constructor(private api: ApiService, private router: Router) {

    this.flag = 0;
    this.year = new Date().getFullYear().toString();

  }

  ngOnInit(): void {

    var urlParams = new URLSearchParams(window.location.search)
    this.code = urlParams.get('code')
    if (this.code != null) {

      console.log(this.code)
      this.router.navigate([''])
      const that = this
      $.post(environment.serverUrl + 'autho/', { code: this.code }, function (data) {

        that.api.updateCustomer(data).subscribe(data => { console.log(data), error => { console.log(error) } })

        delete data['refresh_token']
        delete data['access_token']
        console.log(data)
        that.api.set_user_data(data)
        data.roll_number = window.btoa(data.roll_number)
        that.api.setJdata(environment.jdataKey, JSON.stringify(data))
        window.location.reload()
      })
    }
    this.logged_in = this.api.is_Authenticated()
    console.log(this.logged_in)
    if (this.logged_in == true) {


      this.user_data = JSON.parse(this.api.getJdata(environment.jdataKey));
      this.user_data.roll_number = window.atob(this.user_data.roll_number)
      this.api.createMail(this.user_data.roll_number).subscribe(data=>{console.log(data)},error=>{console.log(error)})
      this.api.getCustomer(this.user_data.roll_number)
        .subscribe(data => { this.user_data = data; console.log(data), error => { console.log(error) } })

    }
    else { this.router.navigate(['']); }


    $(document).ready(function () {

      $('.dropdown-toggl').click(function () {
        $('.dropdown-men').fadeToggle(200)

      });

      $('body').click(function (evt) {
        if(evt.target.id == "dropdown-toggl" ) 
                return; 
            if($(evt.target).closest('#dropdown-toggl').length) 
                return; 
              
            $('.dropdown-men').fadeOut(200)
      });
      $(document).scroll(function () {
        if ($(window).scrollTop() > 700) {
          document.getElementById("scrollBtn").style.display = "block";
          $(".nav").css({ "background": "black", "position": "sticky", "top": "0" })
        }
        else {
          document.getElementById("scrollBtn").style.display = "none";
          $(".nav").css({ "background": "#20c9c3", "position": "static" })
        }


      });

      $("#scrollBtn").click(function () {
        $('html, body').animate({
          scrollTop: 0
        }, 1200);
      });




      $("#uncheck").click(function () {
        $("#nav-check").prop("checked", false);
      });

    });

  }

  logout() {
    this.api.logout()
  }




}



