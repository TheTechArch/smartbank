import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@digdir/designsystemet-css/index.css';
import '@digdir/designsystemet-theme'; // or custom theme CSS file
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import store from './rtk/app/store';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
