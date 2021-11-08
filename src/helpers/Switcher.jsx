import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import FoodPage from '../pages/FoodPage';

function Switcher() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ FoodPage } />
    </Switch>
  );
}

export default Switcher;
