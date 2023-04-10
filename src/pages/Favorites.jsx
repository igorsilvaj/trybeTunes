import React, { useContext, useEffect, useState } from 'react';
import { Header, Loading } from '../components';
import MusicCard from '../components/MusicCard';
import { MusicContext } from '../context/MusicContext';

export default function Favorites() {
  const [loading, setLoading] = useState(false);
  const [musics, setMusics] = useState([]);
  const { favoriteMusics } = useContext(MusicContext);

  useEffect(() => {
    const getFavorites = async () => {
      setLoading(true);
      setMusics(favoriteMusics);
      setLoading(false);
    };
    getFavorites();
  }, [favoriteMusics]);

  return (
    <section
      className="flex bg-[#EFF3F9]
      sm:flex-col
      md:flex-row md:h-screen"
      data-testid="page-favorites"
    >
      {loading && <Loading />}
      <Header />
      <section className="flex flex-col md:w-3/4">
        <div
          className="flex justify-center items-center
          bg-search bg-no-repeat bg-cover
          sm:h-36 md:h-1/3"
        >
          <p className="text-white font-bold" data-testid="album-name">
            Músicas Favoritas
          </p>
        </div>
        <div
          className="flex flex-col items-center
          md:gap-5 md:overflow-auto
          "
        >
          {musics.length > 0 && (
            musics.map((music) => (
              <MusicCard
                key={ music.trackId }
                music={ music }
              />
            ))
          )}
        </div>
      </section>
    </section>
  );
}
