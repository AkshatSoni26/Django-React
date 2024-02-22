import { reducerContants } from "./constant";

// Define initial state
const initialState = {
  code: "",
  loading: false,
  compile: '',
  is_editior: true,
  submissions: '',
  input:'',
  font_size: 18
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case reducerContants.FONT_SIZE:
      return { ...state, font_size: action.payload };

    case reducerContants.CODE:
      return { ...state, code: action.payload };

    case reducerContants.INPUT:
      return { ...state, input: action.payload };
    
    case reducerContants.LOADING:
        return { ...state, loading: !state.loading };
    
    case reducerContants.RUN_CODE:
        return { ...state, compile: action.payload, loading: !state.loading }
      
    case reducerContants.IS_EDITIOR:
      return { ...state, is_editior: !state.is_editior }

    case reducerContants.SUBMISSIONS:
      return { ...state, submissions: action.payload}

    default:
      return state;

    }
};

export default rootReducer;
