import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard.component').then((x) => x.DashboardComponent),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./home.component').then((x) => x.HomeComponent),
      },
      {
        path: 'participants',
        loadChildren: () =>
          import('./participants.routes').then((x) => x.ParticipantsRoutes),
      },
      {
        path: 'param-tables',
        loadChildren: () =>
          import('./param-tables.routes').then((x) => x.ParamTablesRoutes),
      },
      {
        path: 'parameters',
        loadComponent: () =>
          import('./parameters.component').then((x) => x.ParametersComponent),
      },
      {
        path: 'discards',
        loadComponent: () =>
          import('./discards.component').then((x) => x.DiscardsComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./settings.component').then((x) => x.SettingsComponent),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
