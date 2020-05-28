import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  apiBaseUrl = environment.apiBaseUrl;

  public login(code: String): Observable<boolean> {
    return this.http.post<{token: string}>(
      `${this.apiBaseUrl}/users/authenticate`,
      {code: code})
      .pipe(
        map(result => {
          localStorage.setItem('user', JSON.stringify(result['user']));
          return true;
        })
      );
  }

  public signup(user: User): Observable<boolean> {
    return this.http.post<{token: string}>(
      `${this.apiBaseUrl}/users`,
      { email: user.email, password: user.password })
      .pipe(
        map(result => {
          localStorage.setItem('user', JSON.stringify(result['user']));
          return true;
        })
      );
  }

  public logout() {
    localStorage.removeItem('user');
  }

  public isAuthenticated(): Boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? JSON.parse(localStorage.getItem('user')).token : '';

    return !this.jwtHelper.isTokenExpired(token);
  }

  public get isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));

    return user.admin;
  }

  public get isModerator(): Boolean {
    const user = JSON.parse(localStorage.getItem('user'));

    return user.moderator;
  }

  public getUsername(): string {
    const user = JSON.parse(localStorage.getItem('user'));

    return user.ldap_username;
  }

  public getUserDetails(user: string): Observable<any> {
    return this.http.get(
      `${this.apiBaseUrl}/users/${user}`);
  }

  public changeUserPrivilege(username: string, privilege: string, value: boolean): Observable<any> {
    return this.http.post(
      `${this.apiBaseUrl}/users/privilege`,
      { ldap_username: username, privilege: privilege, value: value }
    );
  }
}
