import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../models/character.model';

/**
 * A diferencia de traer la API página por página, este servicio pide
 * un elenco fijo de personajes por su ID (endpoint /character/[ids]).
 * Es útil cuando el catálogo que queremos mostrar es un grupo curado
 * en lugar de "todos los personajes existentes".
 */
@Injectable({ providedIn: 'root' })
export class CharacterService {

  private readonly http = inject(HttpClient);
  private readonly API_URL = 'https://rickandmortyapi.com/api/character';

  /** IDs del elenco principal que va a mostrar esta versión de la app. */
  static readonly ELENCO_PRINCIPAL: number[] = [
    1,   // Rick Sanchez
    2,   // Morty Smith
    3,   // Summer Smith
    4,   // Beth Smith
    5,   // Jerry Smith
    8,   // Abadango Cluster Princess
    12,  // Adjudicator Rick
    22,  // Beth Smith (Space Beth alt.)
    35,  // Toxic Rick
    41,  // Birdperson
    64,  // Mr. Poopybutthole
    118, // Squanchy
  ];

  getElencoPrincipal(): Observable<Character[]> {
    const ids = CharacterService.ELENCO_PRINCIPAL.join(',');
    return this.http.get<Character[]>(`${this.API_URL}/${ids}`);
  }
}
