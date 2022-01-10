// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SEND_EMAIL } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  }
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEND_EMAIL:
      return {
        ...state,
        user: {
          email: action.payload,
        }
      }
    default:
      return state;
  }
};

export default user;
