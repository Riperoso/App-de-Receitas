import React, { useState } from 'react';
import P from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteCard({ index, favorite }) {
  const [shouldRenderMessage, setShouldRenderMEssage] = useState(false);
  const { type, area, category, alcoholicOrNot, name, image, id } = favorite;
  const horizontalTopText = type === 'comida' ? `${area} - ${category}` : alcoholicOrNot;

  const handleClick = async (group, idRef) => {
    const url = group === 'comida' ? `/comidas/${idRef}` : `/bebidas/${idRef}`;
    await clipboardCopy(`http://localhost:3000${url}`);
    setShouldRenderMEssage(true);
  };

  return (
    <div>
      <img
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>
        {horizontalTopText}
      </p>
      <h3 data-testid={ `${index}-horizontal-name` }>
        {name}
      </h3>
      <button
        type="button"
        onClick={ () => handleClick(type, id) }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="Share Icon"
        />
      </button>
      <button
        type="button"
      >
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          alt="Black Heart Icon"
        />
      </button>
      { shouldRenderMessage && 'Link copiado!' }
    </div>
  );
}

FavoriteCard.propTypes = {
  index: P.number.isRequired,
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
