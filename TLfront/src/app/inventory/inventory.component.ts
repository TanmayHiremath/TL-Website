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

  items = [{}];
  tabledisplay: boolean = true;
  id_required_string: string
  requests = [];
  ordered = [];
  newRequest: { item: any; quantity: any; id?: number; roll_number?: string; }
  displaycartbtn: boolean = true
  logged_in
  user_data
  mail = { 'roll_number': '', 'subject': '', 'message': '', 'html_message': '', 'recipient_list': '' }
  constructor(private api: ApiService, private router: Router) {
    this.newRequest = { id: -1, item: -1, roll_number: '123456789', quantity: 1 }

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
    // var i
    // for (i = 0; i < this.requests.length; i++) {
    //   console.log("hi")
    //   if (!this.requests[i].is_sent) {
    //     this.ordered[this.requests[i].item - 1] = i
    //   }
    // }
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


    $(document).ready(function () {
      $("i").click(function () {
        $(this).toggleClass("far")
        $(this).toggleClass("fas")
      });
      $(".overlay").click(function () {
        $(".overlay").slideUp(400)
      });

    });

  }

  CreateRequest(item) {

    // this.router.navigate(['../cart'])
    this.newRequest.item = item.id
    this.newRequest.roll_number = this.user_data.roll_number
    this.showAddedToCart(item)

    this.api.createRequest(this.newRequest).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );


  }

  convertBool(item) {
    if (item.id_required == false) {
      return 'No'
    }
    else {
      return 'Yes'
    }
  }


  categoryClicked(clickedItem) {
    this.tabledisplay = false

    this.items.forEach(iterate)
    function iterate(item) {

      item.displaylevel2 = 0
      item.display = 0

      if (item.category == clickedItem.category) { item.displaylevel1 = 1 }

      else { item.displaylevel1 = 0 }

    }
  }


  level1Clicked(clickedItem) {

    this.tabledisplay = false

    this.items.forEach(iterate)
    function iterate(item) {

      item.display = 0
      if (item.displaylevel1 == clickedItem.displaylevel1) { item.displaylevel2 = !item.displaylevel2 }

      else { item.displaylevel2 = 0 }

    }
  }


  level2Clicked(clickedItem) {

    this.tabledisplay = !this.tabledisplay

    this.items.forEach(iterate)
    function iterate(item) {

      if (item.displaylevel2 == clickedItem.displaylevel2) { item.display = !item.display }

      else { item.display = 0 }
    }

  }

  nameClicked(item) {
    console.log($('#' + item.id).children().eq(3))
    $('#' + item.id).children().eq(3).slideDown(400)
  }

  overlayClicked(item) {
    $('#' + item.id).children().eq(3).slideUp(400)
  }

  cartClicked(item) {

    // document.getElementById("specifyQuantity").style.display = "block";
    // document.getElementById("addToCart").style.display = "none";
    console.log('#' + item.id)
    var c = $('#' + item.id).children()
    c.eq(0).css({ "display": "none" })
    c.eq(1).css({ "display": "block" })
    c.eq(2).css({ "display": "none" })


    // $(".addToCart").click(function(){
    //   alert('hey')
    //   $(this).css({"display": "none"});
    //   $(this).siblings('.specifyQuantity').css({"display": "block"})
    // });
  }

  incrementQuantity() {
    this.newRequest.quantity++;
  }

  decrementQuantity() {
    this.newRequest.quantity--;
  }

  showAddedToCart(item) {
    $('#testt').css({ "display": "block!important" })
    var c = $('#' + item.id).children()
    c.eq(0).css({ "display": "none" })
    c.eq(1).css({ "display": "none" })
    c.eq(2).css({ "display": "block" })
    console.log('satc')
  }

  reportItem(item) {
    this.mail.roll_number = this.user_data.roll_number
    this.mail.subject = 'Reporting of ' + item.name
    this.mail.message = item.name + ' <h1>has been flagged</h1>'
    this.mail.recipient_list = "['tanmay.v.hiremath@gmail.com']"
    var date_time = new Date()
    this.mail.html_message = '<strong>' + item.name + '</strong>' + ' has been reported on the website by <strong>' + this.user_data.first_name + ' ' + this.user_data.last_name + '-' + this.user_data.roll_number + '</strong> at ' + date_time + '<br><br>Please check the item.'


    this.api.updateMail(this.mail).subscribe(data => { this.api.sendMail(this.user_data.roll_number); console.log(data) }, error => { console.log(error); });
  }

  flagItem(item) {
    this.mail.roll_number = this.user_data.roll_number
    this.mail.subject = 'Flagging of ' + item.name
    this.mail.message = item.name + ' <h1>has been flagged</h1>'
    this.mail.recipient_list = "['tanmay.v.hiremath@gmail.com']"
    var date_time = new Date()
    this.mail.html_message = '<strong>' + item.name + '</strong>' + ' has been flagged on the website by <strong>' + this.user_data.first_name + ' ' + this.user_data.last_name + '-' + this.user_data.roll_number + '</strong> at ' + date_time + '<br><br>Please check the item.'


    this.api.updateMail(this.mail).subscribe(data => { this.api.sendMail(this.user_data.roll_number); console.log(data) }, error => { console.log(error); });

  }
  displayArray = ['d-none', 'd-none', 'd-none', 'd-none', 'd-none', 'd-none', 'd-none', 'd-none', 'd-none', 'd-none', 'd-none']
  categoryArray = ['Sensor', 'PCB', 'Resistor', 'Capacitor', 'Jumper', 'LED', 'd-none', 'Screw', 'Nut', 'Bolt', 'Machine']
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
      this.displayArray[i] = 'd-none';
    }
    this.displayArray[this.selected_value] = 'd-show';

    setTimeout(()=>{
      const that = this
        this.requests.forEach(repeat)
        function repeat(request) {
          if (!request.is_sent) { that.showAddedToCart(that.items[request.item - 1]); console.log(request.is_sent); console.log(that.items[request.item - 1]) }
        }
    },10)



    

  }

}


// displayArray = ['d-none','d-none', 'Resistor','Capacitor','Jumper','LED','d-none','Screw','Nut','Bolt','d-none']
// if(this.selected_value==chosen){
//   this.selected_value=11;
// }
// else{
// this.selected_value=chosen;
// }