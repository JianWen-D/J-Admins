const initialState = {
  loading: false,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.value,
      };

    default:
      return state;
  }
};

export default reducer;
