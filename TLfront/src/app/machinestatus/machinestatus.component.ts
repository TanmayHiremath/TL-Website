import { Component, OnInit} from '@angular/core';
import { ApiService } from '../api.service';
declare var $: any
import { Router } from '@angular/router'
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-machinestatus',
  templateUrl: './machinestatus.component.html',
  styleUrls: ['./machinestatus.component.css']
})
export class MachinestatusComponent implements OnInit {

  machines= []
  items=[]
  x=[]

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {


    this.api.getmachine().subscribe(
      data => {
        this.machines = data;
        this.x= data.type;
        console.log(data)
      });

      this.api.getItems().subscribe(
        data => {
          this.items = data;
          console.log(data)
        });





  }

}
