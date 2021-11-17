import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import DrinkCard from '../components/DrinkCard';
import Filters from '../components/Filters';
import RecipeCard from '../components/RecipeCard';

const MAX_NUMBER = 11;

function DrinksPage() {
  const { fetchRecipes, drinks } = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    fetchRecipes('thecocktaildb');
  }, []);

  return (
    <div>
      <Header title="Bebidas" />
      <SearchBar />
      {
        drinks.drinks && drinks.drinks.map((drink, index) => index < MAX_NUMBER && (
          <Link to={ `/bebidas/${drink.idDrink}` }>
            <RecipeCard
              key={ drink.idDrink }
              str={ drink.strDrink }
              src={ drink.strDrinkThumb }
              id={ index }
            />
          </Link>))
      }
      <Footer />
    </div>
  );
}

export default DrinksPage;
