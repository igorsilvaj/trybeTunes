import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import logo from '../assets/logoTrybetunes.png';
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
    <section
      data-testid="page-login"
      className="flex justify-center h-screen items-center
      sm:bg-red-500
      bg-loginNormal bg-no-repeat bg-cover bg-center"
    >
      <div
        className="
        flex flex-col items-center justify-center rounded-lg bg-white
        sm:h-72 sm:w-2/3 sm:gap-2
        md:h-450
        md:w-750
        "
      >
        {loading && <Loading />}
        <img
          className="sm:mb-5 md:mb-10"
          src={ logo }
          alt="logo trybetunes"
        />
        <input
          className="text-center text-[#003BE5]
          rounded-full px-3 py-2 border border-[#003BE5]
          placeholder:text-[#003BE5]
          focus:outline-[#003be5]
          md:w-96"
          type="text"
          data-testid="login-name-input"
          placeholder="qual é o seu nome?"
          onChange={ ({ target: { value } }) => setName(value) }
          value={ name }
        />
        <button
          className="
          w-56 rounded-full px-3 py-2 bg-[#003BE5] cursor-pointer
          text-center uppercase font-bold text-white
          disabled:bg-[#0039e560]
          md:w-96"
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
  );
}
