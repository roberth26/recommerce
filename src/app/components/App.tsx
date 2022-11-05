import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from '../store';
import { getCurrentPageComponent } from '../selectors';

export function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <CurrentPage />
      </Provider>
    </React.StrictMode>
  );
}

export function CurrentPage() {
  const Page = useSelector(getCurrentPageComponent);

  return <Page />;
}
