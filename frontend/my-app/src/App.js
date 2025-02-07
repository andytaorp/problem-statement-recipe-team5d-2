import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecipesContextProvider } from './context/RecipesContext';
import { AuthContextProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeForm from './components/RecipeForm';
import RecipeDetails from './components/RecipeDetails';

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <RecipesContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<RecipeForm />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
          </Routes>
        </RecipesContextProvider>
      </AuthContextProvider>
    </Router>
  );
};

export default App;