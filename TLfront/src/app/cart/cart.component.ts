import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

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
      
      
      

    
  }


  choose(a, b){

    if(a == b)
      return true

      else
      return false

  }

}
