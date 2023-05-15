import React from 'react';
import {  screen } from '@testing-library/react';
import { renderWithRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa o componente Login', () => {
  test('Testa se todos os componentes do Login são carregados corretamente', () => {
    renderWithRedux(<App />);
    screen.getByRole('heading', { name: /login/ });
  });
});
