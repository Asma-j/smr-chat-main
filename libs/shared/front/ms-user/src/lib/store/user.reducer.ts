import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserUpdateDto } from '@mslibs/shared/front-back/user/dtos';

export const userFeatureKey = 'user';

export interface UserState {
  currentUser: UserUpdateDto
}

export const initialState: UserState = {
 currentUser : null
};

const userReducer = createReducer(
  initialState,

  //load
  on(UserActions.loadCurrentUser, state => state),
  on(UserActions.loadCurrentUserSuccess, (state, {data} ) =>  { 
    return {...state, currentUser: data };
  }),
  on(UserActions.loadCurrentUserFailure, (state, action) => state),
  //update
  on(UserActions.updateCurrentUser, state => state),
  on(UserActions.updateCurrentUserSuccess, (state, {data} ) =>  { 
    return { currentUser: data };
  }),

);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
