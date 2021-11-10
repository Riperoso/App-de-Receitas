import React from 'react';
import P from 'prop-types';

function DrinkCard({ drink, id }) {
  console.log(drink);
  console.log(`${id}-recipe-card}`);
  return (
    <div data-testid={ `${id}-recipe-card` }>
      <img
        data-testid={ `${id}-card-img` }
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
      />
      <p data-testid={ `${id}-card-name` }>{ drink.strDrink }</p>
    </div>
  );
}

DrinkCard.propTypes = {
  drink: P.objectOf(P.any).isRequired,
  id: P.number.isRequired,
};

export default DrinkCard;
