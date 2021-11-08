import React, { useState } from 'react';
import P from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title = '', hasBtn = true }) {
  const [inputIsVisible, setInputIsVisible] = useState(false);
  const [search, setSearch] = useState('');

  const renderInput = () => (
    <form data-testid="search-input">
      <input
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
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          name="options-search"
          type="radio"
          id="name"
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          data-testid="first-letter-search-radio"
          name="options-search"
          type="radio"
          id="first-letter"
        />
        Letra Inicial
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </form>
  );

  return (
    <header>
      <h1 data-testid="page-title">{ title }</h1>
      <Link to="/perfil">
        <button
          type="button"
        >
          <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
        </button>
      </Link>

      {
        hasBtn
        && (
          <button
            type="button"
            onClick={ () => setInputIsVisible((pState) => setInputIsVisible(!pState)) }
          >
            <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
          </button>
        )
      }
      { inputIsVisible && renderInput() }
    </header>
  );
}

Header.propTypes = {
  title: P.string.isRequired,
  hasBtn: P.bool.isRequired,
};

export default Header;
