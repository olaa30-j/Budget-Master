import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './global.css';
import { TransactionProvider } from './services/context/buget/transactionsContext';
import { CategoriesProvider } from './services/context/buget/categoriesContext';
import { DarkModeProvider } from './services/context/darkmodeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <TransactionProvider>
        <CategoriesProvider>
          <App />
        </CategoriesProvider>
      </TransactionProvider>
    </DarkModeProvider>
  </React.StrictMode>
);

