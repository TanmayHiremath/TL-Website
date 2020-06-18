import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

import * as $ from 'jquery';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css'],
  providers: [ApiService]
})
export class ApprovedComponent implements OnInit {

  items = []
  requests = []
  total_items=0
  user_data
  logged_in

  constructor(private api: ApiService,  private router: Router) { 
    
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
  flagItem(request)
  {
    this.items[request.item-1].is_flagged= true;
    this.api.updateItem(this.items[request.item-1]).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );

    this.api.createFlag(request).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );
  }

 
}
