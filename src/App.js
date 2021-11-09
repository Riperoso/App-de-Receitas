import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Switcher from './helpers/Switcher';
import GlobalProvider from './context/GlobalProvider';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Switcher />
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
