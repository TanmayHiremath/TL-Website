import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TLfront';
  year: string;
  flag;

  constructor() {

    this.flag=0;
    this.year = new Date().getFullYear().toString();

  }

  ngOnInit(): void {
    
    
    $(document).ready(function () {

     $(document).scroll(function (){
       if($(window).scrollTop()>700)
       {
        document.getElementById("scrollBtn").style.display="block";
        $(".nav").css({"background":"black","position":"sticky","top":"0"})
       }
       else
       {document.getElementById("scrollBtn").style.display="none";
         $(".nav").css({"background":"#20c9c3","position":"static"})}
       

     });

     $("#scrollBtn").click(function() {
      $('html, body').animate({
        scrollTop: 0
    }, 1200);
     });
       
     
    setTimeout(function(){
       $("#loader").fadeOut(400)
     },2000);


    });

  }
  



}



