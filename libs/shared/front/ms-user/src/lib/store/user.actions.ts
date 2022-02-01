import { createAction, props } from '@ngrx/store';
import {  UserUpdateDto } from '@mslibs/shared/front-back/user/dtos';

export const loadCurrentUser = createAction('[User] Load Current User')
export const loadCurrentUserSuccess = createAction('[User] Load Current User Success',
  props<{ data: UserUpdateDto }>()
);
export const loadCurrentUserFailure = createAction('[User] Load Current User Failure',
  props<{ error: any }>()
);

//update
export const updateCurrentUser = createAction('[User] Update Current User',
  props<{ data: UserUpdateDto }>()
);
export const updateCurrentUserSuccess = createAction('[User] Update Current User Success',
  props<{ data: UserUpdateDto }>()
);
export const updateCurrentUserFailure = createAction('[User] Update Current User Failure',
  props<{ error: any }>()
);
