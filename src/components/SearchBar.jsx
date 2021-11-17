import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';

function SearchBar() {
  const { setMeals, setDrinks } = useContext(GlobalContext);
  const [search, setSearch] = useState('');
  const [option, setOption] = useState('');
  const history = useHistory();

  const { location: { pathname } } = history;

  const requestSwitch = async (path, opt, src) => {
    let pathName;
    let type;
    let id;
    if (path === '/comidas') {
      pathName = 'themealdb';
      type = 'meals';
      id = path === 'idMeal';
    } if (path === '/bebidas') {
      pathName = 'thecocktaildb';
      type = 'drinks';
      id = 'idDrink';
    }
    switch (opt) {
    case 'ingredient': {
      const response = await fetch(`https://www.${pathName}.com/api/json/v1/1/filter.php?i=${src}`);
      const json = await response.json();
      if (json[type].length === 1) { history.push(`${path}/${json[type][0][id]}`); }
      if (path === '/comidas') { setMeals(json); }
      if (path === '/bebidas') { setDrinks(json); }
      break;
    }
    case 'name': {
      const response = await fetch(`https://www.${pathName}.com/api/json/v1/1/search.php?s=${src}`);
      const json = await response.json();
      if (json[type].length === 1) { history.push(`${path}/${json[type][0][id]}`); }
      if (path === '/comidas') { setMeals(json); }
      if (path === '/bebidas') { setDrinks(json); }
      break;
    }
    case 'initialLetter': {
      if (src.length > 1) global.alert('Sua busca deve conter somente 1 (um) caracter');
      const response = await fetch(`https://www.${pathName}.com/api/json/v1/1/search.php?f=${src}`);
      const json = await response.json();
      if (json[type].length === 1) { history.push(`${path}/${json[type][0][id]}`); }
      if (path === '/comidas') { setMeals(json); }
      if (path === '/bebidas') { setDrinks(json); }
      break;
    }
    default:
      break;
    }
  };

  return (
    <form>
      <input
        data-testid="search-input"
        value={ search }
        type="text"
        onChange={ ({ target }) => setSearch(target.value) }
      />
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          name="options-search"
          type="radio"
          id="ingredient"
          value="ingredient"
          onChange={ ({ target }) => setOption(target.value) }
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          name="options-search"
          type="radio"
          id="name"
          value="name"
          onChange={ ({ target }) => setOption(target.value) }
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          data-testid="first-letter-search-radio"
          name="options-search"
          type="radio"
          id="first-letter"
          value="initialLetter"
          onChange={ ({ target }) => setOption(target.value) }
        />
        Letra Inicial
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => requestSwitch(pathname, option, search) }
      >
        Buscar
      </button>
    </form>);
}

export default SearchBar;
