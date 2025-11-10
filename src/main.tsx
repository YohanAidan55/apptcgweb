import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './route/routes';
import { Provider } from 'react-redux';
import { store } from '@/Services/store'; // 👈 import de ton store Redux

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>      {/* 👈 Ajout du Provider ici */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);