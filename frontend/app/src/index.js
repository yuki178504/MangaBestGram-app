import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN || ''
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || ''
const audience = process.env.REACT_APP_AUTH0_AUDIENCE || ''
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    audience={audience}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
);
