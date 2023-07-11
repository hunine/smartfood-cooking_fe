import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpService } from './http.service';
import { ILoginAuth } from '../api/auth';
import { ManagementUrlConfig } from '../configs/manager-url.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    public jwtHelper: JwtHelperService,
    private httpService: HttpService
  ) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public async login(data: ILoginAuth) {
    const url = `${ManagementUrlConfig.authUrl}/login`;
    return this.httpService.post(url, data);
  }
}
