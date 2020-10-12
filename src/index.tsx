import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

if (module && module.hot) {
  module.hot.accept('./App', () => {
    const NextRootContainer = require('./App').default;
    ReactDOM.render(<NextRootContainer />, document.getElementById('root'));
  });
}

ReactDOM.render(<App />, document.getElementById('root'));
