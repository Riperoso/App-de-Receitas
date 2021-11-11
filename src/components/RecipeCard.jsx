import React from 'react';
import P from 'prop-types';

function RecipeCard({ recipe, id }) {
  console.log('Log Do REcipeCArd', recipe);
  console.log('Log Do REcipeCArd', `${id}-recipe-card}`);
  return (
    <div data-testid={ `${id}-recipe-card` }>
      <img
        data-testid={ `${id}-card-img` }
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
      />
      <p data-testid={ `${id}-card-name` }>{ recipe.strMeal }</p>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: P.objectOf(P.any).isRequired,
  id: P.number.isRequired,
};

export default RecipeCard;
