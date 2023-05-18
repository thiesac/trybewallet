import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet/Wallet';

describe('Testa o componente WalletForm', () => {
  test('Testa se os elementos de formulário do WalletForm são carregados corretamente', async () => {
    renderWithRouterAndRedux(<Wallet />);
    screen.getByText(/valor:/i);
    screen.getByRole('spinbutton', { name: /valor:/i });
  });
});
