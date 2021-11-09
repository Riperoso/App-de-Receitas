import React, { useReducer, useEffect } from 'react';
import P from 'prop-types';
import GlobalContext from './GlobalContext';
import { reducer } from '../reducer/reducer';

const INITIAL_STATE = {
  search: '',
  option: '',
};

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { option, search } = state;

  useEffect(() => {
    (async () => {
      switch (option) {
      case 'ingredient': {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
        const json = await response.json();
        dispatch({
          type: 'SAVE_RETURN',
          payload: json,
        });
        break;
      }
      default:
        break;
      }
    })();
  }, [search, option]);

  return (
    <GlobalContext.Provider
      value={ { state, dispatch } }
    >
      { children }
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: P.node.isRequired,
};

export default GlobalProvider;
