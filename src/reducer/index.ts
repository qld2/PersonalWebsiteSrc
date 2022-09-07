import { combineReducers } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import appletReducer from './applet/appletSlice';
import menuBarReducer from './menuBar/menuBarSlice';
import blogReducer from './blog/blogSlice';

// const createRootReducer = (history: History) => combineReducers(
//   {
//     router: connectRouter(history),
//     applet: appletReducer,
//     menuBar: menuBarReducer,
//     blog: blogReducer,
//   },
// );

// export default createRootReducer;

const getReducer = (history: History) => ({
  router: connectRouter(history),
  applet: appletReducer,
  menuBar: menuBarReducer,
  blog: blogReducer,
});

export default getReducer;
