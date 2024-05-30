import { Routes } from '@angular/router';
import { PokemonSelectionComponent } from './routes/pokemon-selection/pages/pokemon-selection/pokemon-selection.component';

export const pokemonRoutes: Routes = [
  {
    path: '',
    component: PokemonSelectionComponent,
  },
];
