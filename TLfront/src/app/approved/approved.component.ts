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
  flags=[]
  total_items=0
  user_data
  logged_in
  diff
  newFlag: { item: any; roll_number?: string; }
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
      this.api.getFlags().subscribe(
        data => {
          this.flags = data;
          console.log(data)
          this.diff=(new Date(this.flags[1].time)).getTime()-(new Date(this.flags[0].time)).getTime()
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

    this.newFlag.item=this.items[request.item-1].id
    this.newFlag.roll_number= this.user_data.roll_number
    this.api.createFlag(this.newFlag).subscribe(
      data => {
        this.flags.push(this.newFlag)
      },
      error => {
        console.log(error);
      }
    );
  }

  
  sendtype(flag)
  {
    var dede=(new Date(flag)).getTime()
    console.log(dede)
    console.log(this.diff)
    return this.diff

  }
 
}
