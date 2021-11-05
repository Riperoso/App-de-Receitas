import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, saveEmail] = useState('');
  const [password, savePassword] = useState('');
  const [disable, setDisable] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const MIN_LENGTH = 7;
    const docLogin = document.getElementById('login');
    setDisable(!docLogin.checkValidity() || password.length < MIN_LENGTH);
  }, [email, password]);

  const handleclick = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', email);
    history.push('/comidas');
  };

  return (
    <form id="login">
      <label htmlFor="emailInput">
        Email:
        <input
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          onChange={ ({ target }) => saveEmail(target.value) }
          data-testid="email-input"
          type="email"
          id="emailInput"
          required
        />
      </label>
      <label htmlFor="passwordInput">
        Password:
        <input
          minLength={ 7 }
          onChange={ ({ target }) => savePassword(target.value) }
          data-testid="password-input"
          type="password"
          id="passwordInput"
          required
        />
      </label>
      <button
        disabled={ disable }
        type="button"
        data-testid="login-submit-btn"
        id="submitBtn"
        onClick={ handleclick }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
