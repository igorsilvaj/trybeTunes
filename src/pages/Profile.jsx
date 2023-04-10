import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import { getUser } from '../services/userAPI';
import defUserImg from '../assets/defProfile.png';

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
    <section
      className="flex bg-[#EFF3F9] h-screen
      sm:flex-col
      md:flex-row"
      data-testid="page-profile"
    >
      {/* {loading && <Loading />} */}
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
          <div className="md:flex md:justify-start md:pl-64">
            <div className="flex flex-col items-start px-10">
              <h3 className="mt-5 font-bold">Nome</h3>
              <p className="mb-5">{user.name}</p>
              <h3 className="font-bold">E-mail</h3>
              <p className="mb-5">{user.email}</p>
              <h3 className="font-bold">Descrição</h3>
              <p className="mb-5 break-all">{user.description}</p>
              <Link
                to="/profile/edit"
                className="text-white font-bold uppercase leading-loose
                rounded-full px-5 py-2 border border-transparent
                bg-[#003BE5]"
              >
                Editar perfil
              </Link>
            </div>
          </div>
        </section>
      )}
    </section>
  );
}
