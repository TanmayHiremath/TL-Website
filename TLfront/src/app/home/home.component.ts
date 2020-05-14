import { Component, OnInit } from '@angular/core';
declare var $:any;
import * as custom from "src/assets/js/jquery.rcounterup.js"
import { OwlOptions } from 'ngx-owl-carousel-o';


declare var rCounter: any;
@Component({

  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }


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


      $("#myCarousel").carousel({
        interval:2500
      });

      // Enable Carousel Indicators
      $(".item1").click(function () {
        $("#myCarousel").carousel(0);
      });
      $(".item2").click(function () {
        $("#myCarousel").carousel(1);
      });
      $(".item3").click(function () {
        $("#myCarousel").carousel(2);
      });

      // Enable Carousel Controls
      $(".carousel-control-prev").click(function () {
        $("#myCarousel").carousel("prev");
      });
      $(".carousel-control-next").click(function () {
        $("#myCarousel").carousel("next");
      });
    });



  }
}
