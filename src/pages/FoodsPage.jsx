import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import GlobalContext from '../context/GlobalContext';
import RecipeCard from '../components/RecipeCard';
import Filters from '../components/Filters';

const MAX_NUMBER = 11;

function FoodsPage() {
  const { fetchRecipes, stateEmail, meals } = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    fetchRecipes('themealdb');
    localStorage.setItem('user', JSON.stringify({ email: stateEmail }));
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {},
      meals: {} }));
  }, []);

  return (
    <>
      <Header title="Comidas" />
      <SearchBar />
      {
        meals.meals && meals.meals.map((meal, index) => index < MAX_NUMBER && (
          <Link to={ `/comidas/${meal.idMeal}` }>
            <RecipeCard
              key={ meal.idMeal }
              str={ meal.strMeal }
              src={ meal.strMealThumb }
              id={ index }
            />
          </Link>))
      }
      <Footer />
    </>
  );
}

export default FoodsPage;
