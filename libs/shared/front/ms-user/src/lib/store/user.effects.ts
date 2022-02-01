import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as UserActions from './user.actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {

  loadCurrentUser$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(UserActions.loadCurrentUser),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.userService.getCurrentUser().pipe(
          map(res => {
            return UserActions.loadCurrentUserSuccess({ data: res })
          }
            ),
          catchError(error => of(UserActions.loadCurrentUserFailure({ error }))))
      )
    );
  });

  updateCurrentUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateCurrentUser),
      tap(() => {}),
      mergeMap((action) => this.userService.updateCurrentUser(action.data)
        .pipe(
          map(user => {
            return (UserActions.updateCurrentUserSuccess({ data: user }))
          }),
          catchError(error => of(UserActions.updateCurrentUserFailure({ error }))
          ))
      )
    )
  });

  constructor(
    private actions$: Actions, 
    private userService : UserService
    ) {}

}
