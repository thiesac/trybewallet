export const ADD_EMAIL = 'ADD_EMAIL';
export const RECEIVE_CURRENCY = 'RECEIVE_CURRENCY';
export const RECEIVE_UPDATED_RATE = 'RECEIVE_UPDATED_RATE';
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
