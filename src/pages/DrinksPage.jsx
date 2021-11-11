import React, { useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import DrinkCard from '../components/DrinkCard';

const MAX_NUMBER = 11;

function DrinksPage() {
  const { state, fetchRecipes } = useContext(GlobalContext);
  const { isLoading, ingredientsList } = state;
  // const history = useHistory();

  useEffect(() => {
    fetchRecipes('thecocktaildb');
  }, []);

  const renderCards = (drinks) => (
    drinks.map((recipe, id) => (
      id <= MAX_NUMBER
        ? <DrinkCard key={ id } id={ id } drink={ recipe } />
        : null
    ))
  );

  // const renderDrink = () => {
  //   if (state.isLoading === true) return <p>loading</p>;
  //   if (state.ingredientsList.drinks !== null) {
  //     return state.ingredientsList.drinks.length === 1
  //       ? history.push(`/bebidas/${state.ingredientsList.drinks[0].idDrink}`)
  //       : renderCards(state.ingredientsList.drinks);
  //   }
  //   return global
  //     .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  // };

  return (
    <div>
      <Header title="Bebidas" />
      <SearchBar />
      {
        !isLoading && renderCards(ingredientsList.drinks)
      }
      {/* {renderDrink()} */}
      <Footer />
    </div>
  );
}

export default DrinksPage;
