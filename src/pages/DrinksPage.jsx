import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import DrinkCard from '../components/DrinkCard';

const MAX_NUMBER = 11;

function DrinksPage() {
  const { state } = useContext(GlobalContext);
  const history = useHistory();

  const renderCards = (drinks) => (
    drinks.map((recipe, id) => (
      id <= MAX_NUMBER
        ? <DrinkCard key={ id } id={ id } drink={ recipe } />
        : null
    ))
  );

  const renderDrink = () => {
    if (state.isLoading === true) return <p>loading</p>;
    console.log(state.ingredientsList);
    return state.ingredientsList.drinks.length === 1
      ? history.push(`/bebidas/${state.ingredientsList.drinks[0].idDrink}`)
      : renderCards(state.ingredientsList.drinks);
  };

  return (
    <div>
      <Header title="Bebidas" />
      <SearchBar />
      {renderDrink()}
    </div>
  );
}

export default DrinksPage;
