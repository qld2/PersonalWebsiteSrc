import { combineReducers } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import appletReducer from './applet/appletSlice';
import menuBarReducer from './menuBar/menuBarSlice';

const createRootReducer = (history: History) => combineReducers(
  {
    router: connectRouter(history),
    applet: appletReducer,
    menuBar: menuBarReducer,
  },
);

export default createRootReducer;
