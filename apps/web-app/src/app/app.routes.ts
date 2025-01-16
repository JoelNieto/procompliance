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
        loadComponent: () =>
          import('./participants.component').then(
            (x) => x.ParticipantsComponent
          ),
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
