import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Switcher from './helpers/Switcher';

function App() {
  return (
    <BrowserRouter>
      <Switcher />
    </BrowserRouter>
  );
}

export default App;
