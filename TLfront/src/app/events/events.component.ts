import { Component, OnInit, Renderer2  } from '@angular/core';
import { ApiService } from '../api.service';
declare var $: any
import { Router } from '@angular/router'
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  fblinks = [];

  constructor(private api: ApiService, private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {


    this.api.getfblink().subscribe(
      data => {
        this.fblinks = data;
        console.log(data)
      });
    
    
    
}
}



