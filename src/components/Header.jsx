import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import logo from '../assets/logoTrybetunes.png';
import defUserImg from '../assets/defProfile.png';
import glassIco from '../assets/mGlass.png';
import starIco from '../assets/star.png';
import profileIco from '../assets/profileIco.png';
import InlineLoading from './InlineLoading';

export default function Header() {
  const firstUpdate = useRef(true);
  const [name, setName] = useState('');
  const [image, setImage] = useState(defUserImg);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (firstUpdate.current) {
      const getUserName = async () => {
        firstUpdate.current = false;
        setLoading(true);
        const result = await getUser();
        setName(result.name);
        setImage(result.image === '' ? defUserImg : result.image);
        setLoading(false);
      };
      getUserName();
    }
  }, []);

  return (
    <section
      data-testid="header-component"
      className="
          flex bg-white
          sm:flex-row sm:flex-nowrap sm:justify-between sm:px-5 sm:py-1
          md:w-1/4 md:flex-col md:flex-wrap md:justify-between md:items-center"
    >
      <div
        className="sm:w-20 sm:h-20 md:w-36 md:h-1/3 bg-center bg-contain bg-no-repeat"
        style={ { backgroundImage: `url(${logo})` } }
      />
      <nav
        className="
            flex
            sm:flex-row sm:justify-center sm:items-center sm:gap-5
            md:flex-col md:justify-between md:py-10 md:w-32 md:h-2/3"
      >
        <div className="flex sm:gap-6 md:flex-col md:gap-10">
          <Link
            to="/search"
            data-testid="link-to-search"
            className="flex md:h-10 flex-row items-center justify-start w-full gap-4"
          >
            <img src={ glassIco } alt="" />
            <p className="sm:hidden md:inline-block md:mt-1">Pesquisa</p>
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="flex md:h-10 flex-row items-center justify-start w-full gap-4"
          >
            <img src={ starIco } alt="" />
            <p className="sm:hidden md:block md:mt-1">Favoritas</p>
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="sm:hidden md:flex md:h-10 flex-row
                items-center justify-start w-full gap-4"
          >
            <img src={ profileIco } alt="" />
            <p className="sm:hidden md:block md:mt-1">Perfil</p>
          </Link>
        </div>
        {loading
          ? <InlineLoading />
          : (
            <div>
              <Link to="/profile" className="flex flex-row flex-wrap justify-center">
                <div
                  className="rounded-full w-10 h-10 bg-center bg-cover bg-no-repeat"
                  style={ { backgroundImage: `url(${image})` } }
                />
                <p
                  className="w-20 md:flex flex-row justify-center items-center sm:hidden"
                  data-testid="header-user-name"
                >
                  {name}
                </p>
              </Link>
            </div>
          )}
      </nav>
    </section>
  );
}
