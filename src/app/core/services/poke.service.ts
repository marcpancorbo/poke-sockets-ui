import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  constructor(private readonly http: HttpClient) {}

  getPokemons(limit: number = 151) : Observable<any[]> {
    return this.http.get<any[]>(`${environment.pokeApiBaseUrl}/pokemon?limit=${limit}`)
  }
}
