import React from 'react';
import Header from '../components/Header';
import RecipesDoneCard from '../components/RecipesDoneCard';

function RecipesDone() {
  const getStorage = () => {
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    return storage;
  };

  return (
    <div>
      <Header title="Receitas Feitas" hasBtn={ false } />
      <div>
        <button data-testid="filter-by-food-btn" type="button">Food</button>
        <button data-testid="filter-by-drink-btn" type="button">Drink</button>
        <button data-testid="filter-by-all-btn" type="button">All</button>
      </div>
      {getStorage().map((rec, index) => (
        <RecipesDoneCard key={ index } index={ index } recipe={ rec } />
      ))}
    </div>
  );
}

export default RecipesDone;
