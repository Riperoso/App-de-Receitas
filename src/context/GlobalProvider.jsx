import React from 'react';
import P from 'prop-types';
import GlobalContext from './GlobalContext';

function GlobalProvider({ children }) {
  return (
    <GlobalContext.Provider
      value={ { hi: 'alo' } }
    >
      { children }
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: P.node.isRequired,
};

export default GlobalProvider;
