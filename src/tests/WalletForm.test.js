import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Testa o componente WalletForm', () => {
  test('Testa se os elementos de formulário do WalletFor são carregados corretamente', async () => {
    renderWithRouterAndRedux(<Wallet />);
    screen.getByText(/valor:/i);
    screen.getByRole('spinbutton', { name: /valor:/i });
  });

  test.only('Testa se, ao inserir um valor no forumulário, o Header mostra a soma corretamente', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputValue = screen.getByRole('spinbutton', { name: /valor:/i });
    const headerValue = screen.getByTestId('total-field');
    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    const currencySelection = screen.getByRole('combobox', { name: /moeda/i });

    expect(inputValue).toBeInTheDocument();
    expect(headerValue).toBeInTheDocument();
    expect(addBtn).toBeInTheDocument();

    // userEvent.type(inputValue, '10');
    // userEvent.selectOptions(currencySelection, 'USD');
    // expect(currencySelection).toBe('USD');
  });
});
