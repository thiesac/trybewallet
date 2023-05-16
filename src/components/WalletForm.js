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
    dispatch(actionFetchCurrency());
  }

  handleInputEdit = () => {
    const { editor } = this.props;
    if (editor) {
      this.setState({
        value: 'teste',
        description: 'teste',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'food',
      });
    }
  };

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
    }));
    const { id, value, description, currency, method, tag } = this.state;
    const newExpenses = {
      id, value, description, currency, method, tag,
    };
    this.setState({
      value: '',
      description: '',
    });
    return dispatch(actionFetchRate(newExpenses));
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency } = this.state;
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
              value={ value }
              onChange={ editor ? this.handleInputEdit : this.handleInput }
            />
          </label>
          <label htmlFor="input-description">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              id="input-description"
              name="description"
              value={ description }
              onChange={ editor ? this.handleInputEdit : this.handleInput }
            />
          </label>
          <label>
            Moeda
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ editor ? this.handleInputEdit : this.handleInput }
            >
              {
                currencies.map((crr) => (
                  <option
                    key={ crr }
                    value={ crr }
                  >
                    { crr }
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
            {
              editor === true ? 'Editar despesa' : 'Adicionar Despesa'
            }
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  editor: PropTypes.bool,
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  editor: globalState.wallet.editor,
});

export default connect(mapStateToProps)(WalletForm);
