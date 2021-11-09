import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function DrinksPage() {
  const { state } = useContext(GlobalContext);
  const history = useHistory();

  const renderDrink = () => {
    if (state.isLoading === true) return <p>loading</p>;
    console.log(state.ingredientsList);
    return state.ingredientsList.drinks.length === 1
      ? history.push(`/bebidas/${state.ingredientsList.drinks[0].idDrink}`)
      : null;
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
