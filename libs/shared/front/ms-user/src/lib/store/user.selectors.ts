import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

//import { UserUpdateDto } from '@mslibs/shared/front-back/user/dtos';
export const selectUserState = createFeatureSelector<fromUser.UserState>(
  fromUser.userFeatureKey
);

export const selectCurrentUser = createSelector(
  selectUserState,
  (state: fromUser.UserState) => state.currentUser
);