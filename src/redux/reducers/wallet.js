// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const wallet = (state, action) => {
  switch (action.type) {
  case 'WALLET_INFO':
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default wallet;
