// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

export interface Utilisateur {
  id: number;
  first_name: string;
  last_name: string;
  genre: string;
  langue: string;
  pays: string;
  phone: string;
  username: string;
  password: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.base}/utilisateurs`);
  }
  getUtilisateur(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.base}/utilisateurs/${id}`);
  }

  updateUtilisateur(id: number, u: Partial<Utilisateur>): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.base}/utilisateurs/${id}`, u);
  }


  addUtilisateur(u: Partial<Utilisateur>): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.base}/utilisateurs`, u);
  }
}
