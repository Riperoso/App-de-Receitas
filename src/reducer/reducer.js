export const SET_SEARCH = 'SET_SEARCH';
export const SET_INVISIBLE = 'SET_INVISIBLE';

export const reducer = (state, action) => {
  switch (action.type) {
  case SET_SEARCH:
    return {
      ...state,
      search: action.payload.search,
      option: action.payload.option,
      pathName: action.payload.pathname,
    };
  case 'SAVE_RETURN':
    return {
      ...state,
      ingredientsList: action.payload,
    };
  case SET_INVISIBLE:
    return {
      ...state,
      inputIsVisible: action.payload,
    };
  default:
    return { ...state };
  }
};
