import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../css/recipeProgress.css';

function DrinkInProgress({ match: { params: { id } } }) {
  const [api, saveApi] = useState({});
  const [check, setCheck] = useState({
    ingredientName: '',
    checked: '',
  });

  const { checked, ingredientName } = check;

  const apiFor = () => {
    const ingredientsList = [];
    const NUMBER_TWEENTY = 20;
    if (api.drinks !== undefined) {
      for (let index = 1; index < NUMBER_TWEENTY; index += 1) {
        const str = `strIngredient${index}`;
        ingredientsList.push(api.drinks[0][str]);
      }
    }
    return ingredientsList;
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const resolve = await response.json();
      saveApi(resolve);
    })();
  }, [id]);

  const handleClick = ({ target }) => {
    setCheck({ ...check, ingredientName: target.name, checked: target.checked });
  };

  const drinkProgress = () => (
    <div>
      <img
        src={ api.drinks[0].strDrinkThumb }
        data-testid="recipe-photo"
        alt="recipe name"
      />
      <h2 data-testid="recipe-title">{api.drinks[0].strDrink}</h2>
      <button type="button" data-testid="share-btn">
        <img src={ shareIcon } alt="botão de compartilhar" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="botão de favoritar" />
      </button>
      <h4 data-testid="recipe-category">{api.drinks[0].strCategory}</h4>
      { apiFor().map((ingredient, index) => (
        ingredient !== '' && ingredient !== null && ingredient !== undefined && (
          <label
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ `${index}-ingredient-step` }
            key={ index }
            className={ checked && ingredientName === ingredient && 'recipeProgress' }
          >
            {ingredient}
            <input
              type="checkbox"
              name={ ingredient }
              id={ `${index}-ingredient-step` }
              onClick={ handleClick }
            />
          </label>)
      ))}
      <h2>Instructions</h2>
      <p data-testid="instructions">
        {api.drinks[0].strInstructions}
      </p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar receita</button>
    </div>
  );

  return (
    <div>
      { api.drinks !== undefined ? drinkProgress() : <h1>loading</h1> }
    </div>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DrinkInProgress;
