import React from 'react';
import P from 'prop-types';

const MAX_NUMBER = 4;

function Filters({ filters, param }) {
  const renderButtons = (categories) => (
    categories.map(({ strCategory }, id) => (
      id <= MAX_NUMBER
        ? (
          <button
            type="button"
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
          >
            {strCategory}
          </button>
        )
        : null
    ))
  );

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
