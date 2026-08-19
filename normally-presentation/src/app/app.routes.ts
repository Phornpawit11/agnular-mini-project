import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/presentations/pages/presentation-list-page').then(
        (module) => module.PresentationListPage,
      ),
  },
];
