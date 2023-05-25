import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          { label: 'Dashboard', icon: 'fa-solid fa-house', routerLink: ['/'] },
        ],
      },
      {
        label: 'Management',
        items: [
          {
            label: 'Recipes',
            icon: 'fa-solid fa-utensils',
            routerLink: ['/pages/recipe'],
          },
          {
            label: 'Ingredients',
            icon: 'fa-solid fa-kitchen-set',
            routerLink: ['/pages/ingredient'],
          },
          {
            label: 'Categories',
            icon: 'fa-solid fa-bowl-food',
            routerLink: ['/pages/category'],
          },
          {
            label: 'Cuisine',
            icon: 'fa-solid fa-earth-asia',
            routerLink: ['/pages/cuisine'],
          },
          {
            label: 'Levels',
            icon: 'fa-solid fa-signal',
            routerLink: ['/pages/level'],
          },
        ],
      },
    ];
  }
}
