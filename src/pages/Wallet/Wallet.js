import React from 'react';
import Header from '../../components/Header/Header';
import WalletForm from '../../components/WalletForm/WalletForm';
import Table from '../../components/Table/Table';
import './Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet-outer-container">
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
