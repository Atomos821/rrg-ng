import { Routes } from '@angular/router';
import { StatsComponent } from './stats';

export const STATS_ROUTES: Routes = [
  {
    path: '',
    component: StatsComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        loadComponent: () => import('./pages/overview/overview').then(m => m.Overview)
      }
    ]
  }
];