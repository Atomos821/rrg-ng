import { Routes } from '@angular/router';

import { MainComponent } from './layout/main/main.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
            },
        ]
    }
];
