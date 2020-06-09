import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {FormsModule} from '@angular/forms'
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fate',
  templateUrl: './fate.component.html',
  styleUrls: ['./fate.component.css'],
  providers: [ApiService]
})
export class FateComponent implements OnInit {
  requests = []
  items = []
  quantity;
  constructor(private api: ApiService,
    private router: Router) { 

    }

  ngOnInit(): void {



    
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
  getReq(){
    this.api.getRequests().subscribe(
      data => {
        this.requests = data;
      },
      error => {
        console.log(error);
      }
    );
}

  filter_issued=false;
  filter_denied=false;
  filter_11='d-show';
  filter_12='d-none';
  

  only_issued(){
    this.filter_11='d-show';
    this.filter_12='d-none';
    this.filter_issued=true;
    this.filter_denied=false;
    console.log(this.filter_issued)
    console.log(this.filter_denied)

  }
  only_denied(){
    this.filter_11='d-show';
    this.filter_12='d-none';
    this.filter_issued=false;
    this.filter_denied=true;
    console.log(this.filter_issued)
    console.log(this.filter_denied)

  }
  only_pending(){
    this.filter_11='d-show';
    this.filter_12='d-none';
    this.filter_issued=false;
    this.filter_denied=false;
    console.log(this.filter_issued)
    console.log(this.filter_denied)

  }
  all_1(){
    this.filter_11='d-none';
    this.filter_12='d-show';
    this.filter_issued=true;
    this.filter_denied=false;
    console.log(this.filter_issued)

  }

  issue_request(request)
  {
    request.is_issued=true;
    request.is_denied=false;
    request.is_returned=this.items[request.item-1].is_consumable;

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
  deny_request(request)
  {
    request.is_issued=false;
    request.is_denied=true;
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
  p_request(request)
  {
    request.is_issued=false;
    request.is_denied=false;
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




  incrementQuantity(item) {
    item.quantity++;
  }

  decrementQuantity(item) {
    item.quantity--;
  }
  incrementPrice(item) {
    item.price++;
  }

  decrementPrice(item) {
    item.price--;
  }

save(item){

  console.log(item)
  this.api.updateItem(item).subscribe
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

      console.log("data")
        }

}
