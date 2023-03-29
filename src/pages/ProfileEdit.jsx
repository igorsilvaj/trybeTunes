import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Loading } from '../components';
import { getUser, updateUser } from '../services/userAPI';

export default function ProfileEdit() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const userInfos = async () => {
      setLoading(true);
      setUser(await getUser());
      setLoading(false);
    };
    userInfos();
  }, []);

  useEffect(() => {
    if (Object.values(user).length > 0) {
      const { name, email, image, description } = user;
      const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      const testEmail = regex.test(email);
      const testLen = [name, image, description].every((e) => e.length > 0);
      if (testEmail && testLen) return setIsBtnDisabled(false);
      return setIsBtnDisabled(true);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div data-testid="page-profile">
      {loading && <Loading />}
      <Header />
      {Object.values(user).length > 0 && (
        <section>
          <form onSubmit={ handleSubmit } />
          <img src={ user.image } alt="" data-testid="profile-image" />
          <input
            data-testid="edit-input-image"
            name="userImg"
            type="text"
            value={ user.image }
            onChange={ ({ target: { value } }) => setUser({ ...user, image: value }) }
          />
          <h3>Nome</h3>
          <input
            data-testid="edit-input-name"
            name="userName"
            type="text"
            value={ user.name }
            onChange={ ({ target: { value } }) => setUser({ ...user, name: value }) }
          />
          <h3>E-mail</h3>
          <input
            data-testid="edit-input-email"
            name="userEmail"
            type="text"
            value={ user.email }
            onChange={ ({ target: { value } }) => setUser({ ...user, email: value }) }
          />
          <h3>Descrição</h3>
          <textarea
            data-testid="edit-input-description"
            name="userDescription"
            type="text"
            value={ user.description }
            onChange={
              ({ target: { value } }) => setUser({ ...user, description: value })
            }
          />
          <button
            data-testid="edit-button-save"
            type="submit"
            onClick={ () => {
              updateUser(user);
              history.push('/profile');
            } }
            disabled={ isBtnDisabled }
          >
            Salvar
          </button>
        </section>
      )}
    </div>
  );
}
