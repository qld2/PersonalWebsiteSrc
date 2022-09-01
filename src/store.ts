import { configureStore } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import createRootReducer from './reducer';
import appletReducer from './reducer/applet/appletSlice';
import menuBarReducer from './reducer/menuBar/menuBarSlice';
import blogReducer from './reducer/blog/blogSlice';

export const history = createBrowserHistory();

const store = configureStore({
  reducer: {
    router: connectRouter(history),
    applet: appletReducer,
    menuBar: menuBarReducer,
    blog: blogReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
