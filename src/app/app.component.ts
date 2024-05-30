import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import {
  Subject,
  delay,
  exhaustMap,
  finalize,
  firstValueFrom,
  switchMap,
  tap,
} from 'rxjs';
import { PokeService } from './core/services/poke.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'poke-sockets-ui';
  $click: Subject<void> = new Subject<void>();
  $pokemons: WritableSignal<any[]> = signal([]);
  $loading: WritableSignal<boolean> = signal(false);
  destroyRef: DestroyRef = inject(DestroyRef);
  constructor(private readonly pokeService: PokeService) {}

   ngOnInit(): void {
    this.subscribeToClick();
  }
  subscribeToClick() {
    this.$click
      .pipe(
        tap(() => {
          this.$loading.set(true);
          this.$pokemons.set([]);
        }),
        exhaustMap(() =>
          this.pokeService
            .getPokemons()
            .pipe(finalize(() => this.$loading.set(false)))
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(pokemons => this.$pokemons.set(pokemons));
  }
}
