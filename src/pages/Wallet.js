import React from 'react';
// import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <h2>Wallet</h2>
        <WalletForm />
        <Header />
      </div>
    );
  }
}

export default Wallet;
