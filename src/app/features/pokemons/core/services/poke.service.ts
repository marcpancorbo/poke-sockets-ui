import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  constructor(private readonly http: HttpClient) {}

  getPokemons(limit: number = 151): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(
      `${environment.pokeApiBaseUrl}/pokemon?limit=${limit}`
    );
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(
      `${environment.pokeApiBaseUrl}/pokemon/${id}`
    );
  }
}
