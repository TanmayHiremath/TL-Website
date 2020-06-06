import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fate',
  templateUrl: './fate.component.html',
  styleUrls: ['./fate.component.css']
})
export class FateComponent implements OnInit {
  requests = []
  items = []

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
    console.log("data")
    
    this.api.updateRequest(request).subscribe
      (
        data => 
          {
            console.log(data)
            console.log("ata")
          },
        error => 
          {
            console.log(error);
          }
      );
    
  }

}