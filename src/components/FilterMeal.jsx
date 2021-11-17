import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

function FilterMeal() {
  const { categoryMeals, setMeals } = useContext(GlobalContext);
  const MAX_MAP = 5;

  const handleClick = async (filterParam) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterParam}`,
    );
    const json = await response.json();
    setMeals(json);
  };

  return (
    <div>
      {categoryMeals.meals && categoryMeals.meals
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

export default FilterMeal;
