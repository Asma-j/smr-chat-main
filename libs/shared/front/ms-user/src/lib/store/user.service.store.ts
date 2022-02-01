import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromUser from './user.reducer';
import * as UserActions from './user.actions';
import { UserUpdateDto } from '@mslibs/shared/front-back/user/dtos';
import { Observable } from 'rxjs';
import { selectCurrentUser } from './user.selectors';

@Injectable({ providedIn: 'root' })
export class UserStoreService {

  constructor(private userStore: Store<fromUser.UserState>) { }

  loadCurrentUser() {
    this.userStore.dispatch(UserActions.loadCurrentUser());
  }

  getCurrentUser(): Observable<UserUpdateDto> {
    return this.userStore.pipe(select(selectCurrentUser)) as Observable<UserUpdateDto>;
  }

  updateCurrentUser(user : UserUpdateDto){
    this.userStore.dispatch(UserActions.updateCurrentUser({ data: user }));
  }

//   selectAllCollections(): Observable<DynamicCollectionUpdateDto[]> {
//     return this.store.pipe(
//       select(selectorsDynamicCollection.selectAll),
//       map((val) => val.filter(item => item.id !== 'new'))
//     );
//   }

//   selectCollectionByName(name: string): Observable<DynamicCollectionUpdateDto> {
//     return this.store.pipe(select(selectorsDynamicCollection.selectCollectionByName(name))) as Observable<DynamicCollectionUpdateDto>;
//   }

}