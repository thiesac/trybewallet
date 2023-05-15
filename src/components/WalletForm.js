import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchCurrency } from '../redux/actions';

class WalletForm extends Component {
  // state = {
  //   currencies: [],
  //   expenses: [],
  //   editor: false,
  //   idToEdit: 0,
  // };

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

  // handleClick = () => {
  //   const { dispatch } = this.props;
  //   const { currencies } = this.state;
  // };

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
              name="payment"
              onChange={ this.handleInput }
              defaultValue="cash"
            >
              <option value="cash">Dinheiro</option>
              <option value="credit">Cartão de crédito</option>
              <option value="debit">Cartão de débito</option>
            </select>
          </label>
          <label>
            Categoria
            <select
              data-testid="tag-input"
              name="category"
              onChange={ this.handleInput }
              defaultValue="alimentacao"
            >
              <option value="alimentacao">Alimentação</option>
              <option value="leisure">Lazer</option>
              <option value="work">Trabalho</option>
              <option value="transportation">Transporte</option>
              <option value="health">Saúde</option>
            </select>
          </label>
        </div>
        <button
          type="button"
          onClick={ this.handleClick }
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
