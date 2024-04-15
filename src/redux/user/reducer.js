import UserActionTypes from "./action-types";

const initialState = {
    currentUser: '',

  };

const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case UserActionTypes.ATUALIZAR_EMAIL:
        return {
          ...state,
          currentUser: action.payload,
        };
      default:
        return state;
    }
  };

  




export default userReducer;