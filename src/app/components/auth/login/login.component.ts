import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  providers: [MessageService],
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

  submitted = false;

  constructor(
    public layoutService: LayoutService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  // Handle
  async handleSubmit() {
    if (!this.email || !this.password) {
      this.submitted = true;
      return;
    }

    const returnData = await this.authService.login({
      email: this.email,
      password: this.password,
    });

    if (!returnData.success) {

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: returnData.message,
        life: 3000,
      });

      return;
    }

    localStorage.setItem('accessToken', returnData.data.accessToken);

    this.router.navigate(['/']);
  }
}
