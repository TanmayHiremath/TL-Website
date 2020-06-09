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
    private router: Router) { }

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

  filter_approved=false;
  filter_denied=false;
  filter_11='d-show';
  filter_12='d-none';
  

  only_approved(){
    this.filter_11='d-show';
    this.filter_12='d-none';
    this.filter_approved=true;
    this.filter_denied=false;
    console.log(this.filter_approved)
    console.log(this.filter_denied)

  }
  only_denied(){
    this.filter_11='d-show';
    this.filter_12='d-none';
    this.filter_approved=false;
    this.filter_denied=true;
    console.log(this.filter_approved)
    console.log(this.filter_denied)

  }
  only_pending(){
    this.filter_11='d-show';
    this.filter_12='d-none';
    this.filter_approved=false;
    this.filter_denied=false;
    console.log(this.filter_approved)
    console.log(this.filter_denied)

  }
  all_1(){
    this.filter_11='d-none';
    this.filter_12='d-show';
    this.filter_approved=true;
    this.filter_denied=false;
    console.log(this.filter_approved)

  }
 
  approve_request(request)
  {
    request.is_approved=true;
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
  deny_request(request)
  {
    request.is_approved=false;
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
    request.is_approved=false;
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

}
