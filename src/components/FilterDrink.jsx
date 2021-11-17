import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

function FilterDrink() {
  const { categoryDrinks, filteredDrink } = useContext(GlobalContext);
  const MAX_MAP = 5;
  return (
    <div>
      {categoryDrinks.drinks && categoryDrinks.drinks
        .map((category, index) => (index < MAX_MAP && (
          <button type="button" key={ index }>
            {category.strCategory}
          </button>
        )))}
    </div>
  );
}

export default FilterDrink;
