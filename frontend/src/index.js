import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RecipesContextProvider } from './context/RecipeContext';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>  {/* Wrap App with AuthProvider */}
      <RecipesContextProvider>
        <App />
      </RecipesContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
