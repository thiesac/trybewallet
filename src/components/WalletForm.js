import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchCurrency, actionFetchRate } from '../redux/actions';

const INITIAL_STATE = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'food',
};
class WalletForm extends Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchCurrency());
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  // clearSearch = () => {
  //   this.setState({
  //     value: '',
  //     description: '',
  //     currency: 'USD',
  //     method: 'Dinheiro',
  //     tag: 'food',
  //   });
  // };

  handleClick = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    // this.setState({
    //   value: '',
    //   description: '',
    // });
    this.setState((prevState) => ({
      ...INITIAL_STATE,
      id: prevState.id + 1,
    }));
    return dispatch(actionFetchRate(this.state));
    // this.clearSearch();
  };

  render() {
    const { currencies } = this.props;

    return (
      <div>
        <h3>WalletForm</h3>
        <form>
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
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ (e) => this.handleClick(e) }
          >
            Adicionar Despesa
          </button>
        </form>
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
