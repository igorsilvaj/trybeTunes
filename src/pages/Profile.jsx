import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Loading } from '../components';
import { getUser } from '../services/userAPI';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const userInfos = async () => {
      setLoading(true);
      setUser(await getUser());
      setLoading(false);
    };
    userInfos();
  }, []);

  return (
    <div data-testid="page-profile">
      {loading && <Loading />}
      <Header />
      {Object.values(user).length > 0 && (
        <section>
          <img src={ user.image } alt="" data-testid="profile-image" />
          <h3>Nome</h3>
          <p>{user.name}</p>
          <h3>E-mail</h3>
          <p>{user.email}</p>
          <h3>Descrição</h3>
          <p>{user.description}</p>
          <Link to="/profile/edit">Editar perfil</Link>
        </section>
      )}
    </div>
  );
}
