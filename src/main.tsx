import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import { WishProvider } from './context/WishContext';
import { SnackbarProvider } from './context/SnackbarContext';
import Dashboard from './pages/Dashboard/Dashboard';
import WishPage from './pages/WishPage/WishPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider>
      <WishProvider>
        <BrowserRouter
          basename={import.meta.env.PROD ? '/Demo-Wish-list' : '/'}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/wish/:id" element={<WishPage />} />
          </Routes>
        </BrowserRouter>
      </WishProvider>
    </SnackbarProvider>
  </StrictMode>
);
