import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  signIn() {
    if (this.username.trim() && this.password.trim()) {
      this.authService.checkUser(this.username, this.password).subscribe(user => {
        if (user['username']) {
          this.authService.setUsernameCookie(user['username']);
          this.authService.login();
          this.router.navigate(['/home']);
        } else {
          this.errorMsg = 'Username/Password is wrong';
        }
      });
    }
  }

}
