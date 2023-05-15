import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchCurrency, actionFetchRate } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'food',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { currencies } = this.props;
    dispatch(actionFetchCurrency(currencies));
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }));
    return dispatch(actionFetchRate(this.state));
  };

  render() {
    const { currencies } = this.props;

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
              name="value"
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="input-description">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              id="input-description"
              name="description"
              onChange={ this.handleInput }
            />
          </label>
          <label>
            Moeda
            <select
              data-testid="currency-input"
              name="currency"
              onChange={ this.handleInput }
            >
              {
                currencies.map((currency) => (
                  <option
                    key={ currency }
                    value={ currency }
                  >
                    { currency }
                  </option>
                ))
              }
            </select>
          </label>
          <label>
            Método de Pagamento
            <select
              data-testid="method-input"
              name="method"
              onChange={ this.handleInput }
              defaultValue="cash"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label>
            Categoria
            <select
              data-testid="tag-input"
              name="tag"
              onChange={ this.handleInput }
              defaultValue="alimentacao"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
        <button
          type="button"
          onClick={ (e) => this.handleClick(e) }
        >
          Adicionar Despesa
        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
