import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SEOService {

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router
  ) { }

  public addSeoData(): void {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)).subscribe(() => {
        let root = this.router.routerState.snapshot.root;
        while (root) {
          if (root.children && root.children.length) {
            root = root.children[0];
          } else if (root.data && root.data['title']) {
            this.titleService.setTitle(root.data['title'] + ' | SAC Room Booking Portal');
            const tags = root.data['metatags'];
            for (const tag of Object.keys(tags)) {
              this.metaService.addTag({ name: tag, content: tags[tag] });
            }
            return;
          } else {
            return;
          }
        }
      });
  }
}
