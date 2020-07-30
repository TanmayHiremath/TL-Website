import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

import * as $ from 'jquery';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ApiService]
})
export class CartComponent implements OnInit {

  items = []
  customers = []
  requests = []
  total_items = 0
  myVar=0
  user_data
  logged_in
  mail={'roll_number':'','subject':'','message':'','html_message':'','recipient_list':''}
  mailItems='';

  constructor(private api: ApiService,
    private router: Router) {

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

      this.api.rollSearch(this.user_data.roll_number).subscribe(
        data => {
          this.requests = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  getReq(){
    this.api.rollSearch(this.user_data.roll_number).subscribe(
      data => {
        this.requests = data;
      },
      error => {
        console.log(error);
      }
    );
}
  choose(a, b) {

    if (a == b)
      return true

    else
      return false

  }


  total(roll) {


    //     var i;
    //   for (i = 0; i < this.requests.length; i+=1) {

    //     if( this.requests[i].is_sent == false){
    //       this.total_items+= this.requests[i].quantity

    //       console.log(this.total_items)
    //       console.log(this.requests[i].quantity)

    //        console.log(this.requests.length)

    //       console.log("this.requests[1].quantity")
    //   }
    // }



    const keys = Object.keys(this.requests)
    this.total_items = 0

    for (const key of keys) {



      if (this.requests[key].is_sent == false) {
        this.total_items += this.requests[key].quantity
        //  console.log(this.requests[key].id, "hi")



      }
    }


    console.log(" my var"+this.myVar)


  }


  updateRequest()
  {
    var i;
    for (i = 0; i < this.requests.length; i+=1)
      {
        console.log(" request quantity"+this.requests[i].quantity)
        console.log(" item quantity"+this.items[this.requests[i].item-1].quantity)

    if( this.requests[i].quantity>this.items[this.requests[i].item-1].quantity && (this.requests[i].is_sent == false) )
          {
            this.myVar=1;
          }
        }

    console.log(" my var"+this.myVar)


    for (i = 0; i < this.requests.length; i+=1)
      {
        if( (this.requests[i].is_sent == false) && (this.myVar==0) )
          {
            this.requests[i].is_sent = true;
            this.requests[i].checkout_time = new Date();
            console.log(this.requests[i].checkout_time)
            this.mailItems+='<strong>'+this.items[this.requests[i].item-1].name+'</strong>: Quantity = <strong>'+this.requests[i].quantity+'</strong><br>'
            console.log(this.mailItems)
            this.api.updateRequest(this.requests[i]).subscribe
              (
                data =>
                  {
                    console.log(data)
                  },
                error =>
                  {
                    console.log(error);
                  }
              );
          }

      }

      if(this.myVar==1){
      this.router.navigate(['./cart'])
      console.error("quantity chosen is not available");
    }

      else  {this.router.navigate(['./approved'])}

      if(this.total_items>0){
        console.log('mailsent')
        this.mail.roll_number=this.user_data.roll_number
        this.mail.subject = 'Student - issue items'
        this.mail.message = ' <h1>to be issued</h1>'
        this.mail.recipient_list = environment.technician_mails
        var date_time =new Date()
        this.mail.html_message = this.user_data.first_name+' '+this.user_data.last_name+' is trying to issue the following items:<br>'+this.mailItems+'<br>Click on this link to approve or deny  http://localhost:4200/technician<br><br>Details of student: '+this.user_data.roll_number+'<br>Email ID of student: '+this.user_data.email


        this.api.updateMail(this.mail).subscribe(data => {this.api.sendMail(this.user_data.roll_number); console.log(data) }, error => { console.log(error); });


      }
  }

  updateQuantityUp(request)
  {
    if( request.quantity < this.items[request.item-1].quantity)
      {
        request.quantity++;
      }
    this.api.updateRequest(request).subscribe
      (
        data =>
          {
            console.log(data)
          },
        error =>
          {
            console.log(error);
          }
      );

  }

  updateQuantityDown(request)
  {
    if( request.quantity > 1)
      {
        request.quantity--;
      }
    this.api.updateRequest(request).subscribe
      (
        data =>
          {
            console.log(request.item, this.items[request.item-1])
          },
        error =>
          {
            console.log(error);
          }
      );
  }




  deleteRequest(request)
  {
    this.requests.splice(request.id -1, 1)
    this.api.deleteRequest(request.id).subscribe
      (
        data =>
          {
             this.getReq();
          },
        error =>
          {
            console.log(error);
          }
      );
  }

  deleteAllRequest()
  {

    const keys = Object.keys(this.requests)
    this.total_items = 0

    for (const key of keys) {



      if (this.requests[key].is_sent == false) {

    this.requests.splice(this.requests[key].id -1, 1)
    this.api.deleteRequest(this.requests[key].id).subscribe
      (
        data =>
          {
             this.getReq();
          },
        error =>
          {
            console.log(error);
          }
      );
  }
}
}

}
