import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import GlobalContext from '../context/GlobalContext';

function FoodsPage() {
  const { state } = useContext(GlobalContext);
  const history = useHistory();

  const renderFood = () => {
    if (state.isLoading === true) return <p>loading</p>;
    return state.ingredientsList.meals.length === 1
      ? history.push(`/comidas/${state.ingredientsList.meals[0].idMeal}`)
      : null;
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
