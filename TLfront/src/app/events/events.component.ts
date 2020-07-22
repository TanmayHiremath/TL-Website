import { Component, OnInit, Renderer2  } from '@angular/core';
import { ApiService } from '../api.service';
declare var $: any
import { Router } from '@angular/router'
import { environment } from '../../environments/environment';
import{ DomSanitizer } from '@angular/platform-browser'
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  fblinks = [];
  srcdoc=[];

  constructor(private api: ApiService, private router: Router, private sanitizer: DomSanitizer ) { }

  ngOnInit(): void {
    
    this.api.getfblink().subscribe(
      data => {
        this.fblinks = data;
        console.log(data)
      });

      for(var i=0;i<=2;i++){
      this.srcdoc[i] = this.sanitizer.bypassSecurityTrustHtml('<iframe width="560" height="315" src='+ this.getUrl(this.fblinks[i].link) +' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
      }
}
getUrl(post)
{
  return this.sanitizer.bypassSecurityTrustResourceUrl(post);
}
}



