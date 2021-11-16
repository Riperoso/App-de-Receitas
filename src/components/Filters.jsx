import React, { useContext } from 'react';
import P from 'prop-types';
import GlobalContext from '../context/GlobalContext';
import { GET_FILTERED } from '../reducer/reducer';

const MAX_NUMBER = 4;

function Filters({ filters, param }) {
  const { state: { isLoading }, dispatch } = useContext(GlobalContext);

  const handleClick = async (category) => {
    const res = await fetch(`www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const json = await res.json();
    dispatch({
      type: GET_FILTERED,
      payload: {
        json,
      },
    });
  };

  const renderButtons = (categories) => (
    categories.map(({ strCategory }, id) => (
      id <= MAX_NUMBER
        && (
          <button
            type="button"
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => handleClick(strCategory) }
          >
            {strCategory}
          </button>
        )
    ))
  );
  console.log('filter', filters);
  console.log('isLoading', isLoading);
  return (
    <div>
      {
        renderButtons(filters[param])
      }
    </div>
  );
}

Filters.propTypes = {
  filters: P.arrayOf(P.any).isRequired,
  param: P.string.isRequired,
};

export default Filters;
