import { Component, OnInit } from '@angular/core';
import * as custom from "src/assets/js/jquery.rcounterup.js"
import { OwlOptions } from 'ngx-owl-carousel-o';


declare var rCounter: any;
@Component({

  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {







  constructor() { }

  ngOnInit(): void {

    $(document).ready(function () {

//  overlay start
      $(".card").mouseover(function () {
        $(".card").css("cursor", "pointer")
      });

      $(".card-body").click(function () {
        $(this).siblings(".overlay").slideDown(400)

      });

      $(".overlay").click(function () {
        $(".overlay").slideUp(400)
      });
// overlay end

// funFacts start

      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


      var a = 0;
      $(window).scroll(function () {

        var oTop = $('#counter').offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
          $('.counter-value').each(function () {
            var $this = $(this),
              countTo = $this.attr('data-count');
            $({
              countNum: $this.text()
            }).animate({
              countNum: countTo
            },

              {

                duration: 2000,
                easing: 'swing',
                step: function () {
                  $this.text(Math.floor(parseInt(this.countNum)));
                },
                complete: function () {
                  $this.text(numberWithCommas(this.countNum) + "+");
                  //alert('finished');
                }

              });
          });
          a = 1;
        }

      });

// funFacts end

        




    });


    
  }
}
