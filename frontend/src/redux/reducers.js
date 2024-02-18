import { reducerContants } from "./constant";

// Define initial state
const initialState = {
  code: "",
  loading: false,
  compile: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case reducerContants.CODE:
      return { ...state, code: action.payload };
    case reducerContants.LOADING:
        return { ...state, loading: !state.loading };
    case reducerContants.RUN_CODE:

    // send the code to backend so it compile and return the response.
    

        return { ...state, compile: '', loading: !state.loading }      
    default:
      return state;
  }
};

export default rootReducer;
