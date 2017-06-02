import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import './styles/main.scss';

// ------------------------------------
// Store Initialization
// ------------------------------------
const store = createStore(window.__INITIAL_STATE__);

// ------------------------------------
// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('lemonadeStandContainer');

let render = () => {
  const App = require('./components/App').default;
  const routes = require('./routes/index').default(store);

  ReactDOM.render(<App store={store} routes={routes} />, MOUNT_NODE);
};

// ------------------------------------
// Load Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) {
    const renderApp = render;
    const renderError = error => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    render = () => {
      try {
        renderApp();
      } catch (e) {
        console.error(e);
        renderError(e);
      }
    };

    // Setup hot module replacement
    module.hot.accept(['./components/App', './routes/index'], () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      }));
  }
}

// Render the App
if (!__TEST__) render();
