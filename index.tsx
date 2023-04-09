import ReactDOM from 'react-dom/client';
import './index.css';
import App from './src/App';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./notificationWorker.js')
    .then((registration) => {
      console.log('Notification service worker registered with scope: ', registration.scope);
    })
    .catch((error) => {
      console.error('Notification service worker registration failed: ', error);
    });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
