import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as Array<string>;
    const userRole = this.authService.getUserRole();

    if (this.authService.isAuthenticated() && userRole && requiredRoles.includes(userRole)) {
      return true;
    }

    // Redirect or show access denied
    this.router.navigate(['/']); // Or access-denied page
    return false;
  }
}
