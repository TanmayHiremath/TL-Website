import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import * as $ from 'jquery';
import { Router } from '@angular/router'

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
  newRequest: { item: any; quantity: any; id?: number; roll?: number; }
  displaycartbtn: boolean = true
  fw = "red"
  constructor(private api: ApiService, private router: Router) {


    this.newRequest = { id: -1, item: -1, roll: 0, quantity: 1 }

  }

  ngOnInit(): void {
    
    this.api.getItems().subscribe(
      data => {
        this.items = data;
        //setcolourcode
        const that = this
        this.items.forEach(iterate)
        function iterate(item) {
          if (item.is_consumable == true) {
            if (item.quantity < 0.3 * item.critical_val) { item.colour_code = "red" }
            else if (item.quantity < 0.75 * item.critical_val) { item.colour_code = "yellow" }
            else if (item.quantity < item.critical_val) { item.colour_code = "green" }
            else { item.colour_code = "green" }

          }
          that.api.updateItem(item).subscribe(data => { console.log(data) },error => { console.log(error); });

        }
        //end setcolourcode

      },
      error => {
        console.log(error);
      }
    );





    $(document).ready(function () {




      $("i").click(function () {
        $(this).toggleClass("far")
        $(this).toggleClass("fas")
      });





      $(".overlay").click(function () {
        $(".overlay").slideUp(400)
      });




    });

  }


  CreateRequest(item) {

    // this.router.navigate(['../cart'])
    this.newRequest.item = item.id

    document.getElementById("addedToCart").style.display = "block";

    document.getElementById("specifyQuantity").style.display = "none";
    document.getElementById("addToCart").style.display = "none";


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
      return 'No'
    }
    else {
      return 'Yes'
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

  nameClicked() {
    $(".overlay").slideDown(400)
  }

  overlayClicked() {
    $(".overlay").slideUp(400)
  }

  cartClicked() {
    document.getElementById("specifyQuantity").style.display = "block";
    document.getElementById("addToCart").style.display = "none";

  }

  incrementQuantity() {
    this.newRequest.quantity++;
  }

  decrementQuantity() {
    this.newRequest.quantity--;
  }



  showAddedToCart() {
    document.getElementById("addedToCart").style.display = "block";

    document.getElementById("specifyQuantity").style.display = "none";
    document.getElementById("addToCart").style.display = "none";
  }


  setColourCode(items): void {


  }
}
