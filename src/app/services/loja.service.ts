import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game'

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`);
  }


  updateProfile(userProfile: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profile`, userProfile);
  }

  getPlatforms(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/platforms`);
  }

  getGenres(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/genres`);
  }

  getGamesList(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/gamesList`);
  }

  getGameDetails(gameId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/gameDetails/${gameId}`);
  }


}
