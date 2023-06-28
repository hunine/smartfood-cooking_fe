import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../service/app.layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;
  menuItems: any;

  constructor(public layoutService: LayoutService) {
    this.menuItems = [
      {
        label: 'Update Profile',
        icon: 'pi pi-fw pi-pencil',
        routerLink: ['/auth/update-profile'],
      },
      {
        separator: true,
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
      },
    ];
  }
}
