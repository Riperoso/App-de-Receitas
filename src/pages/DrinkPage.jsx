import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import DetailPageDrink from '../components/DetailPageDrink';
import GlobalContext from '../context/GlobalContext';

function DrinkPage(props) {
  const { match: { params: { id } } } = props;
  const { match: { url } } = props;

  const history = useHistory();
  const { getLocal, done, progress } = useContext(GlobalContext);

  const [api, saveApi] = useState({});
  const [recomendations, setRecomendations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const resolve = await response.json();
      const responseRec = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const resolveRec = await responseRec.json();
      setRecomendations(resolveRec);
      saveApi(resolve.drinks);
      getLocal(id, 'cocktails');
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

  const saveLocal = () => {
    const doneProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const localProgress = { ...doneProgress,
      cocktails:
       { ...doneProgress.cocktails, [id]: nameandMeasures() } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(localProgress));
    history.push(`/bebidas/${id}/in-progress`);
  };

  if (loading) return <h1>loading</h1>;

  return (
    <>
      <DetailPageDrink
        api={ api[0] }
        nameandMeasure={ nameandMeasures }
        recomendations={ recomendations }
        url={ url }
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

DrinkPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DrinkPage;