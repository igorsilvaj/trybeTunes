import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import MusicContextProvider from './context/MusicContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MusicContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MusicContextProvider>
  </React.StrictMode>,
);
