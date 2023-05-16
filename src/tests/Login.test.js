import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa o componente Login', () => {
  test('Testa se todos os componentes do Login são carregados corretamente', () => {
    renderWithRouterAndRedux(<App />);
    screen.getByRole('heading', { name: /login/i });
    screen.getByText(/email/i);
    screen.getByRole('textbox', { name: /email/i });
    screen.getByText(/senha/i);
    screen.getByLabelText(/senha/i);
    screen.getByRole('button', { name: /entrar/i });
  });

  test('Testa se o botão /entrar/ só é liberado quando os campos são preenchidos corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, 'email@email');
    userEvent.type(passwordInput, '123456');
    expect(button).toHaveAttribute('disabled');
  });
});
