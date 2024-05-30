import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  WritableSignal,
  signal,
} from '@angular/core';
import { PokeService } from '../../../core/services/poke.service';
import { take } from 'rxjs';
import { JsonPipe, NgClass } from '@angular/common';
import { Pokemon } from '../../../core/models/pokemon';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [JsonPipe, NgClass],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent implements OnInit {
  @Output() onPokemonSelected: EventEmitter<Pokemon> =
    new EventEmitter<Pokemon>();
  $pokemon: WritableSignal<Pokemon | null> = signal(null);
  $selected: WritableSignal<boolean> = signal(false);
  constructor(private readonly pokemonService: PokeService) {}

  ngOnInit(): void {
    const randomPokemonId = Math.floor(Math.random() * 151) + 1;
    this.pokemonService
      .getPokemonById(randomPokemonId)
      .pipe(take(1))
      .subscribe(pokemon => {
        this.$pokemon.set(pokemon);
      });
  }

  selectPokemon(): void {
    if (!this.$pokemon()) return;
    this.$selected.set(true);
    this.onPokemonSelected.emit(this.$pokemon()!);
  }
}
