import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecomendationsCard from './RecomendationsCard';

function DetailPage({ api, nameandMeasure, recomendations }) {
  const MAX_RECOMENDATIONS = 6;
  return (
    <>
      <img data-testid="recipe-photo" src={ api.strMealThumb } alt={ api.Meal } />
      <h2 data-testid="recipe-title">{api.strMeal}</h2>
      <button type="button" data-testid="share-btn">
        <img src={ shareIcon } alt="botão de compartilhar" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="botão de favoritar" />
      </button>
      <h4 data-testid="recipe-category">{api.strCategory}</h4>
      <ul>
        {nameandMeasure().map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ ingredient }
          >
            {ingredient}
          </li>))}
      </ul>
      <p data-testid="instructions">{api.strInstructions}</p>
      <div className="video-responsive">
        <iframe
          data-testid="video"
          width="853"
          height="480"
          src={ `https://www.youtube.com/embed/${api.strYoutube.split('=')[1]}` }
          frameBorder="0"
          allow={ `accelerometer; autoplay; clipboard-write;
            encrypted-media; gyroscope; picture-in-picture` }
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
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
      </div>
    </>
  );
}

DetailPage.propTypes = {
  api: PropTypes.objectOf(PropTypes.string).isRequired,
  nameandMeasure: PropTypes.objectOf(PropTypes.string).isRequired,
  recomendations: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DetailPage;
