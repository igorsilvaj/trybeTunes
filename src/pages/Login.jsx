import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import logo from '../assets/logo-trybetunes.png';
import { Loading } from '../components';
import { createUser } from '../services/userAPI';

export default function Login() {
  const [name, setName] = useState('');
  const [isBtnEnterDisabled, setIsBtnEnterDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const minimumNameLen = 3;
    if (name.length >= minimumNameLen) {
      return setIsBtnEnterDisabled(false);
    }
    return setIsBtnEnterDisabled(true);
  }, [name]);

  return (
    <main data-testid="page-login">
      <section>
        <div>
          {loading && <Loading />}
          <img src={ logo } alt="logo trybetunes" />
          <input
            type="text"
            data-testid="login-name-input"
            placeholder="qual é o seu nome?"
            onChange={ ({ target: { value } }) => setName(value) }
            value={ name }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ isBtnEnterDisabled }
            onClick={ async () => {
              setLoading(true);
              await createUser({ name });
              setLoading(false);
              history.push('/search');
            } }
          >
            Entrar
          </button>
        </div>
      </section>
    </main>
  );
}
