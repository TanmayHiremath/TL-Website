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

  filter_condition=false
 

}
