import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  items = [{name: 'sample'}];


  constructor(private api:ApiService) {
   
   }

  ngOnInit(): void {

    this.api.getItems()
      .subscribe(data => this.items=data);

  }

}
