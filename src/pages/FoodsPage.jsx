import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import GlobalContext from '../context/GlobalContext';
import RecipeCard from '../components/RecipeCard';
import Filters from '../components/Filters';

const MAX_NUMBER = 11;

function FoodsPage() {
  const { state, fetchRecipes } = useContext(GlobalContext);
  const { isLoading, ingredientsList, filters } = state;
  const history = useHistory();

  useEffect(() => {
    fetchRecipes('themealdb');
  }, []);

  const renderCards = (recipes) => (
    recipes.map((recipe, id) => (
      id <= MAX_NUMBER
        ? <RecipeCard key={ id } id={ id } recipe={ recipe } />
        : null
    ))
  );

  const renderFood = (recipes) => {
    if (recipes.meals !== null) {
      return recipes.meals.length === 1
        ? history.push(`/comidas/${recipes.meals[0].idMeal}`)
        : renderCards(recipes.meals);
    }
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  const renderFoodsAndFilters = (rec, filt) => (
    <>
      {renderFood(rec)}
      <Filters filters={ filt } param="meals" />
    </>
  );

  return (
    <>
      <Header title="Comidas" />
      <SearchBar />
      {
        !isLoading && renderFoodsAndFilters(ingredientsList, filters)
      }
      <Footer />
    </>
  );
}

export default FoodsPage;
