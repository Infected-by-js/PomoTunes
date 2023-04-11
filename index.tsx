import ReactDOM from 'react-dom/client';
import './index.css';
import App from './src/App';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./notifications-worker.js')
    .then((registration) => {
      console.log('Notification service worker registered with scope: ', registration.scope);
    })
    .catch((error) => {
      console.error('Notification service worker registration failed: ', error);
    });
} else {
  console.warn('It appears that your browser is not compatible with notifications.');
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
