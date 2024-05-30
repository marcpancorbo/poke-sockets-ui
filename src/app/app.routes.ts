import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemons',
    loadChildren: () =>
      import('./features/pokemons/pokemons.routes').then(m => m.pokemonRoutes),
  },
  {
    path: '',
    redirectTo: 'pokemons',
    pathMatch: 'full',
  },
];
