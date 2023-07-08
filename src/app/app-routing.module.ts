import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthGuard } from './_shared/guard/auth.guard';
import { RoleGuard } from './_shared/guard/role.guard';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          canActivate: [AuthGuard, RoleGuard],
          component: AppLayoutComponent,
          children: [
            {
              path: '',
              loadChildren: () =>
                import('./components/dashboard/dashboard.module').then(
                  (m) => m.DashboardModule
                ),
            },
            {
              path: 'pages',
              loadChildren: () =>
                import('./components/pages/pages.module').then(
                  (m) => m.PagesModule
                ),
            },
            {
              path: 'auth/update-profile',
              loadChildren: () =>
                import(
                  './components/auth/update-profile/update-profile.module'
                ).then((m) => m.UpdateProfileModule),
            },
          ],
        },
        {
          path: 'auth',
          loadChildren: () =>
            import('./components/auth/auth.module').then((m) => m.AuthModule),
        },
        { path: 'notfound', component: NotfoundComponent },
        { path: '**', redirectTo: '/notfound' },
      ],
      {
        useHash: true,
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload',
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
