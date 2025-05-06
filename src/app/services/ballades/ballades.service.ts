import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Ballades {
  id: number;
  titre: string;
  description: string;
  image: string;
  km: number;
  place: string;
  open: string;
  date: string;
  favoris: boolean;
  filter_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class BalladesService {


  private base = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getBallades(): Observable<Ballades[]> {
    return this.http.get<Ballades[]>(`${this.base}/ballades`);
  }

  getBallade(id: number): Observable<Ballades> {
    return this.http.get<Ballades>(`${this.base}/ballades/${id}`);
  }

  addBallade(u: Partial<Ballades>): Observable<Ballades> {
    return this.http.post<Ballades>(`${this.base}/ballades`, u);
  }

  // inside FiltresService
// dans FiltresService
  updateBalladeFull(ballade: Ballades): Observable<Ballades> {
    return this.http.put<Ballades>(`${this.base}/ballades/${ballade.id}`, ballade);
  }

  getFavoriteBallades(): Observable<Ballades[]> {
    return this.http.get<Ballades[]>(`${this.base}/ballades?favoris=true`);
  }

}
