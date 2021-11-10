import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import { SET_SEARCH } from '../reducer/reducer';

function SearchBar() {
  const [search, setSearch] = useState('');
  const [option, setOption] = useState('');
  const { state, dispatch } = useContext(GlobalContext);
  const history = useHistory();
  const { inputIsVisible } = state;

  const { location: { pathname } } = history;

  const handleClick = () => {
    if (option === 'initialLetter' && search.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const param = pathname === '/bebidas' ? 'thecocktaildb' : 'themealdb';
    dispatch({
      type: SET_SEARCH,
      payload: {
        search,
        option,
        pathname: param,
      },
    });
  };

  return (
    inputIsVisible && (
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
          onClick={ () => handleClick() }
        >
          Buscar
        </button>
      </form>)
  );
}

export default SearchBar;
