import React, { useReducer, useEffect } from 'react';
import P from 'prop-types';
import GlobalContext from './GlobalContext';
import { reducer } from '../reducer/reducer';

const INITIAL_STATE = {
  search: '',
  option: '',
  inputIsVisible: false,
  pathName: '',
};

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { option, search, pathName } = state;

  useEffect(() => {
    (async () => {
      switch (option) {
      case 'ingredient': {
        const response = await fetch(`https://www.${pathName}.com/api/json/v1/1/filter.php?i=${search}`);
        const json = await response.json();
        dispatch({
          type: 'SAVE_RETURN',
          payload: json,
        });
        break;
      }
      case 'name': {
        const response = await fetch(`https://www.${pathName}.com/api/json/v1/1/search.php?s=${search}`);
        const json = await response.json();
        dispatch({
          type: 'SAVE_RETURN',
          payload: json,
        });
        break;
      }
      case 'initialLetter': {
        const response = await fetch(`https://www.${pathName}.com/api/json/v1/1/search.php?f=${search}`);
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
