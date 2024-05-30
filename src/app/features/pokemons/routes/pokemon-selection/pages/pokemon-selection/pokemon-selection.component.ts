import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { PokemonCardComponent } from '../../../../shared/components/pokemon-card/pokemon-card.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment.development';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import {
  from,
  tap,
  catchError,
  of,
  exhaustMap,
  take,
  Subject,
  Observable,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Pokemon } from '../../../../core/models/pokemon';

@Component({
  selector: 'app-pokemon-selection',
  standalone: true,
  imports: [PokemonCardComponent, FormsModule, JsonPipe],
  templateUrl: './pokemon-selection.component.html',
  styleUrl: './pokemon-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonSelectionComponent implements OnInit {
  connect$: Subject<void> = new Subject<void>();
  sendMessage$: Subject<void> = new Subject<void>();
  username: string = '';
  message: string = '';
  $messages: WritableSignal<string[]> = signal([]);
  $connected: WritableSignal<boolean> = signal(false);
  $selectedPokemon: WritableSignal<Pokemon | null> = signal(null);

  private connection: HubConnection;
  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl(`${environment.baseApiUrl}/hubs/chat`)
      .build();
    this.connection.on('NewMessage', message => this.newMessage(message));
    this.connection.on('NewUser', message => this.newUser(message));
  }

  ngOnInit(): void {
    this.subscribeToConnectAction();
    this.subscribeToSendMessageAction();
  }

  subscribeToConnectAction(): void {
    this.connect$
      .pipe(
        tap(() => this.$connected.set(true)),
        exhaustMap(() => this.joinGroup()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        console.log('Joined group!');
      });
  }
  subscribeToSendMessageAction(): void {
    this.sendMessage$
      .pipe(
        exhaustMap(() =>
          from(
            this.connection.invoke('SendMessage', {
              username: this.username,
              message: this.message,
              pokemonName: this.$selectedPokemon()?.name,
              groupName: 'group1',
            })
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        console.log('Message sent!');
      });
  }

  joinGroup(): Observable<void> {
    return from(this.connection.start()).pipe(
      tap(() => console.log('Connection started!')),
      catchError(err => of(console.error(err))),
      exhaustMap(() =>
        from(this.connection.invoke('JoinGroup', 'group1', this.username)).pipe(
          catchError(err => of(console.error(err)))
        )
      )
    );
  }

  newMessage(message: any) {
    this.$messages.update(messages => [...messages, message]);
  }

  newUser(user: any) {
    console.log(user);
  }
}
