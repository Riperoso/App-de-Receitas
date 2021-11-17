import React, { useEffect, useState } from 'react';
import P from 'prop-types';
import GlobalContext from './GlobalContext';

function GlobalProvider({ children }) {
  const [done, setDone] = useState(false);
  const [progress, setprogress] = useState(false);
  const [stateEmail, setStateEmail] = useState('guest');
  const [drinks, setDrinks] = useState([]);
  const [categoryMeals, setCategoryMeals] = useState([]);
  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const [meals, setMeals] = useState([]);
  const [filtredDrinks, setFiltredDrinks] = useState([]);
  const [filtredMeals, setFiltredMeals] = useState([]);
  const [showBar, setShowBar] = useState(false);

  const fetchRecipes = async (param) => {
    const response = await fetch(`https://www.${param}.com/api/json/v1/1/search.php?s=`);
    const resFilters = await fetch(`https://www.${param}.com/api/json/v1/1/list.php?c=list`);
    const json = await response.json();
    const jsonFilters = await resFilters.json();
    if (param === 'themealdb') {
      setMeals(json);
      setCategoryMeals(jsonFilters);
      setFiltredMeals(json);
    }
    if (param === 'thecocktaildb') {
      setDrinks(json);
      setCategoryDrinks(jsonFilters);
      setFiltredDrinks(json);
    }
  };

  const getLocal = (id, type) => {
    const doneLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    const findDone = doneLocal.find((recipeId) => recipeId[id] === id);
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
    if (stateEmail === undefined || stateEmail.length === 0 || stateEmail === null) {
      localStorage.setItem('user', JSON.stringify({ email: 'guest@email.com' }));
    } else {
      localStorage.setItem('user', JSON.stringify({ email: stateEmail }));
    }
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {},
      meals: {} }));
  },
  []);

  return (
    <GlobalContext.Provider
      value={ {
        meals,
        drinks,
        categoryDrinks,
        categoryMeals,
        fetchRecipes,
        getLocal,
        done,
        progress,
        nameandMeasures,
        stateEmail,
        setStateEmail,
        setFiltredDrinks,
        setFiltredMeals,
        filtredDrinks,
        filtredMeals,
        setDrinks,
        setMeals,
        showBar,
        setShowBar } }
    >
      { children }
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: P.node.isRequired,
};

export default GlobalProvider;
