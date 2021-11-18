import React, { useState } from 'react';
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
  const [filtredMealsByCategory, setFiltredMealsByCategory] = useState([]);
  const [filtredDrinksByCategory, setFiltredDrinksByCategory] = useState([]);
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
    setDone(false);
    setprogress(false);
    const doneLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (doneLocal !== null) {
      const findDone = doneLocal.find((recipeId) => recipeId.id === id);
      if (findDone) { setDone(true); }
    }
    if (doneProgress !== null) {
      const findinProgress = doneProgress !== null ? doneProgress[type][id] : null;
      if (findinProgress !== undefined) { setprogress(true); }
    }
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
        setShowBar,
        filtredMealsByCategory,
        setFiltredMealsByCategory,
        setFiltredDrinksByCategory,
        filtredDrinksByCategory } }
    >
      { children }
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: P.node.isRequired,
};

export default GlobalProvider;
