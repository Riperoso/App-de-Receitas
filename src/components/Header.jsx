import React from 'react';
import profileImg from '../images/profileIcon.svg';
import searchImg from '../images/searchIcon.svg';

function Header() {
  return (
    <header>
      <h1 data-testid="page-title">Title</h1>
      <button
        type="button"
        data-testid="profile-top-btn"
      >
        <img src={ profileImg } alt="Profile" />
      </button>
      <button
        type="button"
        data-testid="search-top-btn"
      >
        <img src={ searchImg } alt="Search" />
      </button>
    </header>
  );
}

export default Header;
