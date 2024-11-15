import UserActionTypes from "./action-types";

const initialState = {
    currentUser: '',
    currentNome: '',
  };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.ATUALIZAR_EMAIL:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          email: action.payload.email,
        },
      };
    case UserActionTypes.ATUALIZAR_NOME:
      return {
        ...state,
        currentNome: {
          ...state.currentNome,
          nome: action.payload.nome,
        },
      };
    default:
      return state;
  }
};

  




export default userReducer;