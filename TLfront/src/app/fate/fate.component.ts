import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
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
  roll;
  x;
  constructor(private api: ApiService,
    private router: Router,
    private toastr: ToastrService) { 

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
  
searchTitle() {
  this.api.rollSearch(this.roll)
    .subscribe(
      data => {
        this.requests = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
}

  filter_issued=false;
  filter_denied=false;
  filter_returned=false;
  filter_consumable=true;
  filter_11='d-show';
  filter_12='d-none';
  filter_13='d-none';
  filter_1='d-none';
  filter_2='d-none';
  

  only_issued(){
    this.filter_11='d-show';
    this.filter_12='d-none';
    this.filter_13='d-none';
    this.filter_issued=true;
    this.filter_denied=false;
    this.filter_returned=false;
    this.filter_consumable=true;
    console.log(this.filter_issued)
    console.log(this.filter_denied)

  }
  only_denied(){
    this.filter_11='d-show';
    this.filter_12='d-none';
    this.filter_13='d-none';
    this.filter_issued=false;
    this.filter_denied=true;
    this.filter_returned=false;
    this.filter_consumable=true;
    console.log(this.filter_issued)
    console.log(this.filter_denied)

  }
  only_returned(){
    this.filter_11='d-none';
    this.filter_12='d-none';
    this.filter_13='d-show';
    this.filter_issued=true;
    this.filter_denied=false;
    this.filter_returned=true;

    console.log(this.filter_issued)
    console.log(this.filter_denied)

  }
  only_pending(){
    this.filter_11='d-show';
    this.filter_12='d-none';
    this.filter_13='d-none';
    this.filter_issued=false;
    this.filter_denied=false;
    this.filter_returned=false;
    console.log(this.filter_issued)
    console.log(this.filter_denied)

  }
  all_1(){
    this.filter_11='d-none';
    this.filter_12='d-show';
    this.filter_13='d-none';
    this.filter_issued=true;
    this.filter_denied=false;
    console.log(this.filter_issued)

  }

  issue_request(request)
  {
    request.is_issued=true;
    request.is_denied=false;
    request.is_returned=this.items[request.item-1].is_consumable;
    this.items[request.item-1].quantity-=request.quantity;
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
      this.api.updateItem(this.items[request.item-1]).subscribe
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


      this.toastr.success(this.items[request.item-1].name+' is issued successfully to '+ request.roll, 'Issued',
      {timeOut: 1000,
      positionClass : "toast-top-full-width"
      });
    

    
  }
  deny_request(request)
  {
    request.is_issued=false;
    request.is_denied=true;
    request.is_returned=false;
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

      this.toastr.success(this.items[request.item-1].name+' requested by '+ request.roll+ ' has been denied', 'Issued',
      {timeOut: 1000,
      positionClass : "toast-top-full-width"
      });
    
  }
  return_request(request)
  {
    request.is_issued=true;
    request.is_denied=false;
    request.is_returned=true;
    this.items[request.item-1].quantity+=request.quantity;
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
      this.api.updateItem(this.items[request.item-1]).subscribe
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
      this.toastr.success(this.items[request.item-1].name+' issued by '+ request.roll +' is returned successfully', 'Returned',
      {timeOut: 1000,
      positionClass : "toast-top-full-width"
      });
    
  }
  p_request(request)
  {
    request.is_issued=false;
    request.is_denied=false;
    request.is_returned=false;

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
  this.x=item
  console.log(item)
  this.api.updateItem(this.x).subscribe
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




      this.toastr.success(item.name+' has been updated', 'Updated Successfully',
    {timeOut: 2000,
    positionClass : "toast-top-full-width"
    });
  }
  show_requests(){
    this.filter_1='d-show';
    this.filter_2='d-none';
  }

  show_items(){
    this.filter_1='d-none';
    this.filter_2='d-show';
  }



  

}
