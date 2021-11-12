import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import DrinkCard from '../components/DrinkCard';
import Filters from '../components/Filters';

const MAX_NUMBER = 11;

function DrinksPage() {
  const { state, fetchRecipes } = useContext(GlobalContext);
  const { isLoading, ingredientsList, filters } = state;
  const history = useHistory();

  useEffect(() => {
    fetchRecipes('thecocktaildb');
  }, [fetchRecipes]);

  const renderCards = (drinks) => (
    drinks.map((recipe, id) => (
      id <= MAX_NUMBER
        ? <DrinkCard key={ id } id={ id } drink={ recipe } />
        : null
    ))
  );

  const renderDrink = (recipes) => {
    if (recipes.drinks !== null) {
      return recipes.drinks.length === 1
        ? history.push(`/bebidas/${recipes.drinks[0].idDrink}`)
        : renderCards(recipes.drinks);
    }
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  const renderDrinksAndFilters = (cocktail, filt) => (
    <>
      <Filters filters={ filt } param="drinks" />
      {renderDrink(cocktail)}
    </>
  );

  return (
    <div>
      <Header title="Bebidas" />
      <SearchBar />
      {
        !isLoading && renderDrinksAndFilters(ingredientsList, filters)
      }
      <Footer />
    </div>
  );
}

export default DrinksPage;
