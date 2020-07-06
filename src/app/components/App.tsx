import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from '../store';
import { getCurrentScreenComponent } from '../selectors';

export function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <CurrentScreen />
      </Provider>
    </React.StrictMode>
  );
}

export function CurrentScreen() {
  const Screen = useSelector(getCurrentScreenComponent);

  return <Screen />;
}
