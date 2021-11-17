import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FilterMeal from '../components/FilterMeal';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import GlobalContext from '../context/GlobalContext';
import RecipeCard from '../components/RecipeCard';

const MAX_NUMBER = 12;

function FoodsPage() {
  const { fetchRecipes, stateEmail, meals, showBar } = useContext(GlobalContext);

  useEffect(() => {
    fetchRecipes('themealdb');
    if (stateEmail === undefined || stateEmail.length === 0 || stateEmail === null) {
      localStorage.setItem('user', JSON.stringify({ email: 'guest@email.com' }));
    } else {
      localStorage.setItem('user', JSON.stringify({ email: stateEmail }));
    }
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {},
      meals: {} }));
  }, []);

  return (
    <>
      <Header title="Comidas" />
      <FilterMeal />
      {showBar && <SearchBar />}
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
