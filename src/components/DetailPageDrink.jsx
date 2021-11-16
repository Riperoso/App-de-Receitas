import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DetailPageDrink({ api, nameandMeasure }) {
  return (
    <>
      <img data-testid="recipe-photo" src={ api.strDrinkThumb } alt={ api.Drink } />
      <h2 data-testid="recipe-title">{api.strDrink}</h2>
      <button type="button" data-testid="share-btn">
        <img src={ shareIcon } alt="botão de compartilhar" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="botão de favoritar" />
      </button>
      <h4 data-testid="recipe-category">{api.strCategory}</h4>
      <ul>
        {nameandMeasure.map((ingredient) => <li key={ ingredient }>{ingredient}</li>)}
      </ul>
    </>
  );
}

DetailPageDrink.propTypes = {
  api: PropTypes.objectOf(PropTypes.string).isRequired,
  nameandMeasure: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DetailPageDrink;
