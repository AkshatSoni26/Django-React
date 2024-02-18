// Define initial state
const initialState = {
    key: 'akshat'
  };
  
  const rootReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'SOME_ACTION':
        return { ...state, someStateProperty: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  