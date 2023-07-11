// src/app/auth/role-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import decode from 'jwt-decode';
import { UserDto } from 'src/app/api/user';
import { Role } from 'src/app/common/enum/role.enum';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('accessToken') || '';
    const tokenPayload: { user: UserDto } = decode(token);

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return false;
    } else {
      if (tokenPayload.user.role !== Role.Admin) {
        this.router.navigate(['/auth/access']);
        return false;
      }
    }

    return true;
  }
}
