export const SET_SEARCH = 'SET_SEARCH';

export const reducer = (state, action) => {
  switch (action.type) {
  case SET_SEARCH:
    return {
      ...state,
      search: action.payload.search,
      option: action.payload.option,
    };
  case 'SAVE_RETURN':
    return {
      ...state,
      ingredientsList: action.payload,
    };
  default:
    return { ...state };
  }
};
