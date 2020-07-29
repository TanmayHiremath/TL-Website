import { Component, OnInit, AfterViewChecked, Renderer2, SecurityContext } from '@angular/core';
import { ApiService } from '../api.service';
declare var $: any
import { Router } from '@angular/router'
import { environment } from '../../environments/environment';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { FacebookService, InitParams } from 'ngx-facebook';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsComponent implements OnInit, AfterViewChecked {

  fblinks = [];
  srcdoc = [];
  linkk
  constructor(private fb: FacebookService, private api: ApiService, private router: Router, public sanitizer: DomSanitizer) {
    this.api.getfblink().subscribe(
      data => {
        this.fblinks = data;
        console.log(data)
      });

    this.fblinks.forEach(fblink => {
      fblink.link = this.getUrl(fblink.link)
    });
    this.linkk = 'https://www.facebook.com/tinkererIITB/posts/1768511736622040'
    const initParams: InitParams = {
      appId: '763233617543300',
      xfbml: true,
      version: 'v7.0'
    };
    fb.init(initParams);
  }

  ngOnInit(): void {
    setTimeout(function () {
      console.log(document.querySelector("iframe"));
      if(document.querySelector("iframe")==null){
        window.location.reload()
      };
    }, 2000);



    // for(var i=0;i<=2;i++){
    // this.srcdoc[i] = this.sanitizer.bypassSecurityTrustHtml('<iframe width="560" height="315" src='+ this.getUrl(this.fblinks[i].link) +' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    // }
  }
  ngAfterViewChecked(): void {

  }
  getUrl(url) {
    return this.sanitizer.sanitize(SecurityContext.URL, url);
  }
}



