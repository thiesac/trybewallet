import React, { Component } from 'react';

class WalletForm extends Component {
  render() {
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
            <select data-testid="currency-input">
              {/* <option></option> */}
            </select>
          </label>
        </div>
      </div>
    );
  }
}

export default WalletForm;
