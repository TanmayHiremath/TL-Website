import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms'
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-fate',
  templateUrl: './fate.component.html',
  styleUrls: ['./fate.component.css'],
  providers: [ApiService]
})
export class FateComponent implements OnInit {
  requests = []
  items = []
  machines = []
  quantity;
  roll_number;
  displayItems;
  item_query;
  machine_query;
  customers;
  x;
  logged_in
  user_data
  mail = { 'roll_number': '', 'subject': '', 'message': '', 'html_message': '', 'recipient_list': '' }
  constructor(private api: ApiService,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.logged_in = this.api.is_Authenticated()
    console.log(this.logged_in)
    if (this.logged_in == true && this.api.check_technician()) {

      this.user_data = JSON.parse(this.api.getJdata(environment.jdataKey));
      this.user_data.roll_number = window.atob(this.user_data.roll_number)

    }
    else { console.log('NOT AUTHORISED'); this.router.navigate(['']) }

    this.api.getItems().subscribe(
      data => {
        this.items = data;
        const that = this
        this.items.forEach(iterate)
        function iterate(item) {
          if (item.is_consumable == true) {
            if (item.quantity < 0.3 * item.critical_val) { item.colour_code = "red" }
            else if (item.quantity < 0.75 * item.critical_val) { item.colour_code = "yellow" }
            else if (item.quantity < item.critical_val) { item.colour_code = "green" }
            else { item.colour_code = "green" }

          }
          that.api.updateItem(item).subscribe(data => { console.log(data) }, error => { console.log(error); });

        }
        this.displayItems = this.items;
      },
      error => {
        console.log(error);
      }
    );
    this.api.getRequests().subscribe(
      data => {
        this.requests = data;
      },
      error => {
        console.log(error);
      }
    );
    this.api.getCustomers().subscribe(
      data => {
        this.customers = data;
      },
      error => {
        console.log(error);
      }
    );

    this.api.getMachines().subscribe(
      data => {
        this.machines = data;
      },
      error => {
        console.log(error);
      }
    );

  }



  searchTitle() {
    this.api.rollSearch(this.roll_number)
      .subscribe(
        data => {
          this.requests = data;
        },
        error => {
          console.log(error);
        });
  }

  searchItem() {
    this.api.itemSearch(this.item_query)
      .subscribe(
        data => {
          this.displayItems = data;
        },
        error => {
          console.log(error);
        });
  }

  searchMachine() {
    this.api.machineSearch(this.machine_query)
      .subscribe(
        data => {
          this.machines = data;
        },
        error => {
          console.log(error);
        });
  }

  filter_issued = false;
  filter_denied = false;
  filter_returned = false;
  filter_consumable = true;

  filter_11 = 'd-show';
  filter_12 = 'd-none';
  filter_13 = 'd-none';

  filter_1 = 'd-none';
  filter_2 = 'd-none';
  filter_3 = 'd-none';

  filter_31 = 'd-show';
  filter_32 = 'd-show';


  only_issued() {
    this.filter_11 = 'd-show';
    this.filter_12 = 'd-none';
    this.filter_13 = 'd-none';
    this.filter_issued = true;
    this.filter_denied = false;
    this.filter_returned = false;
    this.filter_consumable = true;
  }
  only_denied() {
    this.filter_11 = 'd-show';
    this.filter_12 = 'd-none';
    this.filter_13 = 'd-none';
    this.filter_issued = false;
    this.filter_denied = true;
    this.filter_returned = false;
    this.filter_consumable = true;
  }
  only_returned() {
    this.filter_11 = 'd-none';
    this.filter_12 = 'd-none';
    this.filter_13 = 'd-show';
    this.filter_issued = true;
    this.filter_denied = false;
    this.filter_returned = true;
  }
  only_pending() {
    this.filter_11 = 'd-show';
    this.filter_12 = 'd-none';
    this.filter_13 = 'd-none';
    this.filter_issued = false;
    this.filter_denied = false;
    this.filter_returned = false;
  }
  all_1() {
    this.filter_11 = 'd-none';
    this.filter_12 = 'd-show';
    this.filter_13 = 'd-none';
    this.filter_issued = true;
    this.filter_denied = false;

  }

  all_3() {
    this.filter_31 = 'd-show';
    this.filter_32 = 'd-show';
  }

  only_working() {
    this.filter_31 = 'd-none';
    this.filter_32 = 'd-show';
  }

  only_defective() {
    this.filter_31 = 'd-show';
    this.filter_32 = 'd-none';
  }

  issue_request(request) {
    request.is_issued = true;
    request.is_denied = false;
    request.is_returned = this.items[request.item - 1].is_consumable;
    request.issued_time = new Date()
    this.items[request.item - 1].quantity -= request.quantity;
    this.api.updateRequest(request).subscribe
      (
        data => {
          console.log(data)
        },
        error => {
          console.log(error);
        }
      );
    this.api.updateItem(this.items[request.item - 1]).subscribe
      (
        data => {
          console.log(data)
        },
        error => {
          console.log(error);
        }
      );


    this.toastr.success(this.items[request.item - 1].name + ' is issued successfully to ' + request.roll_number, 'Issued',
      {
        timeOut: 1000,
        positionClass: "toast-top-full-width"
      });

    this.mail.roll_number = this.user_data.roll_number
    this.mail.subject = this.items[request.item - 1].name + 'Confirmation receipt for item issue'
    this.mail.message = this.items[request.item - 1].name + ' <h1>has been issued successfully</h1>'
    this.mail.recipient_list = "['gakshat2207@gmail.com']"
    var date_time = new Date()
    this.mail.html_message = this.user_data.first_name + ' ' + this.user_data.last_name + ', <br><br>You have successfully issued <strong>' + this.items[request.item - 1].name + '</strong>' + ': Quantity = <strong>' + request.quantity + '</strong> at ' + date_time + '<br><br>Please keep the item safe and secure. If you face any issues or problems, contact the Tinkerers\' Laboratory team as soon as possible.<br><br>Regards,<br>Tinkerers\' Laboratory Team'



    this.api.updateMail(this.mail).subscribe(data => { this.api.sendMail(this.user_data.roll_number); console.log(data) }, error => { console.log(error); });

  }
  deny_request(request) {
    request.is_issued = false;
    request.is_denied = true;
    request.is_returned = false;
    request.issued_time = new Date()
    this.api.updateRequest(request).subscribe
      (
        data => {
          console.log(data)
        },
        error => {
          console.log(error);
        }
      );

    this.toastr.success(this.items[request.item - 1].name + ' requested by ' + request.roll_number + ' has been denied', 'Issued',
      {
        timeOut: 1000,
        positionClass: "toast-top-full-width"
      });

  }
  return_request(request) {
    request.is_issued = true;
    request.is_denied = false;
    request.is_returned = true;
    request.returned_time = new Date();
    this.items[request.item - 1].quantity += request.quantity;
    this.api.updateRequest(request).subscribe
      (
        data => {
          console.log(data)
        },
        error => {
          console.log(error);
        }
      );
    this.api.updateItem(this.items[request.item - 1]).subscribe
      (
        data => {
          console.log(data)
        },
        error => {
          console.log(error);
        }
      );
    this.toastr.success(this.items[request.item - 1].name + ' issued by ' + request.roll_number + ' is returned successfully', 'Returned',
      {
        timeOut: 1000,
        positionClass: "toast-top-full-width"
      });

    this.mail.roll_number = this.user_data.roll_number
    this.mail.subject = this.items[request.item - 1].name + ' Confirmation receipt for return of items'
    this.mail.message = this.items[request.item - 1].name + ' <h1>has been returned successfully</h1>'
    this.mail.recipient_list = "['gakshat2207@gmail.com']"
    var date_time = new Date()
    this.mail.html_message = this.user_data.first_name + ' ' + this.user_data.last_name + ', <br><br>You have successfully returned <strong>' + this.items[request.item - 1].name + '</strong>' + ': Quantity = <strong>' + request.quantity + '</strong> at ' + date_time + '<br><br>Thank you for returning the item in good condition.' + '<br><br>If you face any issues or problems, contact the Tinkerers\' Laboratory team or reply to the thread.<br><br>Regards,<br>Tinkerers\' Laboratory Team'



    this.api.updateMail(this.mail).subscribe(data => { this.api.sendMail(this.user_data.roll_number); console.log(data) }, error => { console.log(error); });

  }
  p_request(request) {
    request.is_issued = false;
    request.is_denied = false;
    request.is_returned = false;

    this.api.updateRequest(request).subscribe
      (
        data => {
          console.log(data)
        },
        error => {
          console.log(error);
        }
      );

  }

  change_status(machine) {
    if(machine.status){
      machine.status=false
    }
    else{
      machine.status=true
    }
    this.api.updateMachine(machine).subscribe
      (
        data => {
        },
        error => {
          console.log(error);
        }
      );

      this.toastr.success(machine.name + ' has been updated', 'Updated Successfully',
      {
        timeOut: 4000,
        positionClass: "toast-top-full-width"
      });
  }



  incrementQuantity(item) {
    item.quantity++;
  }

  decrementQuantity(item) {
    item.quantity--;
  }

  save(item) {
    this.x = item
    console.log(item)
    this.api.updateItem(this.x).subscribe
      (
        data => {
          console.log(data)
        },
        error => {
          console.log(error);
        }
      );

    console.log("data")




    this.toastr.success(item.name + ' has been updated', 'Updated Successfully',
      {
        timeOut: 2000,
        positionClass: "toast-top-full-width"
      });
  }
  show_requests() {
    this.filter_1 = 'd-show';
    this.filter_2 = 'd-none';
    this.filter_3 = 'd-none';
    
  }

  show_items() {
    this.filter_1 = 'd-none';
    this.filter_2 = 'd-show';
    this.filter_3 = 'd-none';
  }

  show_machines(){
    this.filter_1 = 'd-none';
    this.filter_2 = 'd-none';
    this.filter_3 = 'd-show';
  }

  searchButton1(event) {
    
    if (event.keyCode == 13 && this.roll_number != '') {
      this.searchTitle()
    }
  }

  searchButton2(event) {
    
    if (event.keyCode == 13 && this.item_query != '') {
      this.searchItem()
    }
  }

  searchButton3(event) {
    
    if (event.keyCode == 13 && this.machine_query != '') {
      this.searchMachine()
    }
  }
  // reportItem(item){
  //   this.mail.roll_number=this.user_data.roll_number
  //   this.mail.subject = 'Reporting of '+item.name
  //   this.mail.message = item.name + ' <h1>has been flagged</h1>'
  //   this.mail.recipient_list = "['gakshat2207@gmail.com']"
  //   var date_time =new Date()
  //   this.mail.html_message = '<strong>' + item.name+'</strong>' + ' has been reported on the website by <strong>'+this.user_data.first_name+' '+this.user_data.last_name+'-'+this.user_data.roll_number+'</strong> <br>at ' + date_time +'<br><br>Please check the item.'



  //   this.api.updateMail(this.mail).subscribe(data => {this.api.sendMail(this.user_data.roll_number); console.log(data) }, error => { console.log(error); });
  // }




}
