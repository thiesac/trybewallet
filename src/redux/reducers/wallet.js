// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  RECEIVE_CURRENCY, RECEIVE_UPDATED_RATE,
  DELETE_EXPENSE, EDIT_EXPENSE, SAVE_EDITED_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCY:
    return {
      ...state,
      currencies: action.payload,
    };
  case RECEIVE_UPDATED_RATE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case SAVE_EDITED_EXPENSE:
    return {
      ...state,
      editor: false,
      idToEdit: 0,
      expenses: state.expenses.map((expense) => {
        if (expense.id === state.idToEdit) {
          return { ...action.payload };
        } return expense;
      }),
    };
  default:
    return state;
  }
};

export default wallet;
