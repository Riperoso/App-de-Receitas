import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../css/recipeProgress.css';
import GlobalContext from '../context/GlobalContext';

if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
  localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {},
    meals: {} }));
}
if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
}

function FoodInProgress({ match: { params: { id } } }) {
  const { listIngredient, isFavorite,
    saveFavoriteMeal, setisFavorite } = useContext(GlobalContext);
  const [api, saveApi] = useState({});
  const [message, setMessage] = useState(false);
  const [check, setCheck] = useState({
    ingredientName: '',
    checked: '',
  });

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { checked, ingredientName } = check;

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const resolve = await response.json();
      saveApi(resolve);
      const findFav = favoriteRecipes !== null
      && favoriteRecipes.find((recipeId) => recipeId.id === resolve.meals[0].idMeal);
      if (findFav) { setisFavorite(true); }
    })();
  }, [id]);

  const handleClick = ({ target }) => {
    setCheck({ ingredientName: target.name, checked: target.checked });
    if (progressRecipes !== null && target.checked) {
      console.log(progressRecipes);
      const progressRecipe = { ...progressRecipes,
        meals:
         { ...progressRecipes.meals,
           [id]: [...progressRecipes.meals[id],
             target.name] } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipe));
    } else {
      const filtredProgress = progressRecipes.meals[id]
        .filter((progressRecipe) => progressRecipe !== target.name);
      localStorage.setItem('inProgressRecipes', JSON.stringify({ ...progressRecipes,
        meals:
         { ...progressRecipes.meals, [id]: filtredProgress } }));
    }
  };

  const foodProgress = () => (
    <div>
      <img
        src={ api.meals[0].strMealThumb }
        data-testid="recipe-photo"
        alt="recipe name"
      />
      <h2 data-testid="recipe-title">{api.meals[0].strMeal}</h2>
      <button
        type="button"
        data-testid="share-btn"
        // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
        // Gary Vernon Grubb
        onClick={ () => {
          window.navigator.clipboard.writeText(`http://localhost:3000${id}`);
          setMessage(true);
        } }
      >
        <img src={ shareIcon } alt="Compartilhar" />
        { message && <p>Link copiado!</p> }
      </button>
      <button
        type="button"
        onClick={ () => saveFavoriteMeal(api.meals[0]) }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="botão de favoritar"
        />
      </button>
      <h4 data-testid="recipe-category">{api.meals[0].strCategory}</h4>
      <div>
        { listIngredient(api, 'meals').map((ingredient, index) => (
          ingredient !== '' && ingredient !== null && (
            <label
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ ingredient }
              key={ `checkbox-${index}` }
              className={ checked && ingredientName === ingredient && 'recipeProgress' }
            >
              {ingredient}
              <input
                type="checkbox"
                id={ ingredient }
                name={ ingredient }
                onClick={ handleClick }
              />
            </label>)
        ))}
      </div>
      <p data-testid="instructions">
        <h2>Instructions</h2>
        {api.meals[0].strInstructions}
      </p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar receita</button>
    </div>
  );

  return (
    <div>
      { api.meals !== undefined ? foodProgress() : <h1>loading</h1> }
    </div>
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FoodInProgress;
