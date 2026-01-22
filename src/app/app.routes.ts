import { Routes } from '@angular/router';

import { Main } from './layout/main/main';

export const routes: Routes = [
  {
    path: '',
    component: Main,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home').then(m => m.Home),
      },
      {
        path: 'stats',
        loadChildren: () => import('./features/stats/stats.routes').then(m => m.STATS_ROUTES),
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];
