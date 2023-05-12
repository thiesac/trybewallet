import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <h2>Wallet</h2>
        <Header />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
});

export default connect(mapStateToProps)(Wallet);
