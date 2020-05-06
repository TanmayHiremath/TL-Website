import { Component, OnInit } from '@angular/core';

declare var rCounter :any;
@Component({

  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {

    $(document).ready(function () {

      //  overlay
      $(".card").mouseover(function () {
        $(".card").css("cursor", "pointer")
      });

      $(".card-body").click(function () {
        $(this).siblings(".overlay").slideDown(400)

      });

      $(".overlay").click(function () {
        $(".overlay").slideUp(400)
      });



      $(function(){
        $('.count-num').rCounter({
          duration: 30
        });
      });


    });
  }
}
