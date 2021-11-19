import React from 'react';
import P from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteCard({ id, favorite }) {
  const { type, area, category, alcoholicOrNot, name, image } = favorite;
  const horizontalTopText = type === 'comida' ? `${area} - ${category}` : alcoholicOrNot;
  return (
    <div>
      <img
        src={ image }
        alt={ name }
        data-testid={ `${id}-horizontal-image` }
      />
      <p data-testid={ `${id}-horizontal-top-text` }>
        {horizontalTopText}
      </p>
      <h3 data-testid={ `${id}-horizontal-name` }>
        {name}
      </h3>
      <button
        type="button"
      >
        <img
          data-testid={ `${id}-horizontal-share-btn` }
          src={ shareIcon }
          alt="Share Icon"
        />
      </button>
      <button
        type="button"
      >
        <img
          data-testid={ `${id}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          alt="Black Heart Icon"
        />
      </button>
    </div>
  );
}

FavoriteCard.propTypes = {
  id: P.number.isRequired,
  favorite: P.objectOf(P.any).isRequired,
};

export default FavoriteCard;

// {
//   id: '52771',
//   type: 'comida',
//   area: 'Italian',
//   category: 'Vegetarian',
//   alcoholicOrNot: '',
//   name: 'Spicy Arrabiata Penne',
//   image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
// },
// {
//   id: '178319',
//   type: 'bebida',
//   area: '',
//   category: 'Cocktail',
//   alcoholicOrNot:  'Alcoholic',
//   name: 'Aquamarine',
//   image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
// },
