import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
declare var $: any
import { Router } from '@angular/router'
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-machinestatus',
  templateUrl: './machinestatus.component.html',
  styleUrls: ['./machinestatus.component.css']
})
export class MachinestatusComponent implements OnInit {

  machines = []
  items = []
  logged_in
  user_data
  mail = { 'roll_number': '', 'subject': '', 'message': '', 'html_message': '', 'recipient_list': '' }

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.api.getMachines().subscribe(
      data => {
        this.machines = data;
        console.log(data)
      });
    this.api.getItems().subscribe(
      data => {
        this.items = data;
        console.log(data)
      });

  }

  returnStatus(x: boolean) {
    return x ? 'Working' : 'Not Working'
  }


  reportMachine(machine) {

    this.logged_in = this.api.is_Authenticated()
    console.log(this.logged_in)
    if (this.logged_in == true) {
      if (confirm('This will send a mail to the admins. Are you sure you want to continue?')) {
        this.user_data = JSON.parse(this.api.getJdata(environment.jdataKey));
        this.user_data.roll_number = window.atob(this.user_data.roll_number)
        this.api.getCustomer(this.user_data.roll_number)
          .subscribe(data => { this.user_data = data; console.log(data), error => { console.log(error) } })
        this.mail.roll_number = this.user_data.roll_number
        this.mail.subject = 'Reporting of Machine ' + machine.name + ' - ' + this.items[machine.type - 1].name
        this.mail.message = machine.name + ' - ' + this.items[machine.type - 1].name + ' <h1>has been reported</h1>'
        this.mail.recipient_list = environment.technician_mails
        var date_time = new Date()
        this.mail.html_message = '<strong>' + machine.name + ' - ' + this.items[machine.type - 1].name + '</strong>' + ' has been reported on the website by <strong>' + this.user_data.first_name + ' ' + this.user_data.last_name + '-' + this.user_data.roll_number + '</strong> at ' + date_time + '<br><br>Please check the item.'

        this.api.updateMail(this.mail).subscribe(
          data => {
            console.log(data);
            this.api.sendMail(this.user_data.roll_number).subscribe(data => { console.log(data); if (data == 'sent') { console.log('mail sent successfully') } },
              error => { alert('error'); console.log(error); });
          }, error => { console.log(error); });
      }
    }
    else { alert("You need to be logged in to Report"); this.router.navigate(['']) }
  }

}
