import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppController from './AppController';
import { Container } from '@cerebral/react';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Container controller={AppController}>
    <App />
  </Container>,
  document.getElementById('root')
);
registerServiceWorker();
