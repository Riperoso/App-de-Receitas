import React, { useReducer, useEffect, useState } from 'react';
import P from 'prop-types';
import GlobalContext from './GlobalContext';
import { reducer, SAVE_RETURN } from '../reducer/reducer';

const INITIAL_STATE = {
  search: '',
  option: '',
  inputIsVisible: false,
  pathName: '',
  ingredientsList: [],
  isLoading: true,
  filters: [],
};

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { option, search, pathName } = state;
  const [done, setDone] = useState(false);
  const [progress, setprogress] = useState(false);
  const [stateEmail, setStateEmail] = useState('guest');

  const fetchRecipes = async (param) => {
    const response = await fetch(`https://www.${param}.com/api/json/v1/1/search.php?s=`);
    const resFilters = await fetch(`https://www.${param}.com/api/json/v1/1/list.php?c=list`);
    const json = await response.json();
    const jsonFilters = await resFilters.json();
    dispatch({
      type: SAVE_RETURN,
      payload: {
        json,
        isLoading: false,
        jsonFilters,
      },
    });
  };

  const getLocal = (id, type) => {
    const doneLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    const findDone = doneLocal.find((recipeId) => recipeId.id === id);
    const doneProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const findinProgress = doneProgress[type][id];
    if (findDone !== undefined) setDone(true);
    if (findinProgress !== undefined) setprogress(true);
  };

  const nameandMeasures = (api) => {
    const ingredientandMeasures = [];
    const NUMBER_TWEENTY = 20;
    if (api !== undefined) {
      for (let index = 1; index < NUMBER_TWEENTY; index += 1) {
        const str = `strIngredient${index}`;
        const measure = `strMeasure${index}`;
        if (api[0][str] !== undefined && api[0][str] !== null) {
          ingredientandMeasures.push(`${api[0][str]} - ${api[0][measure]}`);
        }
      }
    }
    return ingredientandMeasures;
  };

  useEffect(() => {
    (async () => {
      switch (option) {
      case 'ingredient': {
        const response = await fetch(`https://www.${pathName}.com/api/json/v1/1/filter.php?i=${search}`);
        const json = await response.json();
        console.log(json);
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
      value={ {
        state,
        dispatch,
        fetchRecipes,
        getLocal,
        done,
        progress,
        nameandMeasures,
        stateEmail,
        setStateEmail } }
    >
      { children }
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: P.node.isRequired,
};

export default GlobalProvider;
