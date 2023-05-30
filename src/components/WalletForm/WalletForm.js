import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './WalletForm.css';
import { connect } from 'react-redux';
import {
  actionFetchCurrency,
  actionFetchRate, saveEditedExpense,
} from '../../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'food',
    editor: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchCurrency());
  }

  shouldComponentUpdate(prevProps) {
    const { editor, id } = this.state;
    if (editor !== prevProps.editor) {
      const { editedExpense } = this.props;
      this.setState({
        value: editedExpense.value,
        description: editedExpense.description,
        currency: editedExpense.currency,
        method: editedExpense.method,
        tag: editedExpense.tag,
        editor: prevProps.editor,
        exchangeRates: editedExpense.exchangeRates,
        id: editedExpense.id,
        oldId: id,
      });
      return false;
    }
    return true;
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { editor, id, value, description, currency,
      method, tag, exchangeRates, oldId } = this.state;
    if (!editor) {
      this.setState((prevState) => ({
        id: prevState.id + 1,
      }));

      const newExpenses = {
        id, value, description, currency, method, tag,
      };
      this.setState({
        value: '',
        description: '',
      });
      return dispatch(actionFetchRate(newExpenses));
    }
    const updatedExpenses = {
      id, value, description, currency, method, tag, exchangeRates,
    };
    this.setState({
      value: '',
      description: '',
      id: oldId,
    });
    dispatch(saveEditedExpense(updatedExpenses));
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency } = this.state;
    return (
      <div className="classForm-container">
        <form className="classForm-form">
          <label htmlFor="input-value">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              id="input-value"
              name="value"
              value={ value }
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
              value={ description }
              onChange={ this.handleInput }
            />
          </label>
          <label>
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleInput }
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
            Método de Pagamento:
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
            Categoria:
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

const mapStateToProps = ({ wallet: { currencies, editor, expenses, idToEdit } }) => ({
  currencies,
  editor,
  editedExpense: expenses
    .find(({ id }) => id === idToEdit),
});
export default connect(mapStateToProps)(WalletForm);
