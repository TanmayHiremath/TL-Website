import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

import * as $ from 'jquery';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css'],
  providers: [ApiService]
})
export class ApprovedComponent implements OnInit {

  items = []
  requests = []
  flags = []
  total_items = 0
  user_data
  logged_in
  diff
  newFlag
  mail = { 'roll_number': '', 'subject': '', 'message': '', 'html_message': '', 'recipient_list': '' }
  constructor(private api: ApiService, private router: Router) {

  }

  ngOnInit(): void {

    //authentication code to be copied
    this.logged_in = this.api.is_Authenticated()
    console.log(this.logged_in)
    if (this.logged_in == true) {

      this.user_data = JSON.parse(this.api.getJdata(environment.jdataKey));
      console.log(this.user_data)
      this.user_data.roll_number = window.atob(this.user_data.roll_number)
      this.api.getCustomer(this.user_data.roll_number)
        .subscribe(data => { this.user_data = data; console.log(data), error => { console.log(error) } })
    }
    else { this.router.navigate(['']) }
    //authentication code end

    this.api.getItems().subscribe(
      data => {
        this.items = data;
      },
      error => {
        console.log(error);
      }
    );
    this.api.getFlags().subscribe(
      data => {
        this.flags = data;
      },
      error => {
        console.log(error);
      }
    );


    this.api.rollSearch(this.user_data.roll_number).subscribe(
      data => {
        this.requests = data;
      },
      error => {
        console.log(error);
      }
    );


  }
  flagItem(request) {
    if (confirm('This will send a mail to the admins. Are you sure you want to continue?')) {
      var newflg = { item: this.items[request.item - 1].id, roll_number: this.user_data.roll_number }

      this.api.createFlag(newflg).subscribe(
        data => {
          this.flags.push(newflg)
          console.log(data)
        },
        error => {
          console.log(error);
        }
      );

      this.items[request.item - 1].is_flagged = true;
      this.api.updateItem(this.items[request.item - 1]).subscribe(
        data => {
          console.log(data)
        },
        error => {
          console.log(error);
        }
      );



      this.mail.roll_number = this.user_data.roll_number
      this.mail.subject = 'Flagging of ' + this.items[request.item - 1].name
      this.mail.message = this.items[request.item - 1].name + ' <h1>has been flagged</h1>'
      this.mail.recipient_list = environment.technician_mails
      var date_time = new Date()
      this.mail.html_message = '<strong>' + this.items[request.item - 1].name + '</strong>' + ' has been flagged on the website by <strong>' + this.user_data.first_name + ' ' + this.user_data.last_name + '-' + this.user_data.roll_number + '</strong> at ' + date_time + '<br><br>Please check the item.'


      this.api.updateMail(this.mail).subscribe(
        data => {
          console.log(data);
          this.api.sendMail(this.user_data.roll_number)
            .subscribe(data => { console.log(data); if (data == 'sent') { document.getElementById('super-overlay').style.display = 'none'; console.log('mail sent successfully') } },
              error => { document.getElementById('super-overlay').style.display = 'none'; alert('error'); console.log(error); });
        }, error => { console.log(error); });
    }
  }


}
