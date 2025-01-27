import { Routes } from '@angular/router';

export const ParamTablesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all',
        loadComponent: () =>
          import('./param-tables.component').then(
            (x) => x.ParamTablesComponent
          ),
      },
      {
        path: ':paramTableId',
        loadComponent: () =>
          import('./param-table-details.component').then(
            (x) => x.ParamTableDetailsComponent
          ),
      },
      { path: '', redirectTo: 'all', pathMatch: 'full' },
    ],
  },
];
