import { configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import getReducer from './reducer';

export const history = createBrowserHistory();

const store = configureStore({
  reducer: getReducer(history),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(
    routerMiddleware(history),
  ),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
