// =========================================================================
// File 3: src/App.jsx (Connecting the Vault to React OS)
// =========================================================================
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import FramesInventoryView from './views/FramesInventoryView';

const App = () => {
  return (
    <Provider store={store}>
      <FramesInventoryView />
    </Provider>
  );
};

export default App;