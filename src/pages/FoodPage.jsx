import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import DetailPage from '../components/DetailPage';

function FoodPage({ match: { params: { id } } }) {
  const history = useHistory();
  const [api, saveApi] = useState({});
  const [recomendations, setRecomendations] = useState({});
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [progress, setprogress] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const resolve = await response.json();
      getLocal();
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

  const saveLocal = () => {
    const doneProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const localProgress = { ...doneProgress,
      meals:
       { ...doneProgress.meals, [id]: nameandMeasures() } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(localProgress));
    history.push(`/comidas/${id}/in-progress`);
  };

  const getLocal = () => {
    const doneLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    const findDone = doneLocal.find((recipeId) => recipeId.id === id);
    const doneProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const findinProgress = doneProgress.meals[id];
    if (findDone !== undefined) setDone(true);
    if (findinProgress !== undefined) setprogress(true);
  };

  if (loading) return <h1>loading</h1>;

  return (
    <>
      <DetailPage
        api={ api[0] }
        nameandMeasure={ nameandMeasures() }
        recomendations={ recomendations }
      />
      <div>
        <button
          data-testid="start-recipe-btn"
          className={ done && 'removeButton' }
          onClick={ () => saveLocal() }
          type="button"
        >
          { progress ? 'Continuar receita' : 'Iniciar Receita' }
        </button>
      </div>
    </>
  );
}

FoodPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FoodPage;
