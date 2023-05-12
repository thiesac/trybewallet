import { ADD_EMAIL } from '../actions';
// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE_USER = {
  email: '', // string que armazena o email da pessoa usuária
};

const user = (state = INITIAL_STATE_USER, action) => {
  switch (action.type) {
  case ADD_EMAIL:
    return {
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
