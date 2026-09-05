import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../models/character.model';
import { CharacterService } from '../../services/character.service';

const STORAGE_KEY = 'ram-elenco-eliminados';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent implements OnInit {

  private readonly characterService = inject(CharacterService);

  personajes: Character[] = [];
  cargando = true;
  mensajeError: string | null = null;

  /** IDs marcados como eliminados. Se persiste en localStorage. */
  eliminados: Set<number> = new Set();

  ngOnInit(): void {
    this.eliminados = this.cargarEliminadosGuardados();
    this.obtenerElenco();
  }

  obtenerElenco(): void {
    this.cargando = true;
    this.mensajeError = null;

    this.characterService.getElencoPrincipal().subscribe({
      next: (personajes) => {
        this.personajes = personajes;
        this.cargando = false;
      },
      error: (err) => {
        this.mensajeError = 'No se pudo cargar el elenco. Probá de nuevo en un rato.';
        this.cargando = false;
        console.error('Error HTTP:', err);
      }
    });
  }

  alternarEliminado(id: number): void {
    if (this.eliminados.has(id)) {
      this.eliminados.delete(id);
    } else {
      this.eliminados.add(id);
    }
    this.guardarEliminados();
  }

  estaEliminado(id: number): boolean {
    return this.eliminados.has(id);
  }

  get totalEliminados(): number {
    return this.eliminados.size;
  }

  claseDeEstado(status: string): string {
    const mapa: Record<string, string> = {
      Alive: 'estado-vivo',
      Dead: 'estado-muerto',
      unknown: 'estado-desconocido'
    };
    return mapa[status] ?? 'estado-desconocido';
  }

  private cargarEliminadosGuardados(): Set<number> {
    try {
      const crudo = localStorage.getItem(STORAGE_KEY);
      if (!crudo) return new Set();
      const arr: number[] = JSON.parse(crudo);
      return new Set(arr);
    } catch {
      return new Set();
    }
  }

  private guardarEliminados(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...this.eliminados]));
    } catch {
      // localStorage no disponible; no es crítico para la demo.
    }
  }
}
