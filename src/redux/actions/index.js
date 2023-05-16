export const ADD_EMAIL = 'ADD_EMAIL';
export const RECEIVE_CURRENCY = 'RECEIVE_CURRENCY';
export const RECEIVE_UPDATED_RATE = 'RECEIVE_UPDATED_RATE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDITED_EXPENSE = 'SAVE_EDITED_EXPENSE';
const URL = 'https://economia.awesomeapi.com.br/json/all';

export const addEmail = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

const receiveCurrency = (currency) => ({
  type: RECEIVE_CURRENCY,
  payload: currency,
});

const receiveUpdatedRate = (exchangeRates) => ({
  type: RECEIVE_UPDATED_RATE,
  payload: exchangeRates,
});

export const deleteExpense = (exchangeRates) => ({
  type: DELETE_EXPENSE,
  payload: exchangeRates,
});

export const editExpense = (exchangeRates) => ({
  type: EDIT_EXPENSE,
  payload: exchangeRates,
});

export const saveEditedExpense = (exchangeRates) => ({
  type: SAVE_EDITED_EXPENSE,
  payload: exchangeRates,
});

export const actionFetchCurrency = () => async (dispatch) => {
  const response = await fetch(URL);
  const data = await response.json();
  const currency = Object.keys(data).filter((key) => key !== 'USDT');
  dispatch(receiveCurrency(currency));
};

export const actionFetchRate = (state) => async (dispatch) => {
  const response = await fetch(URL);
  const data = await response.json();
  dispatch(receiveUpdatedRate({
    ...state,
    exchangeRates: data,
  }));
};
