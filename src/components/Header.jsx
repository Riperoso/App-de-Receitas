import React, { useState } from 'react';
import P from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title = '', hasBtn = true }) {
  const [inputIsVisible, setInputIsVisible] = useState(false);

  const renderInput = () => (
    <input data-testid="search-input" type="text" />
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
