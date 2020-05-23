import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

import * as $ from 'jquery';

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
  items = [{}]
  requests = []
  total_items = 0


  constructor(private api: ApiService) {

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



      }
    }





  }


  updateRequest() {


    var i;
    for (i = 0; i < this.requests.length; i += 1) {

      if (this.requests[i].is_sent == false) {

        this.api.updateRequest(this.requests[i]).subscribe(
          data => {
            console.log(data)
          },
          error => {
            console.log(error);
          }
        );
      }
    }




  }


}
