export * from './lib/ms-route.module';
export {
    MsRouterState, 
    ROOT_REDUCERS, 
    selectRouter, 
    getCurrentUrl, 
    metaReducers 
  } from './lib/routeReducer/ms-router-reducer';
  
export { MsRouterSerializer } from './lib/routeReducer/ms-router-serializer';