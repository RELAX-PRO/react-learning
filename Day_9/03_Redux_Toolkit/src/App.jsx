// =========================================================================
// File 3: src/App.jsx (Connecting the Vault to React OS)
// =========================================================================
/*
  =============================================================================
  BLOCK COMMENT: Redux Provider Setup
  =============================================================================
  In order for our React components to access the Redux store, we must wrap 
  our application tree with the `<Provider>` component from `react-redux`.
  We pass the master `store` (created in index.js) as a prop to this Provider, 
  which makes the Redux state accessible to any nested component via `useSelector`.
  =============================================================================
*/
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import FramesInventoryView from './views/FramesInventoryView';

const App = () => {
  return (
    // Inline Comment: Wraps the app in Redux Provider to make the store available everywhere
    <Provider store={store}>
      <FramesInventoryView />
    </Provider>
  );
};

export default App;