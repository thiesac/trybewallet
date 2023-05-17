import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Testa o componente WalletForm', () => {
  test('Testa se os elementos de formulário do WalletFor são carregados corretamente', async () => {
    renderWithRouterAndRedux(<Wallet />);
    screen.getByText(/valor:/i);
    screen.getByRole('spinbutton', { name: /valor:/i });
  });

  test.only('Testa se, ao inserir um valor no forumulário, o Header mostra a soma corretamente', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputValue = screen.getByRole('spinbutton', { name: /valor:/i });
    const headerValue = screen.getByTestId('total-field');
    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    // const currencySelection = screen.getByRole('combobox', { name: /moeda/i });

    expect(inputValue).toBeInTheDocument();
    expect(headerValue).toBeInTheDocument();
    expect(addBtn).toBeInTheDocument();

    userEvent.type(inputValue, '10');
    act(() => userEvent.click(addBtn));
    expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument();
  });
});
