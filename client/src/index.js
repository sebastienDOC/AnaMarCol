import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './reducers';

import { getAllUsers } from './actions/users.actions';
import { getAllItems } from './actions/items.actions';

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

store.dispatch(getAllUsers())
store.dispatch(getAllItems())

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
