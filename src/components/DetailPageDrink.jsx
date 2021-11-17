import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecomendationsCard from './RecomendationsCard';

function DetailPageDrink({ api, nameandMeasure, recomendations, url }) {
  const MAX_RECOMENDATIONS = 6;
  console.log(api);
  return (
    <>
      <img data-testid="recipe-photo" src={ api.strDrinkThumb } alt={ api.Drink } />
      <h2 data-testid="recipe-title">{api.strDrink}</h2>
      <button
        type="button"
        data-testid="share-btn"
        // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
        // Gary Vernon Grubb
        onClick={ () => {
          window.navigator.clipboard.writeText(`http://localhost:3000${url}`);
          global.alert('Link Copiado');
        } }
      >
        <img src={ shareIcon } alt="Compartilhar" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="botão de favoritar" />
      </button>
      <h4 data-testid="recipe-category">{api.strCategory}</h4>
      <h4 data-testid="recipe-category">{api.strAlcoholic}</h4>
      <ul>
        {nameandMeasure()
          .map((ingredient) => <li key={ ingredient }>{ingredient}</li>)}
      </ul>
      <p data-testid="instructions">{api.strInstructions}</p>
      <div className="carousel-div">
        {recomendations.meals && recomendations.meals.map((recomendation, index) => (
          index < MAX_RECOMENDATIONS
        && (<RecomendationsCard
          key={ recomendation.strMeal }
          img={ recomendation.strMealThumb }
          title={ recomendation.strMeal }
          index={ index }
        />)
        ))}
      </div>
    </>
  );
}

DetailPageDrink.propTypes = {
  api: PropTypes.objectOf(PropTypes.string).isRequired,
  nameandMeasure: PropTypes.objectOf(PropTypes.string).isRequired,
  recomendations: PropTypes.objectOf(PropTypes.string).isRequired,
  url: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DetailPageDrink;
