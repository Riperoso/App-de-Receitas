import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DetailPage from '../components/DetailPage';
import RecomendationsCard from '../components/RecomendationsCard';

function FoodPage({ match: { params: { id } } }) {
  const [api, saveApi] = useState({});
  const [recomendations, setRecomendations] = useState({});
  const [loading, setLoading] = useState(true);
  const MAX_RECOMENDATIONS = 6;

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const resolve = await response.json();
      saveApi(resolve.meals);
      setLoading(false);
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
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
        if (api[0][str] !== '' && api[0][str] !== null) {
          ingredientandMeasures.push(`${api[0][str]} - ${api[0][measure]}`);
        }
      }
    }
    return ingredientandMeasures;
  };
  if (loading) return <h1>loading</h1>;

  return (
    <>
      <DetailPage api={ api[0] } nameandMeasure={ nameandMeasures() } />
      <div>
        {recomendations.drinks && recomendations.drinks.map((recomendation, index) => (
          index < MAX_RECOMENDATIONS
        && (<RecomendationsCard
          key={ recomendation.strDrink }
          img={ recomendation.strDrinkThumb }
          title={ recomendation.strDrink }
          index={ index }
        />)
        ))}
        <button type="button">Iniciar Receita</button>
      </div>
    </>
  );
}

FoodPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FoodPage;
