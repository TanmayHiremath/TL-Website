import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

import * as $ from 'jquery';
import { Router } from '@angular/router';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ApiService]
})
export class CartComponent implements OnInit {

  orders = []
  products = []
  customers = []
  items = []
  requests
  total_items = 0
 

  constructor(private api: ApiService,
    private router: Router) {
    this.requests =[{ id: -1, item: -1, roll: 0,quantity:1 }]

  }

  ngOnInit(): void {

    this.api.getOrders().subscribe(
      data => {
        this.orders = data;
      },
      error => {
        console.log(error);
      }
    );

    this.api.getOrderproducts().subscribe(
      data => {
        this.products = data;
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
    this.api.getItems().subscribe(
      data => {
        this.items = data;
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





  }


  updateRequest()
  {
    
    

    
    var i;
    for (i = 0; i < this.requests.length; i+=1) 
      {
        if( (this.requests[i].is_sent == false) && (this.requests[i].quantity<=this.items[this.requests[i].item-1].quantity))
          {

            console.log("if")
            this.router.navigate(['./checkout'])
            this.requests[i].is_sent = true;
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

          else{this.router.navigate(['./inventory'])
        console.log("else")}

          
          
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
    if( request.quantity > 0)
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
    this.api.deleteRequest(this.requests).subscribe
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
