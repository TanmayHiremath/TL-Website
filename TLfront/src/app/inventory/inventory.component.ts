import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
declare var $: any
import { Router } from '@angular/router'
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  items = [];
  item_query
  searched: boolean = false;
  id_required_string: string
  tabledisplay: boolean = true;
  displayItems = [];
  requests = [];
  ordered = [];
  newRequest: { item: any; quantity: any; id?: number; roll_number?: string; }
  displaycartbtn: boolean = true
  logged_in
  user_data
  flags = []
  newFlag
  mail = { 'roll_number': '', 'subject': '', 'message': '', 'html_message': '', 'recipient_list': '' }
  constructor(private api: ApiService, private router: Router) {
    this.newRequest = { id: -1, item: -1, roll_number: '123456789', quantity: 1 }
    this.item_query = ''
  }

  ngOnInit(): void {

    this.logged_in = this.api.is_Authenticated()
    console.log(this.logged_in)
    if (this.logged_in == true) {
      this.user_data = JSON.parse(this.api.getJdata(environment.jdataKey));
      this.user_data.roll_number = window.atob(this.user_data.roll_number)
      this.api.getCustomer(this.user_data.roll_number)
        .subscribe(data => { this.user_data = data; console.log(data), error => { console.log(error) } })
    }
    else { this.router.navigate(['']) }
    this.api.rollSearch(this.user_data.roll_number).subscribe(
      data => {
        this.requests = data;
      },
      error => {
        console.log(error);
      }
    );
    console.log(this.ordered)
    this.api.getItems().subscribe(
      data => {
        this.items = data;
        //setcolourcode
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
        //end setcolourcode
      },
      error => {
        console.log(error);
      });

    this.api.getFlags().subscribe(
      data => {
        this.flags = data;
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );

    $(document).ready(function () {
    });

  }

  addA(id) {
    return 'A' + id.toString()
  }
  addB(id) {
    return 'B' + id.toString()
  }
  addC(id) {
    return 'C' + id.toString()
  }
  addD(id) {
    return 'D' + id.toString()
  }
  CreateRequest(item, event) {
    console.log(event)
    this.newRequest.item = item.id
    this.newRequest.roll_number = this.user_data.roll_number
    var children = event.srcElement.parentElement.parentElement.children
    var i = 0;
    this.requests.forEach(iterate)
    function iterate(request) {
      if (request.item == item.id) { i++ }
    }
    if (i == 0) {
      this.api.createRequest(this.newRequest).subscribe(
        data => {
          this.requests.push(this.newRequest)
          children[0].style.display = 'none'
          children[1].style.display = 'none'
          children[2].style.display = 'block'
          console.log(data)
        },
        error => {
          console.log(error);
        }
      );
    }
    else { this.router.navigate(['../cart']) }
  }
  convertBool(item) {
    return item.id_required ? 'Yes' : 'No'
  }
  nameClicked(id, event) {
    console.log('heyy')
    console.log(event)
    var target = event.srcElement.parentElement.children[1]
    target.style.display = 'block'
  }

  overlayClicked(item) {
    $('.overlay').slideUp(400)
  }

  cartClicked(id, event) {
    console.log(id.toString())
    var children = event.srcElement.parentElement.children
    console.log(children)
    const that = this
    this.requests.forEach(iterate)
    function iterate(request) {
      if (!request.is_sent && request.item == id) { that.router.navigate(['../cart']) }
    }
    children[0].style.display = 'none'
    children[1].style.display = 'block'
    children[2].style.display = 'none'
  }

  incrementQuantity() { this.newRequest.quantity++; }

  decrementQuantity() { this.newRequest.quantity--; }



  reportItem(item) {
    if (confirm('This will send a mail to the admins. Are you sure you want to continue?')) {
      document.getElementById('super-overlay').style.display = 'block'
      this.mail.roll_number = this.user_data.roll_number
      this.mail.subject = 'Reporting of ' + item.name
      this.mail.message = item.name + ' <h1>has been flagged</h1>'
      this.mail.recipient_list = environment.technician_mails
      var date_time = new Date()
      this.mail.html_message = '<strong>' + item.name + '</strong>' + ' has been reported on the website by <strong>' + this.user_data.first_name + ' ' + this.user_data.last_name + '-' + this.user_data.roll_number + '</strong> at ' + date_time + '<br><br>Please check the item.'


      this.api.updateMail(this.mail).subscribe(
        data => {
          console.log(data);
          this.api.sendMail(this.user_data.roll_number).subscribe(data => { console.log(data); if (data == 'sent') { document.getElementById('super-overlay').style.display = 'none'; console.log('mail sent successfully') } },
            error => { document.getElementById('super-overlay').style.display = 'none'; alert('error'); console.log(error); });
        }, error => { console.log(error); });
    }
  }

  flagItem(item) {
    if (confirm('This will send a mail to the admins. Are you sure you want to continue?')) {
      document.getElementById('super-overlay').style.display = 'block'
      this.mail.roll_number = this.user_data.roll_number
      this.mail.subject = 'Flagging of ' + item.name
      this.mail.message = item.name + ' <h1>has been flagged</h1>'
      this.mail.recipient_list = environment.technician_mails
      var date_time = new Date()
      this.mail.html_message = '<strong>' + item.name + '</strong>' + ' has been flagged on the website by <strong>' + this.user_data.first_name + ' ' + this.user_data.last_name + '-' + this.user_data.roll_number + '</strong> at ' + date_time + '<br><br>Please check the item.'


      this.api.updateMail(this.mail).subscribe(
        data => {
          console.log(data);
          this.api.sendMail(this.user_data.roll_number)
            .subscribe(data => { console.log(data); if (data == 'sent') { document.getElementById('super-overlay').style.display = 'none'; console.log('mail sent successfully') } },
              error => { document.getElementById('super-overlay').style.display = 'none'; alert('error'); console.log(error); });
        }, error => { console.log(error); });


      var newflg = { item: item.id, roll_number: this.user_data.roll_number }

      this.api.createFlag(newflg).subscribe(
        data => {
          this.flags.push(newflg)
          console.log(data)
        },
        error => {
          console.log(error);
        });

      item.is_flagged = true;
      this.api.updateItem(item).subscribe(
        data => { console.log(data) },
        error => { console.log(error); });
    }
  }
  displayArray = ['d-non', 'd-non', 'd-non', 'd-non', 'd-non', 'd-non', 'd-non', 'd-non', 'd-non', 'd-non', 'd-non']
  categoryArray = ['Sensor', 'PCB', 'Resistor', 'Capacitor', 'Jumper', 'LED', 'd-non', 'Screw', 'Nut', 'Bolt', 'Machine']
  selected_category = "none"
  selected_value = 100
  display_table(chosen) {



    this.selected_category = this.categoryArray[chosen];
    if (this.selected_value == chosen) {
      this.selected_value = 100;
    }
    else {
      this.selected_value = chosen;
    }
    var i
    for (i = 0; i < 11; i++) {
      this.displayArray[i] = 'd-non';
    }
    this.displayArray[this.selected_value] = 'd-show';

  }


  searchItem() {
    this.searched = true
    this.api.itemSearch(this.item_query)
      .subscribe(
        data => {
          this.displayItems = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });

  }

  hideSearch() {
    this.searched = false
  }
  searchButton(event) {

    if (event.keyCode == 13 && this.item_query != '') {
      this.searchItem()
    }
  }

}

