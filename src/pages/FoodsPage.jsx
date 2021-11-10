import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import GlobalContext from '../context/GlobalContext';
import RecipeCard from '../components/RecipeCard';

const MAX_NUMBER = 11;

function FoodsPage() {
  const { state } = useContext(GlobalContext);
  const history = useHistory();

  const renderCards = (recipes) => (
    recipes.map((recipe, id) => (
      id <= MAX_NUMBER
        ? <RecipeCard key={ id } id={ id } recipe={ recipe } />
        : null
    ))
  );

  const renderFood = () => {
    if (state.isLoading === true) return <p>loading</p>;
    if (state.ingredientsList.meals !== null) {
      return state.ingredientsList.meals.length === 1
        ? history.push(`/comidas/${state.ingredientsList.meals[0].idMeal}`)
        : renderCards(state.ingredientsList.meals);
    }
    return global
      .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  return (
    <>
      <Header title="Comidas" />
      <SearchBar />
      {renderFood()}
    </>
  );
}

export default FoodsPage;
