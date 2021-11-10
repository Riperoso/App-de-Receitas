import React, { useReducer, useEffect } from 'react';
import P from 'prop-types';
import GlobalContext from './GlobalContext';
import { reducer, SAVE_RETURN } from '../reducer/reducer';

const INITIAL_STATE = {
  search: '',
  option: '',
  inputIsVisible: false,
  pathName: '',
  ingredientsList: '',
  isLoading: true,
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
          type: SAVE_RETURN,
          payload: { json, isLoading: false },
        });
        break;
      }
      case 'name': {
        const response = await fetch(`https://www.${pathName}.com/api/json/v1/1/search.php?s=${search}`);
        const json = await response.json();
        dispatch({
          type: SAVE_RETURN,
          payload: { json, isLoading: false },
        });
        break;
      }
      case 'initialLetter': {
        const response = await fetch(`https://www.${pathName}.com/api/json/v1/1/search.php?f=${search}`);
        const json = await response.json();
        dispatch({
          type: SAVE_RETURN,
          payload: { json, isLoading: false },
        });
        break;
      }
      default:
        break;
      }
    })();
  }, [search, option, pathName]);

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
