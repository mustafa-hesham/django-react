import App from 'Component/App';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    const swUrl = 'service-worker.js';
    await navigator.serviceWorker.register(swUrl, { scope: '/' });
  });
}
