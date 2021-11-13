import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DetailPage({ api, nameandMeasure }) {
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
        {nameandMeasure.map((ingredient) => <li>{ingredient}</li>)}
      </ul>
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
    </>
  );
}

export default DetailPage;
