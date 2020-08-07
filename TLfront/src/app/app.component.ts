import { Pipe, PipeTransform, Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser'

import { environment } from '../environments/environment';
import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TLfront';
  year: string;
  flags = []
  items = []
  logged_in: boolean = false
  code
  time
  customer
  mail = { 'roll_number': '', 'subject': '', 'message': '', 'html_message': '', 'recipient_list': '' }
  requests
  user_data = null
  events_href
  constructor(private api: ApiService, private router: Router) {
    this.events_href="events"
    this.year = new Date().getFullYear().toString();
    this.time = (new Date().getTime()) / 1000


  }

  ngOnInit(): void {

    this.api.getItems().subscribe(
      data => {
        this.items = data;
        this.api.getFlags().subscribe(
          data => {

            this.flags = data;
            this.flags.forEach(element => {
              console.log(this.time)
              if ((this.time - ((new Date(element.time)).getTime()) / 1000) > 86400) {
                console.log(element)
                this.items[element.item - 1].is_flagged = false;
                this.api.updateItem(this.items[element.item - 1]).subscribe(
                  data => {
                    console.log(data)
                  },
                  error => {
                    console.log(error);
                  }
                );
                this.flags.splice(element.id - 1, 1)
                this.api.deleteFlag(element.id).subscribe
                  (
                    data => {
                      console.log(data)
                    },
                    error => {
                      console.log(error);
                    }
                  );
              }
            });
          },
          error => {
            console.log(error);
          }
        );

        this.api.requestDate().subscribe
          (
            data => {
              this.requests = data;
              this.requests.forEach(element => {
                if (((this.time - ((new Date(element.issued_time)).getTime()) / 1000) / 1000) > 2592) {
                  element.email_sent=true
                  this.api.updateRequest(element).subscribe(
                    data => {
                    },
                    error => {
                      console.log(error);
                    }
                  );

                  this.api.getCustomer(element.roll_number).subscribe(
                    data => {
                      this.customer = data
                      this.mail.roll_number = element.roll_number
                      this.mail.subject = 'Item not returned'
                      this.mail.message = this.items[element.item - 1].name + ' <h1>has not been returned</h1>'
                      this.mail.recipient_list = "['tanmay.v.hiremath@gmail.com']"//"['"+this.customer.email+"']"
                      this.mail.html_message = this.customer.first_name + ' ' + this.customer.last_name + ', <br>The following items have not been returned in the past month:<br>' + this.items[element.item - 1].name + ': Quantity = ' + element.quantity + '<br>Detail of student: ' + element.roll_number + '<br><strong>Return the items immediately. Any further delays will result in the matter escalating to the Faculty Advisor and strict action will be taken. </strong><br>Please contact the managers on tinkererslaboratory@gmail.com immediately.'
                      this.api.updateMail(this.mail).subscribe(
                        data => {
                          console.log(data);
                          this.api.sendMail(element.roll_number)
                            .subscribe(data => { },
                              error => { console.log(error); });
                        }, error => { console.log(error); });
                    },
                    error => {
                      console.log(error);
                    }
                  );


                }
              });
            },
            error => {
              console.log(error);
            }
          );

      },
      error => {
        console.log(error);
      }
    );


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
      this.api.createMail(this.user_data.roll_number).subscribe(data => { console.log(data) }, error => { console.log(error) })
      this.api.getCustomer(this.user_data.roll_number)
        .subscribe(data => { this.user_data = data; console.log(data), error => { console.log(error) } })

    }
    else { }


    $(document).ready(function () {

      $('.dropdown-toggl').click(function () {
        $('.dropdown-men').fadeToggle(200)

      });

      $('body').click(function (evt) {
        if (evt.target.id == "dropdown-toggl")
          return;
        if ($(evt.target).closest('#dropdown-toggl').length)
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
  Check_Technician() {
    return this.api.check_technician()
  }
}



