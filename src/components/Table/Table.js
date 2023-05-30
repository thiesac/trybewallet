import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';
import { deleteExpense, editExpense } from '../../redux/actions';
import './Table.css';

class Table extends Component {
  onClickRemoveBtn = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

  onClickEditBtn = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Valor</th>
              <th>Descrição</th>
              <th>Moeda</th>
              <th>Método de pagamento</th>
              <th>Tag</th>
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
                  <td>{ Number(value).toFixed(2) }</td>
                  <td>{ description }</td>
                  <td>{ exchangeRates[currency].name }</td>
                  <td>{ method }</td>
                  <td>{ tag }</td>
                  <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
                  <td>
                    { (Number(exchangeRates[currency].ask) * Number(value)).toFixed(2) }
                  </td>
                  <td>Real</td>
                  <td className="table-buttons">
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => this.onClickRemoveBtn(id) }
                    >
                      <MdDeleteForever style={ { color: 'red', fontSize: '20px' } } />
                      Excluir
                    </button>
                    <button
                      data-testid="edit-btn"
                      type="button"
                      onClick={ () => this.onClickEditBtn(id) }
                    >
                      <MdModeEdit style={ { color: 'orange', fontSize: '20px' } } />
                      Editar
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
