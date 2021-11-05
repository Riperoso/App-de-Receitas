import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('9 - Implemente os elementos do header na tela principal de receitas,'
  + 'respeitando os atributos descritos no protótipo', () => {
  it('Tem os data-testids profile-top-btn, page-title e search-top-btn', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    const profileTopBtn = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const searchTopBtn = screen.getByTestId('search-top-btn');

    expect(profileTopBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchTopBtn).toBeInTheDocument();
  });
});

describe('10 - Implemente um ícone para a tela de perfil,'
  + 'um título e um ícone para a busca, caso exista no protótipo (hasNoHeader)', () => {
  const hasNoHeader = () => {
    expect(screen.getByTestId('profile-top-btn')).not.toBeInTheDocument();
    expect(screen.getByTestId('page-title')).not.toBeInTheDocument();
    expect(screen.getByTestId('search-top-btn')).not.toBeInTheDocument();
  };

  it('Não tem header na tela de login', () => {
    renderWithRouter(<App />);
    hasNoHeader();
  });

  it('Não tem header na tela de detalhes de uma receita de comida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas/52771');
    hasNoHeader();
  });

  it('Não tem header na tela de detalhes de uma receita de bebida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas/178319');
    hasNoHeader();
  });

  it('Não tem header na tela de receita em processo de comida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas/52771/in-progress');
    hasNoHeader();
  });

  it('Não tem header na tela de receita em processo de bebida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas/178319/in-progress');
    hasNoHeader();
  });
});

describe('10 - Implemente um ícone para a tela de perfil,'
  + 'um título e um ícone para a busca, caso exista no protótipo (hasHeader)', () => {
  const hasHeader = (title, withSearchButton = true) => {
    const profileTopBtn = screen.getByTestId('profile-top-btn');
    expect(profileTopBtn).toHaveAttribute('src', 'profileIcon');
    expect(screen.getByTestId('page-title').textContent).toBe(title);

    if (withSearchButton) {
      const searchTopBtn = screen.getByTestId('search-top-btn');
      expect(searchTopBtn).toHaveAttribute('src', 'searchIcon');
    } else {
      expect(screen.getByTestId('search-top-btn')).not.toBeInTheDocument();
    }
  };

  it('Header tem os ícones corretos na tela de principal de receitas de comidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    hasHeader('Comidas');
  });

  it('Header tem os ícones corretos na tela de principal de receitas de bebidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');
    hasHeader('Bebidas');
  });

  it('O header tem os ícones corretos na tela de explorar', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar');
    hasHeader('Explorar', false);
  });

  it('O header tem os ícones corretos na tela de explorar comidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comidas');
    hasHeader('Explorar Comidas', false);
  });

  it('O header tem os ícones corretos na tela de explorar bebidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas');
    hasHeader('Explorar Bebidas', false);
  });

  it('Header tem os ícones corretos na tela de explorar comidas por ingrediente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comidas/ingredientes');
    hasHeader('Explorar Ingredientes', false);
  });

  it('Header tem os ícones corretos na tela de explorar bebidas por ingrediente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas/ingredientes');
    hasHeader('Explorar Ingredientes', false);
  });

  it('Header tem os ícones corretos na tela de explorar'
    + 'comidas por local de origem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comidas/area');
    hasHeader('Explorar Origem');
  });

  it('O header tem os ícones corretos na tela de perfil', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');
    hasHeader('Perfil', false);
  });

  it('O header tem os ícones corretos na tela de receitas feitas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/receitas-feitas');
    hasHeader('Receitas Feitas', false);
  });

  it('O header tem os ícones corretos na tela de receitas favoritas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/receitas-favoritas');
    hasHeader('Receitas Favoritas', false);
  });
});
