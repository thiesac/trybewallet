import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchCurrency } from '../redux/actions';

class WalletForm extends Component {
  state = {
    currencies: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { currencies } = this.state;
    dispatch(actionFetchCurrency(currencies));
  }

  render() {
    const { currencies } = this.state;
    console.log(currencies);
    return (
      <div>
        <h3>WalletForm</h3>
        <div>
          <label htmlFor="input-value">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              id="input-value"
            />
          </label>
          <label htmlFor="input-description">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              id="input-description"
            />
          </label>
          <label>
            Moeda
            <select data-testid="currency-input">
              {
                currencies.map((currency) => (
                  <option
                    key={ currency }
                  >
                    { currency }
                  </option>
                ))
              }
            </select>
          </label>
          <label>
            Método de Pagamento
            <select>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label>
            Categoria
            <select data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func,
}.isRequired;

export default connect(null)(WalletForm);
