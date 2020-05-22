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
  items = []
  requests = []
  total_items=0

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
      this.api.getCustomer().subscribe(
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
      this.api.getRequest().subscribe(
        data => {
          this.requests = data;
        },
        error => {
          console.log(error);
        }
      );
        
  }


  choose(a, b){

    if(a == b)
      return true

      else
      return false

  }

 
  total(roll) {

    const keys= Object.keys(this.requests)
    for( const key of keys) {

     

      if((this.requests[key].is_approved == true) && (this.requests[key].is_issued == true) && !(this.requests[key].is_sent == true) &&!(this.requests[key].is_returned == true) )

          this.total_items+= this.requests[key].quantity
      
    }
    

  }  


}
