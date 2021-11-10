import React, { useContext } from 'react';
import P from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { SET_INVISIBLE } from '../reducer/reducer';
import GlobalContext from '../context/GlobalContext';

function Header({ title = '', hasBtn = true }) {
  const context = useContext(GlobalContext);

  const handleClick = () => {
    context.dispatch({
      type: SET_INVISIBLE,
      payload: !context.state.inputIsVisible,
    });
  };

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
            onClick={ () => handleClick() }
          >
            <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
          </button>
        )
      }
    </header>
  );
}

Header.propTypes = {
  title: P.string.isRequired,
  hasBtn: P.bool.isRequired,
};

export default Header;
