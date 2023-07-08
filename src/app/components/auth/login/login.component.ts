import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `,
  ],
})
export class LoginComponent {
  valCheck: string[] = ['remember'];

  email!: string;

  password!: string;

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private router: Router
  ) {}

  // Handle
  async handlSubmit() {
    if (!this.email || !this.password) {
      return;
    }

    const returnData = await this.authService.login({
      email: this.email,
      password: this.password,
    });

    localStorage.setItem('accessToken', returnData.data.accessToken);

    this.router.navigate(['/']);
  }
}
