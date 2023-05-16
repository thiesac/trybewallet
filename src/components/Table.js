import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFetchRate } from '../redux/actions';

class Table extends Component {
  onClickRemoveBtn = (id) => {
    const { expenses } = this.props;
    const { dispatch } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    return dispatch(actionFetchRate(newExpenses));
  };

  // onClickEditBtn = () => {

  // }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map(({
                exchangeRates, currency, id, description, tag, method, value,
              }) => (
                <tr key={ `${description}${id}` }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ Number(value).toFixed(2) }</td>
                  <td>{ exchangeRates[currency].name }</td>
                  <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
                  <td>
                    { (Number(exchangeRates[currency].ask) * Number(value)).toFixed(2) }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => this.onClickRemoveBtn() }
                    >
                      Excluir
                    </button>
                    <button
                      data-testid="edit-btn"
                      type="button"
                      // onClick={ () => this.onClickEditBtn() }
                    >
                      Editar despesa
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
      description: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
      exchangeRates: PropTypes.objectOf(
        PropTypes.shape({
          name: PropTypes.string,
          ask: PropTypes.string,
        }),
      ),
    }),
  ),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
