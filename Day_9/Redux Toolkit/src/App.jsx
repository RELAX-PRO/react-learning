// =========================================================================
// File 3: src/App.jsx (Connecting the Vault to React OS)
// =========================================================================
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store'; // 👈 استدعاء الخزنة
import FramesInventoryView from './views/FramesInventoryView';

const App = () => {
  return (
    // 🏦 ربط الخزنة بكل شاشات التطبيق:
    <Provider store={store}>
      <FramesInventoryView />
    </Provider>
  );
};

export default App;