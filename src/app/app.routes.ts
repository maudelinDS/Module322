import { Routes } from '@angular/router';
import { ListeUtilisateursComponent } from './composants/liste-utilisateurs/liste-utilisateurs.component';

export const routes: Routes = [
  {
    path: 'utilisateurs',
    component: ListeUtilisateursComponent
  },
  {
    path: '',
    redirectTo: 'utilisateurs',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'utilisateurs'
  }
];
