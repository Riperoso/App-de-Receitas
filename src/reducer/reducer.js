export const SET_SEARCH = 'SET_SEARCH';
export const SET_INVISIBLE = 'SET_INVISIBLE';
export const SAVE_RETURN = 'SAVE_RETURN';
export const SET_LOADING = 'SET_LOADING';

export const reducer = (state, action) => {
  switch (action.type) {
  case SET_SEARCH:
    return {
      ...state,
      search: action.payload.search,
      option: action.payload.option,
      pathName: action.payload.pathname,
    };
  case SAVE_RETURN:
    return {
      ...state,
      ingredientsList: action.payload.json,
      isLoading: action.payload.isLoading,
    };
  case SET_INVISIBLE:
    return {
      ...state,
      inputIsVisible: action.payload,
    };
  case SET_LOADING:
    return {
      ...state,
      isLoading: action.payload,
    };
  default:
    return { ...state };
  }
};
