import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {ApplicationGuardService} from './services/application-guard.service';
import {LoginComponent} from './pages/login/login.component';
import {GestionUtilisateurComponent} from './pages/gestion-utilisateur/gestion-utilisateur.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    canActivate: [ApplicationGuardService],
    component: AdminLayoutComponent,
    children:
    [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
]
