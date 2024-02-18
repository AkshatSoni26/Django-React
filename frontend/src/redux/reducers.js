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
        return { ...state, compile: action.payload, loading: !state.loading }      

    default:
      return state;

    }
};

export default rootReducer;
