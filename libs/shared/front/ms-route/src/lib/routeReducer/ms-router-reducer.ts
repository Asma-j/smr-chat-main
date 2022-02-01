import {
    ActionReducer,
    MetaReducer,
    Action,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
  } from '@ngrx/store';
 // import { environment } from '';
  import * as fromRouter from '@ngrx/router-store';
import { InjectionToken } from '@angular/core';
import { RouterStateUrl } from './ms-router-serializer';
   
export interface MsRouterState {
  router: fromRouter.RouterReducerState<any>;
}
  /**
   * Our state is composed of a map of action reducer functions.
   * These reducer functions are called with each dispatched action
   * and the current or initial state and return a new immutable state.
   */
  export const ROOT_REDUCERS = new InjectionToken<
    ActionReducerMap<MsRouterState, Action>
  >('Root reducers token', {
    factory: () => ({
      router: fromRouter.routerReducer,
    }),
  });
  
export const selectRouter = createFeatureSelector<
MsRouterState,
  fromRouter.RouterReducerState<any>
>('router');
 
export const getCurrentUrl = createSelector(
  selectRouter, 
  (state: fromRouter.RouterReducerState) => state.state as unknown  as RouterStateUrl 
  //&& state.state.url
  );

// const {
//   selectQueryParams,    // select the current route query params
//   selectQueryParam,     // factory function to select a query param
//   selectRouteParams,    // select the current route params
//   selectRouteParam,     // factory function to select a route param
//   selectRouteData,      // select the current route data
//   selectUrl          // select the current url
// } = fromRouter.getSelectors(selectRouter);
  
//   /**
//    * Every reducer module's default export is the reducer function itself. In
//    * addition, each module should export a type or interface that describes
//    * the state of the reducer plus any selector functions. The `* as`
//    * notation packages up all of the exports into a single object.
//    */
//   import { InjectionToken } from '@angular/core';
  
//   /**
//    * As mentioned, we treat each reducer like a table in a database. This means
//    * our top level state interface is just a map of keys to inner state types.
//    */
//   export interface State {
//     router: fromRouter.RouterReducerState<any>;
//   }
  

  // console.log all actions
  export function logger(reducer: ActionReducer<MsRouterState>): ActionReducer<MsRouterState> {
    return (state, action) => {
      const result = reducer(state, action);
      // console.groupCollapsed(action.type);
      // console.log('prev state', state);
      // console.log('action', action);
      // console.log('next state', result);
      // console.groupEnd();
      return result;
    };
  }
    /**
   * By default, @ngrx/store uses combineReducers with the reducer map to compose
   * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
   * that will be composed to form the root meta-reducer.
   */
  export const metaReducers: MetaReducer<MsRouterState>[] = [logger];
    // !environment.production
    // ? [logger]
    // : [];


  