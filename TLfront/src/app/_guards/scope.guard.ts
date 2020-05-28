import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class ScopeGuard implements CanActivate {
  constructor(
        public auth: AuthService,
        public router: Router,
        public jwtHelper: JwtHelperService
    ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const token = JSON.parse(localStorage.getItem('user')).token;
    // decode the token to get its payload
    const tokenPayload = this.jwtHelper.decodeToken(token);

    if (!this.auth.isAuthenticated() || tokenPayload.scope !== expectedRole) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
