import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../components';
import { getUser, updateUser } from '../services/userAPI';
import defUserImg from '../assets/defProfile.png';

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
    <section
      className="flex bg-[#EFF3F9] h-screen
      sm:flex-col
      md:flex-row"
      data-testid="page-profile"
    >
      {loading && <div className="hidden" /> }
      <Header />
      {Object.values(user).length > 0 && (
        <section className="flex flex-col md:w-3/4">
          <div
            className="flex items-center
            bg-search bg-no-repeat bg-cover
            sm:h-36 sm:justify-center
            md:h-1/3 md:justify-start md:px-10"
          >
            <div
              className="rounded-full bg-center bg-cover bg-no-repeat
              shadow-lg shadow-[#4946468e]
              sm:w-32 sm:h-32
              md:w-56 md:h-56 md:translate-y-28"
              style={
                { backgroundImage: `url(${user.image ? user.image : defUserImg})` }
              }
              data-testid="profile-image"
            />
          </div>
          <div
            className="flex
            sm:justify-center
            md:justify-start md:pl-64"
          >
            <div className="flex flex-col items-start px-10">
              <form onSubmit={ handleSubmit } />
              <h3 className="mt-5 font-bold">Imagem</h3>
              <input
                className="mb-5"
                data-testid="edit-input-image"
                name="userImg"
                type="text"
                value={ user.image }
                onChange={ ({ target: { value } }) => setUser({ ...user, image: value }) }
              />
              <h3 className="font-bold">Nome</h3>
              <input
                className="mb-5"
                data-testid="edit-input-name"
                name="userName"
                type="text"
                value={ user.name }
                onChange={ ({ target: { value } }) => setUser({ ...user, name: value }) }
              />
              <h3 className="font-bold">E-mail</h3>
              <input
                className="mb-5"
                data-testid="edit-input-email"
                name="userEmail"
                type="text"
                value={ user.email }
                onChange={ ({ target: { value } }) => setUser({ ...user, email: value }) }
              />
              <h3 className="font-bold">Descrição</h3>
              <textarea
                className="mb-5"
                data-testid="edit-input-description"
                name="userDescription"
                type="text"
                value={ user.description }
                onChange={
                  ({ target: { value } }) => setUser({ ...user, description: value })
                }
              />
              <button
                className="text-white font-bold uppercase leading-loose
                rounded-full px-5 py-2 border border-transparent
                bg-[#003BE5]
                sm:self-center
                md:self-start
                disabled:bg-[#0039e55b]"
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
            </div>
          </div>
        </section>
      )}
    </section>
  );
}
