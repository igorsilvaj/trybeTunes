import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { Loading } from '.';
import logo from '../assets/logo-trybetunes.png';

export default function Header() {
  const firstUpdate = useRef(true);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (firstUpdate.current) {
      const getUserName = async () => {
        firstUpdate.current = false;
        setLoading(true);
        const result = await getUser();
        setName(result.name);
        setLoading(false);
      };
      getUserName();
    }
  }, []);

  return (
    <div data-testid="header-component">
      { loading && <Loading />}
      <section>
        <div>
          <img src={ logo } alt="logo trybetunes" />
        </div>
        <nav>
          <div>
            <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          </div>
          <div>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          </div>
          <div>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </div>
        </nav>
        <div>
          <p data-testid="header-user-name">
            {name}
          </p>
        </div>
      </section>
    </div>
  );
}
