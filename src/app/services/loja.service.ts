import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  private apiUrl = 'URL_DA_API_AQUI'; 

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    return this.http.get<any>('${this.apiUrl}/profile');
  }

  getPlatforms(): Observable<any> {
    return this.http.get<any>('${this.apiUrl}/platforms');
  }

  getGenres(): Observable<any> {
    return this.http.get<any>('${this.apiUrl}/genres');
  }

  getGamesList(): Observable<any> {
    return this.http.get<any>('${this.apiUrl}/gamesList');
  }

  getGameDetails(gameId: string): Observable<any> {
    return this.http.get<any>('${this.apiUrl}/gameDetails/${gameId}');
  }
}