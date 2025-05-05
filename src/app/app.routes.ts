import {Routes} from '@angular/router';
import {ListeUtilisateursComponent} from './composants/liste-utilisateurs/liste-utilisateurs.component';
import {LoginComponent} from './Pages/Login/login.component';

export const routes: Routes = [
  {path: 'utilisateurs', component: ListeUtilisateursComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login'}
];
