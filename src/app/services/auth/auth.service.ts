import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {environment} from '../../../environments/environment';

export interface Utilisateur {
  id: number;
  nom: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<Utilisateur> {
    // json-server permet la recherche par query params
    return this.http
      .get<Utilisateur[]>(`${this.base}/utilisateurs?username=${username}&password=${password}`
      )
      .pipe(
        map(users => {
          if (users.length) {
            // prends le premier et simule un stockage de session
            const user = users[0];
            localStorage.setItem('currentUser', JSON.stringify({ id: user.id, nom: user.nom }));
            return user;
          }
          throw new Error('Identifiants invalides');
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
  getCurrentUserId(): number | null {
    const user = localStorage.getItem('currentUser');
    if (user) {
      try {
        return JSON.parse(user).id;
      } catch {
        return null;
      }
    }
    return null;
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}
