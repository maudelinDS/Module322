import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Ballades { id: number; titre: string; description: string;image: string; }

@Injectable({
  providedIn: 'root'
})
export class BalladesService {


  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBallades(): Observable<Ballades[]> {
    return this.http.get<Ballades[]>(`${this.base}/ballades`);
  }
  getBallade(id: number): Observable<Ballades> {
    return this.http.get<Ballades>(`${this.base}/ballades/${id}`);
  }
  addBallade(u: Partial<Ballades>): Observable<Ballades> {
    return this.http.post<Ballades>(`${this.base}/ballades`, u);
  }
}
