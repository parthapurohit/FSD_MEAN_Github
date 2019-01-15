import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.getUsernameCookie) {
      this.authService.login();
    } else {
      this.authService.logout();
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isLoggedIn || !this.authService.getUsernameCookie) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
