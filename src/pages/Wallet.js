import React from 'react';
// import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <h2>Wallet</h2>
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
