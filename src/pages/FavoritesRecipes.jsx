import React, { useEffect, useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';

function FavoritesRecipes() {
  const [shouldUpdate, setShouldUpdateFavorite] = useState(false);

  useEffect(() => {}, [shouldUpdate]);

  const getStorage = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return storage;
  };

  return (
    <div>
      <Header title="Receitas Favoritas" hasBtn={ false } />
      <div>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drink</button>
        <button type="button" data-testid="filter-by-all-btn">All</button>
      </div>
      { getStorage().map((favorite, index) => (
        <FavoriteCard
          setUpdate={ setShouldUpdateFavorite }
          key={ index }
          index={ index }
          favorite={ favorite }
        />
      ))}
    </div>
  );
}

export default FavoritesRecipes;
