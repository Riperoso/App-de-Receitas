import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

function FilterDrink() {
  const { categoryDrinks, setDrinks } = useContext(GlobalContext);
  const MAX_MAP = 5;

  const handleClick = async (category) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const json = await response.json();
    setDrinks(json);
  };

  return (
    <div>
      {categoryDrinks.drinks && categoryDrinks.drinks
        .map((category, index) => (index < MAX_MAP && (
          <button
            type="button"
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => handleClick(category.strCategory) }
          >
            {category.strCategory}
          </button>
        )))}
    </div>
  );
}

export default FilterDrink;
