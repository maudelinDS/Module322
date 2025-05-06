import {Routes} from '@angular/router';
import {LoginComponent} from './Pages/Login/login.component';
import {AcceuilComponent} from './Pages/acceuil/acceuil.component';
import {AccountComponent} from './Pages/account/account.component';
import {FavorisComponent} from './Pages/favoris/favoris.component';
import {NotFoundComponent} from './Pages/not-found/not-found.component';

export const routes: Routes = [
  {path: 'explore', component: AcceuilComponent},
  {path: 'favoris', component: FavorisComponent},
  {path: 'account', component: AccountComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];
