import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ApiService]
})
export class CartComponent implements OnInit {

  orders = [{customer:'titanic'}]

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
    
  }

}
