import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
    this.cookieService.delete('Username');
    this.cookieService.delete('e_session_cookie');
    this.cookieService.delete('Cart');
    this.cookieService.deleteAll();
  }

  checkUser(username, password) {
    return this.http.post(`http://localhost:3000/api/login/`, { username: username, password: password }, {
      withCredentials: true
    });
  }

  getUsernameCookie() {
    return this.cookieService.get('Username');
  }

  setUsernameCookie(username) {
    this.cookieService.set('Username', username);
  }
}
