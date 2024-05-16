import IDActionTypes from "./action-types";

const initialState = {
    currentID: '',

};

const IDReducer = (state = initialState, action) => {
  switch (action.type) {
    case IDActionTypes.ATUALIZAR_ID:
      return {
        ...state,
        currentID: {
          ...state.currentID,
          ID: action.payload.ID,
        },
      };
   
    default:
      return state;
  }
};

  




export default IDReducer;