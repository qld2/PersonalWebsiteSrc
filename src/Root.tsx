import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import Main from './components/Main';
import configureStore, { history } from './store';

export const store = configureStore(null);
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

function Root() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Main />
      </ConnectedRouter>
    </Provider>
  );
}

export default Root;
