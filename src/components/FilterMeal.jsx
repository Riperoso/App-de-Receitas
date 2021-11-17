import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

function FilterMeal() {
  const { categoryMeals } = useContext(GlobalContext);
  const MAX_MAP = 5;
  return (
    <div>
      {categoryMeals.meals && categoryMeals.meals
        .map((category, index) => (index < MAX_MAP && (
          <button type="button" key={ index }>
            {category.strCategory}
          </button>
        )))}
    </div>
  );
}

export default FilterMeal;
