import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  sum = () => {
    const { expenses } = this.props;
    return expenses.reduce((previousValue, { currency, exchangeRates, value }) => {
      const convertedValue = value * exchangeRates[currency].ask;
      return previousValue + convertedValue;
    }, 0);
  };

  render() {
    const { email } = this.props;
    return (
      <div className="header-container">
        <h1>
          Minhas Despesas
        </h1>
        <div>
          <p data-testid="email-field">{ email }</p>
        </div>
        <div>
          <h4>Gastos</h4>
          <p data-testid="total-field">{ this.sum().toFixed(2) }</p>
        </div>
        <div>
          <h4>Câmbio</h4>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
