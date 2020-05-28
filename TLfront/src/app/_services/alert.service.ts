import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import * as Noty from 'noty';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    // this.subject.next({ type: 'success', text: message });
    new Noty({
      type: 'success',
      theme: 'nest',
      text: message,
      timeout: 5000,
      killer: true
    }).show();
  }

  errorWithMessage(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    // this.subject.next({ type: 'error', text: message });
    new Noty({
      type: 'error',
      theme: 'nest',
      text: message,
      timeout: 5000,
      killer: true
    }).show();
  }

  error(err: any, keepAfterNavigationChange = false) {
    const message = err.error.message || err.statusText;

    this.keepAfterNavigationChange = keepAfterNavigationChange;
    // this.subject.next({ type: 'error', text: message });
    new Noty({
      type: 'error',
      theme: 'nest',
      text: message,
      timeout: 5000,
      killer: true
    }).show();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
