import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import * as $ from 'jquery';
import { AbstractControlDirective } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  items = [{name: 'sample'}];
  tabledisplay : boolean =false;
  id_required_string:string

  constructor(private api:ApiService) {
   
   }

  ngOnInit(): void {

    this.api.getItems()
      .subscribe(data => this.items=data);

    

  $(document).ready(function () {
      $("i").click(function(){
        $(this).toggleClass("far")
        $(this).toggleClass("fas")
      });



    });

  }
  


  convertBool( item ){
    if ( item.id_required == false ){
       this.id_required_string="No"
      }
    else {
       this.id_required_string = "Yes"
      }
  }


  categoryClicked(item) {

    const keys= Object.keys(this.items)
    this.tabledisplay=false
    for( const key of keys) {

      this.items[key].displaylevel2=0
      this.items[key].display=0

      if(this.items[key].category == item.category)
      {this.items[key].displaylevel1=1}

      else
      {this.items[key].displaylevel1=0}

    }
    

  }


  level1Clicked(item) {

    const keys= Object.keys(this.items)
    this.tabledisplay=false
    for( const key of keys) {

      this.items[key].display=0

      if(this.items[key].level1 == item.level1)
      {this.items[key].displaylevel2=!this.items[key].displaylevel2}

      else
      {this.items[key].displaylevel2=0}

    }
    

  }  


  level2Clicked(item) {

    const keys= Object.keys(this.items)
    this.tabledisplay=!this.tabledisplay
    for( const key of keys) {

      if(this.items[key].level2 == item.level2)
      {this.items[key].display=!this.items[key].display}

      else
      {this.items[key].display=0}

    }
    

  } 
}
