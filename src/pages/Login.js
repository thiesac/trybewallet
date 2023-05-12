import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isSaveButtonDisabled: true,
  };

  handleInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
    this.validationFields();
  };

  validationFields = () => {
    this.setState((
      {
        email,
        password,
      },
    ) => {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const isValidEmail = emailRegex.test(email);
      const minLength = 6;
      const isValidPassword = password.length >= minLength;
      if (isValidEmail && isValidPassword) {
        return {
          isSaveButtonDisabled: false,
        };
      }
      return {
        isSaveButtonDisabled: true,
      };
    });

    // this.setState({
    //   isSaveButtonDisabled:
    //     !(
    //       isValidEmail && isValidPassword
    //     ),
    // });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { dispatch, history: { push } } = this.props;
    const { email } = this.state;
    dispatch(addEmail(email));
    push('/carteira');
  };

  render() {
    const { email, password, isSaveButtonDisabled } = this.state;

    return (
      <div>
        <h2>Login</h2>
        <label htmlFor="input-email">
          Email
          <input
            data-testid="email-input"
            type="email"
            id="input-email"
            name="email"
            value={ email }
            onChange={ this.handleInput }
          />
        </label>
        <label htmlFor="input-password">
          Senha
          <input
            data-testid="password-input"
            type="password"
            id="input-password"
            name="password"
            value={ password }
            onChange={ this.handleInput }
          />
        </label>
        <button
          type="button"
          onClick={ (e) => this.handleClick(e) }
          disabled={ isSaveButtonDisabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect(null)(Login);
