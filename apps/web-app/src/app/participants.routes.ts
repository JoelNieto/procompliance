import { Routes } from '@angular/router';

export const ParticipantsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all',
        loadComponent: () =>
          import('./participants.component').then(
            (x) => x.ParticipantsComponent
          ),
      },
      {
        path: ':participantId',
        loadComponent: () =>
          import('./participant-details.component').then(
            (x) => x.ParticipantDetailsComponent
          ),
      },
      { path: '', redirectTo: 'all', pathMatch: 'full' },
    ],
  },
];
