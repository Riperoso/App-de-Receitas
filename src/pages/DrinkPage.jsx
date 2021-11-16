import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DetailPageDrink from '../components/DetailPageDrink';
import RecomendationsCard from '../components/RecomendationsCard';

function DrinkPage({ match: { params: { id } } }) {
  const [api, saveApi] = useState({});
  const [recomendations, setRecomendations] = useState({});
  const [loading, setLoading] = useState(true);
  const MAX_RECOMENDATIONS = 6;

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const resolve = await response.json();
      console.log(resolve);
      saveApi(resolve.drinks);
      setLoading(false);
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const resolve = await response.json();
      setRecomendations(resolve);
      setLoading(false);
    })();
  }, []);

  const nameandMeasures = () => {
    const ingredientandMeasures = [];
    const NUMBER_TWEENTY = 20;
    if (api !== undefined) {
      for (let index = 1; index < NUMBER_TWEENTY; index += 1) {
        const str = `strIngredient${index}`;
        const measure = `strMeasure${index}`;
        if (api[0][str] !== undefined && api[0][str] !== null) {
          ingredientandMeasures.push(`${api[0][str]} - ${api[0][measure]}`);
        }
      }
    }
    return ingredientandMeasures;
  };
  if (loading) return <h1>loading</h1>;

  return (
    <>
      <DetailPageDrink api={ api[0] } nameandMeasure={ nameandMeasures() } />
      <div>
        {recomendations.meals && recomendations.meals.map((recomendation, index) => (
          index < MAX_RECOMENDATIONS
        && (<RecomendationsCard
          key={ recomendation.strMeal }
          img={ recomendation.strMealThumb }
          title={ recomendation.strMeal }
          index={ index }
        />)
        ))}
        <button type="button">Iniciar Receita</button>
      </div>
    </>
  );
}

DrinkPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DrinkPage;
