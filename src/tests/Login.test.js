import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT_BTN = 'login-submit-btn';

const CORRECT_EMAIL = 'email@mail.com';
const CORRECT_PASSWORD = '1234567';
const INCORRECT_EMAIL_1 = 'email@mail';
const INCORRECT_EMAIL_2 = 'email.com';
const INCORRECT_PASSWORD = '123456';

describe('2 - Crie todos os elementos que devem respeitar'
  + 'os atributos descritos no protótipo para a tela de login', () => {
  it('Tem os data-testids email-input, password-input e login-submit-btn', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getAllByTestId(EMAIL_INPUT);
    const password = screen.getAllByTestId(PASSWORD_INPUT);
    const submitBtn = screen.getAllByTestId(LOGIN_SUBMIT_BTN);

    expect(emailInput).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });
});

describe('3 - Desenvolva a tela de maneira que a pessoa deve'
 + ' conseguir escrever seu email no input de email', () => {
  it('É possível escrever o email', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getAllByTestId(EMAIL_INPUT);
    userEvent.type(emailInput, CORRECT_EMAIL);

    expect(emailInput).toHaveValue(CORRECT_EMAIL);
  });
});

describe('4 - Desenvolva a tela de maneira que a pessoa'
+ 'deve conseguir escrever sua senha no input de senha', () => {
  it('É possível escrever a senha', () => {
    renderWithRouter(<App />);

    const password = screen.getAllByTestId(PASSWORD_INPUT);
    userEvent.type(password, CORRECT_PASSWORD);

    expect(password).toHaveValue(CORRECT_PASSWORD);
  });
});

describe('5 - Desenvolva a tela de maneira que o formulário'
+ 'só seja válido após um email válido e uma senha de mais'
+ ' de 6 caracteres serem preenchidos', () => {
  it('O botão deve estar desativado se o email for inválido', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getAllByTestId(EMAIL_INPUT);
    const password = screen.getAllByTestId(PASSWORD_INPUT);
    const submitBtn = screen.getAllByTestId(LOGIN_SUBMIT_BTN);

    expect(submitBtn).toBeDisable();

    userEvent.type(emailInput, INCORRECT_EMAIL_1);
    userEvent.type(password, CORRECT_PASSWORD);
    expect(submitBtn).toBeDisable();

    userEvent.type(emailInput, INCORRECT_EMAIL_2);
    expect(submitBtn).toBeDisable();
  });

  it('O botão deve estar desativado se a senha deve tiver 6 caracteres ou menos', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getAllByTestId(EMAIL_INPUT);
    const password = screen.getAllByTestId(PASSWORD_INPUT);
    const submitBtn = screen.getAllByTestId(LOGIN_SUBMIT_BTN);

    expect(submitBtn).toBeDisable();

    userEvent.type(emailInput, CORRECT_EMAIL);
    userEvent.type(password, INCORRECT_PASSWORD);
    expect(submitBtn).toBeDisable();

    expect(submitBtn).toBeDisable();
  });

  it('O botão deve estar ativado se o email e a senha forem válidos', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getAllByTestId(EMAIL_INPUT);
    const password = screen.getAllByTestId(PASSWORD_INPUT);
    const submitBtn = screen.getAllByTestId(LOGIN_SUBMIT_BTN);

    expect(submitBtn).toBeDisable();

    userEvent.type(emailInput, CORRECT_EMAIL);
    userEvent.type(password, CORRECT_PASSWORD);

    expect(submitBtn).not.toBeDisable();
  });
});

describe('6 - Salve 2 tokens no localStorage após a submissão, '
  + 'identificados pelas chaves mealsToken e cocktailsToken', () => {
  it('Após a submissão mealsToken e cocktailsToken devem estar '
  + 'salvos em localStorage', async () => {
    beforeEach(() => {
      localStorage.clear();
    });
    renderWithRouter(<App />);

    const emailInput = screen.getAllByTestId(EMAIL_INPUT);
    const password = screen.getAllByTestId(PASSWORD_INPUT);
    const submitBtn = screen.getAllByTestId(LOGIN_SUBMIT_BTN);

    await waitFor(
      () => {
        const mealsToken = localStorage.getItem('mealsToken');
        const cocktailsToken = localStorage.getItem('cocktailsToken');
        expect(mealsToken).toBe(null);
        expect(cocktailsToken).toBe(null);
      }, { timeout: 3000 },
    );

    userEvent.type(emailInput, CORRECT_EMAIL);
    userEvent.type(password, CORRECT_PASSWORD);

    userEvent.click(submitBtn);

    await waitFor(
      () => {
        const mealsToken = localStorage.getItem('mealsToken');
        const cocktailsToken = localStorage.getItem('cocktailsToken');
        expect(mealsToken).toBe('1');
        expect(cocktailsToken).toBe('1');
      }, { timeout: 3000 },
    );
  });
});

describe('7 - Salve o e-mail da pessoa usuária no localStorage na chave'
+ ' user após a submissão', () => {
  it('Após a submissão a chave user deve estar salva em localStorage', async () => {
    beforeEach(() => {
      localStorage.clear();
    });
    renderWithRouter(<App />);

    const emailInput = screen.getAllByTestId(EMAIL_INPUT);
    const password = screen.getAllByTestId(PASSWORD_INPUT);
    const submitBtn = screen.getAllByTestId(LOGIN_SUBMIT_BTN);

    expect(submitBtn).toBeDisable();

    await waitFor(
      () => {
        const user = localStorage.getItem('user');
        expect(user).toBe(null);
      }, { timeout: 3000 },
    );

    userEvent.type(emailInput, CORRECT_EMAIL);
    userEvent.type(password, CORRECT_PASSWORD);
    userEvent.click(submitBtn);

    await waitFor(
      () => {
        const user = localStorage.getItem('user');
        expect(user).toBe(CORRECT_EMAIL);
      }, { timeout: 3000 },
    );
  });
});

describe('8 - Redirecione a pessoa usuária para a tela principal '
+ 'de receitas de comidas após a submissão e validação com sucesso do login', () => {
  it('A rota muda para a tela principal de receitas de comidas', async () => {
    beforeEach(() => {
      localStorage.clear();
    });
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getAllByTestId(EMAIL_INPUT);
    const password = screen.getAllByTestId(PASSWORD_INPUT);
    const submitBtn = screen.getAllByTestId(LOGIN_SUBMIT_BTN);

    expect(submitBtn).toBeDisable();

    await waitFor(
      () => {
        const user = localStorage.getItem('user');
        expect(user).toBe(null);
      }, { timeout: 3000 },
    );

    userEvent.type(emailInput, CORRECT_EMAIL);
    userEvent.type(password, CORRECT_PASSWORD);
    userEvent.click(submitBtn);

    await waitFor(
      () => {
        const { locaction: { pathname } } = history;
        expect(pathname).toBe('/comidas');
      }, { timeout: 3000 },
    );
  });
});
