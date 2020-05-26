import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import * as $ from 'jquery';
import {Router} from '@angular/router'

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  items = [{}];
  tabledisplay: boolean = false;
  id_required_string: string
  requests: [{ id: '' }];
  newRequest
  displaycartbtn:boolean=true

  constructor(private api: ApiService,private router :Router) {
    
    this.GetItems();
    this.newRequest = { id: -1, item: -1, roll: 0,quantity:1 }
    
  }

  ngOnInit(): void {


    $(document).ready(function () {
      
      $("i").click(function () {
        $(this).toggleClass("far")
        $(this).toggleClass("fas")
      });
      
      
      $(".itemName").click(function () {
        console.log("Hi")
        //$(this).siblings(".overlay").slideDown(400)

      });


      $(".overlay").click(function () {
        $(".overlay").slideUp(400)
      });

      


    });

  }


  GetItems = () => {
    this.api.getItems().subscribe(
      data => {
        this.items = data;
      },
      error => {
        console.log(error);
      }
    );
    
  }


  CreateRequest = (item) => {
    
    // this.router.navigate(['../cart'])
    this.newRequest.item = item.id
    

    this.api.createRequest(this.newRequest).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );

  }




  convertBool(item) {
    if (item.id_required == false) {
      this.id_required_string = "No"
    }
    else {
      this.id_required_string = "Yes"
    }
  }


  categoryClicked(clickedItem) {
    


    this.tabledisplay = false

    this.items.forEach(iterate)
    function iterate(item) {

      item.displaylevel2 = 0
      item.display = 0

      if (item.category == clickedItem.category) { item.displaylevel1 = 1 }

      else { item.displaylevel1 = 0 }

    }
  }


  level1Clicked(clickedItem) {

    this.tabledisplay = false

    this.items.forEach(iterate)
    function iterate(item) {

      item.display = 0


      if (item.displaylevel1 == clickedItem.displaylevel1) { item.displaylevel2 = !item.displaylevel2 }

      else { item.displaylevel2 = 0 }

    }
  }


  level2Clicked(clickedItem) {

    this.tabledisplay = !this.tabledisplay

    this.items.forEach(iterate)
    function iterate(item) {

      if (item.displaylevel2 == clickedItem.displaylevel2) { item.display = !item.display }

      else { item.display = 0 }

    }

  

  }
  
  cartClicked() {
    this.displaycartbtn=false;
  }

  incrementQuantity() {
    this.newRequest.quantity ++;
  }

  decrementQuantity() {
    this.newRequest.quantity --;
  }


    
  showAddedToCart() {
    document.getElementById("addedToCart").style.display ="block";
    
    document.getElementById("specifyQuantity").style.display = "none";
    document.getElementById("addToCart").style.display = "none";
  }
}