import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TLfront';
  year='a';
  constructor() {
  
  this.year = new Date().getFullYear().toString();
   }
  
  

}