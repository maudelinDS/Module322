import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Filtres {
  id: number;
  name: string;


}

@Injectable({
  providedIn: 'root'
})
export class FiltresService {


  private base = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getFiltres(): Observable<Filtres[]> {
    return this.http.get<Filtres[]>(`${this.base}/filtres`);
  }

  getFiltre(id: number): Observable<Filtres> {
    return this.http.get<Filtres>(`${this.base}/filtres/${id}`);
  }

  addFiltre(u: Partial<Filtres>): Observable<Filtres> {
    return this.http.post<Filtres>(`${this.base}/filtres`, u);
  }

  // inside FiltresService
// dans FiltresService
  updateFiltreFull(ballade: Filtres): Observable<Filtres> {
    return this.http.put<Filtres>(`${this.base}/filtres/${ballade.id}`, ballade);
  }


}
