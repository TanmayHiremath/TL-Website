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
  


  only_approved(){

    this.filter_approved=true;
    this.filter_denied=false;
    console.log(this.filter_approved)
    console.log(this.filter_denied)

  }
  only_denied(){
    this.filter_approved=false;
    this.filter_denied=true;
    console.log(this.filter_approved)
    console.log(this.filter_denied)

  }
  only_pending(){

    this.filter_approved=false;
    this.filter_denied=false;
    console.log(this.filter_approved)
    console.log(this.filter_denied)

  }
  all_1(){

    this.filter_approved=true;
    this.filter_denied=false;
    console.log(this.filter_approved)

  }
 

}
