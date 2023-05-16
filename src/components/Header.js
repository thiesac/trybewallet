import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      <div>
        <h2>Header</h2>
        <div>
          <p data-testid="email-field">{ email }</p>
        </div>
        <div>
          <h3>Gastos</h3>
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
