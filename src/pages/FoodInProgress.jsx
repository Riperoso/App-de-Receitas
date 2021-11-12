import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../css/recipeProgress.css';

function FoodInProgress({ match: { params: { id } } }) {
  const [api, saveApi] = useState({});
  const [check, setCheck] = useState({
    ingredientName: '',
    checked: '',
  });

  const { checked, ingredientName } = check;

  const apiFor = () => {
    const ingredientsList = [];
    const NUMBER_TWEENTY = 20;
    if (api.meals !== undefined) {
      for (let index = 1; index < NUMBER_TWEENTY; index += 1) {
        const str = `strIngredient${index}`;
        ingredientsList.push(api.meals[0][str]);
      }
    }
    return ingredientsList;
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const resolve = await response.json();
      saveApi(resolve);
    })();
  }, [id]);

  const handleClick = ({ target }) => {
    setCheck({ ...check, ingredientName: target.name, checked: target.checked });
  };

  const foodProgress = () => (
    <div>
      <img
        src={ api.meals[0].strMealThumb }
        data-testid="recipe-photo"
        alt="recipe name"
      />
      <h2 data-testid="recipe-title">{api.meals[0].strMeal}</h2>
      <button type="button" data-testid="share-btn">
        <img src={ shareIcon } alt="botão de compartilhar" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="botão de favoritar" />
      </button>
      <h4 data-testid="recipe-category">{api.meals[0].strCategory}</h4>
      <div>
        { apiFor().map((ingredient, index) => (
          ingredient !== '' && ingredient !== null && (
            <label
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ ingredient }
              key={ `checkbox-${index}` }
              className={ checked && ingredientName === ingredient && 'recipeProgress' }
            >
              {ingredient}
              <input
                type="checkbox"
                id={ ingredient }
                name={ ingredient }
                onClick={ handleClick }
              />
            </label>)
        ))}
      </div>
      <p data-testid="instructions">
        <h2>Instructions</h2>
        {api.meals[0].strInstructions}
      </p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar receita</button>
    </div>
  );

  return (
    <div>
      { api.meals !== undefined ? foodProgress() : <h1>loading</h1> }
    </div>
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FoodInProgress;
