import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import GlobalContext from '../context/GlobalContext';
import RecipeCard from '../components/RecipeCard';

const MAX_NUMBER = 11;

function FoodsPage() {
  const { state } = useContext(GlobalContext);
  const history = useHistory();

  // useEffect(() => {
  //   (async () => {
  //     dispatch({
  //       type: 'SET_LOADING',
  //       payload: true,
  //     });
  //     const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  //     const json = await response.json();
  //     dispatch({
  //       type: 'SET_LOADING',
  //       payload: false,
  //     });
  //     setMeals({ ...json });
  //   })();
  // }, []);

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
      <Footer />
    </>
  );
}

export default FoodsPage;
